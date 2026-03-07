import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { XMLParser } from 'fast-xml-parser';

import copy from '../constants/copy';
import seedGames from '../data/seedGames';
import * as userGamesStorage from '../helpers/userGamesStorage';

const BGG_API_BASE = 'https://boardgamegeek.com/xmlapi2';
const BGG_USERNAME_KEY = 'bggUsername';
const BGG_COLLECTION_KEY = 'bggCollection';
const TEST_USERNAME = 'test'; // dev only: use seed data, no API call
const THING_API_LIMIT = 20;
const parser = new XMLParser({ ignoreAttributes: false });

function getBggApiToken() {
  return Constants.expoConfig?.extra?.bggApiToken || '';
}

function parseBggErrors(data) {
  const err = data?.errors?.error;
  if (!err) return null;
  const list = Array.isArray(err) ? err : [err];
  const messages = list.map((e) => e?.message || e?.['#text']).filter(Boolean);
  return messages.length > 0 ? messages[0] : copy.bgg.unknownError;
}

// Attempt to fetch the user's collection, up to 5 retries if we get 202
const fetchCollectionForUsername = async (
  username,
  retry = 0,
  maxRetries = 5
) => {
  const token = getBggApiToken();
  if (!token) {
    throw new Error(
      'BGG API token is missing. Add BGG_API_TOKEN to .env for local dev, or set it as an EAS secret for production.'
    );
  }

  const response = await axios.get(`${BGG_API_BASE}/collection`, {
    params: {
      username,
      own: 1,
      stats: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const data = parser.parse(response.data);
    const errMsg = parseBggErrors(data);
    if (errMsg) throw new Error(errMsg);
    return data;
  } else if (response.status === 202) {
    if (retry < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return fetchCollectionForUsername(username, retry + 1, maxRetries);
    } else {
      throw new Error('Reached max retries while waiting for BGG request.');
    }
  } else {
    throw new Error(`Unexpected status: ${response.status}`);
  }
};

// Fetch thing details for up to THING_API_LIMIT game IDs per request.
// Parsed: categories, mechanics, minAge, minPlaytime, maxPlaytime, bggAverage, bggRank.
const fetchThingDetailsBatch = async (ids, retry = 0, maxRetries = 5) => {
  if (!ids || ids.length === 0) return {};
  if (ids.length > THING_API_LIMIT) {
    throw new Error(`Cannot load more than ${THING_API_LIMIT} items`);
  }
  const token = getBggApiToken();
  if (!token) return {};

  const idList = Array.isArray(ids) ? ids.join(',') : String(ids);
  const response = await axios.get(`${BGG_API_BASE}/thing`, {
    params: { id: idList, stats: 1 },
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 200) {
    const data = parser.parse(response.data);
    const errMsg = parseBggErrors(data);
    if (errMsg) throw new Error(errMsg);
    return parseThingResponse(data);
  }
  if (response.status === 202 && retry < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return fetchThingDetailsBatch(ids, retry + 1, maxRetries);
  }
  return {};
};

// Fetch thing details for any number of IDs by batching into requests of THING_API_LIMIT.
const fetchThingDetails = async (ids) => {
  if (!ids || ids.length === 0) return {};
  const idArr = Array.isArray(ids) ? [...ids] : [String(ids)];
  const merged = {};
  for (let i = 0; i < idArr.length; i += THING_API_LIMIT) {
    const batch = idArr.slice(i, i + THING_API_LIMIT);
    const batchResult = await fetchThingDetailsBatch(batch);
    Object.assign(merged, batchResult);
  }
  return merged;
};

function parseThingResponse(data) {
  const result = {};
  const raw = data?.items?.item;
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
  for (const item of items) {
    const id = item['@_id'] || item['@_objectid'];
    if (!id) continue;
    const links = item.link;
    const linkList = Array.isArray(links) ? links : links ? [links] : [];
    const categories = [];
    const mechanics = [];
    for (const link of linkList) {
      const type = link['@_type'];
      const value = link['@_value'];
      if (!value) continue;
      if (type === 'boardgamecategory') categories.push(value);
      if (type === 'boardgamemechanic') mechanics.push(value);
    }
    const minAge = item.minage?.['@_value'];
    const minPlaytime = item.minplaytime?.['@_value'];
    const maxPlaytime = item.maxplaytime?.['@_value'];
    const stats = item.statistics?.ratings;
    const bggAverage = stats?.average?.['@_value'];
    const averageweight = stats?.averageweight?.['@_value'];
    const ranks = stats?.ranks?.rank;
    const rankList = Array.isArray(ranks) ? ranks : ranks ? [ranks] : [];
    const boardGameRank = rankList.find(
      (r) => r['@_type'] === 'subtype' && r['@_id'] === '1'
    );
    const bggRank = boardGameRank
      ? parseInt(boardGameRank['@_value'], 10)
      : null;
    const description = item.description;
    result[id] = {
      description,
      categories,
      mechanics,
      minAge: minAge ? parseInt(minAge, 10) : null,
      minPlaytime: minPlaytime ? parseInt(minPlaytime, 10) : null,
      maxPlaytime: maxPlaytime ? parseInt(maxPlaytime, 10) : null,
      bggAverage: bggAverage ? parseFloat(bggAverage) : null,
      bggRank,
      ...(averageweight ? { complexityWeight: parseFloat(averageweight) } : {}),
    };
  }
  return result;
}

/**
 * A hook that fetches the BGG collection, merges data from the snippet
 * into a single shape -- no placeholders, no second calls, just what's
 * actually in the snippet.
 */
const useBoardGameGeekCollection = () => {
  const [games, setGames] = useState([]);
  const [username, setUsername] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    const storedUsername = await AsyncStorage.getItem(BGG_USERNAME_KEY);
    let sourceGames = [];

    if (storedUsername) {
      if (storedUsername.toLowerCase() === TEST_USERNAME) {
        const cached = await AsyncStorage.getItem(BGG_COLLECTION_KEY);
        sourceGames = cached ? JSON.parse(cached) : seedGames;
        setError(null);
      } else {
        const cachedRaw = await AsyncStorage.getItem(BGG_COLLECTION_KEY);
        const hasCache =
          cachedRaw &&
          (() => {
            try {
              const parsed = JSON.parse(cachedRaw);
              return Array.isArray(parsed) && parsed.length > 0;
            } catch {
              return false;
            }
          })();

        if (hasCache && !forceRefresh) {
          sourceGames = JSON.parse(cachedRaw);
          setError(null);
        } else {
          try {
            const data = await fetchCollectionForUsername(storedUsername);
            const raw = data?.items?.item;
            const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
            sourceGames = items.map((item) => mapItemToGame(item));
            if (sourceGames.length > 0) {
              const ids = sourceGames.map((g) => g.id).filter(Boolean);
              const thingData = await fetchThingDetails(ids);
              sourceGames = sourceGames.map((g) => ({
                ...g,
                ...thingData[g.id],
                categories: thingData[g.id]?.categories ?? [],
                mechanics: thingData[g.id]?.mechanics ?? [],
              }));
            }
            setError(null);
            await AsyncStorage.setItem(
              BGG_COLLECTION_KEY,
              JSON.stringify(sourceGames)
            );
          } catch (err) {
            if (hasCache) {
              sourceGames = JSON.parse(cachedRaw);
            } else {
              sourceGames = seedGames;
            }
            setError(err?.message || copy.bgg.failedToLoadCollection);
          }
        }
      }
    }

    const userGames = await userGamesStorage.getUserGames();
    const normalized = (g) => ({
      ...g,
      categories: g.categories || [],
      mechanics: g.mechanics || [],
      minAge: g.minAge ?? null,
      minPlaytime: g.minPlaytime ?? null,
      maxPlaytime: g.maxPlaytime ?? null,
      bggAverage: g.bggAverage ?? null,
      bggRank: g.bggRank ?? null,
    });
    const combined = sourceGames
      .map(normalized)
      .concat(userGames.map(normalized));
    setGames(combined);
    setUsername(storedUsername || null);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addUserGame = (game) => {
    return userGamesStorage.addUserGame(game).then(() => loadData());
  };

  const removeUserGame = (gameId) => {
    return userGamesStorage.removeUserGame(gameId).then(() => loadData());
  };

  return {
    games,
    username,
    isLoading,
    error,
    reload: () => loadData(true),
    addUserGame,
    removeUserGame,
  };
};

function mapItemToGame(item) {
  const rawName = item.name;
  const gameName =
    typeof rawName === 'object'
      ? rawName['#text']
      : rawName || copy.common.unknownGame;
  const minPlayers = parseInt(item.stats?.['@_minplayers'] || '1', 10);
  const maxPlayers = parseInt(item.stats?.['@_maxplayers'] || '1', 10);
  const ratingValue = item.stats?.rating?.['@_value'] || null;
  const complexityWeight = parseComplexityWeight(item);
  return {
    id: item['@_objectid'] || '(no id)',
    name: gameName,
    playersMin: minPlayers,
    playersMax: maxPlayers,
    complexityWeight,
    length: parseLength(item),
    color: '#ec7e1f',
    image: item.image || '',
    thumbnail: item.thumbnail || '',
    yearPublished: item.yearpublished || 'N/A',
    rating: ratingValue,
    categories: [],
    mechanics: [],
  };
}

function parseComplexityWeight(item) {
  // Collection API may use stats.rating; Thing API uses statistics.ratings
  const fromStats = item.stats?.rating?.averageweight?.['@_value'];
  const fromStatistics = item.statistics?.ratings?.averageweight?.['@_value'];
  const raw = fromStats ?? fromStatistics ?? '0';
  return parseFloat(raw);
}

function parseLength(item) {
  const playingTime = parseInt(item.stats?.['@_playingtime'] || '0', 10);
  if (playingTime <= 30) return 'under 30 min';
  if (playingTime <= 60) return 'under 1 hour';
  if (playingTime <= 120) return 'under 2 hours';
  return 'long';
}

/**
 * Fetch BGG collection for a username, save to AsyncStorage, then return.
 * Call this from Connect BGG screen. Throws on failure.
 * For dev testing: username "test" uses seed data and skips the API.
 */
export async function fetchAndSaveCollection(username) {
  const trimmed = (username || '').trim();
  if (!trimmed) throw new Error(copy.connectBGG.usernameRequired);

  if (trimmed.toLowerCase() === TEST_USERNAME) {
    await AsyncStorage.setItem(BGG_USERNAME_KEY, TEST_USERNAME);
    await AsyncStorage.setItem(BGG_COLLECTION_KEY, JSON.stringify(seedGames));
    return seedGames;
  }

  const data = await fetchCollectionForUsername(trimmed);
  const raw = data?.items?.item;
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
  let sourceGames = items.map((item) => mapItemToGame(item));
  if (sourceGames.length > 0) {
    const ids = sourceGames.map((g) => g.id).filter(Boolean);
    const thingData = await fetchThingDetails(ids);
    sourceGames = sourceGames.map((g) => ({
      ...g,
      ...thingData[g.id],
      categories: thingData[g.id]?.categories ?? [],
      mechanics: thingData[g.id]?.mechanics ?? [],
    }));
  }
  await AsyncStorage.setItem(BGG_USERNAME_KEY, trimmed);
  await AsyncStorage.setItem(BGG_COLLECTION_KEY, JSON.stringify(sourceGames));
  return sourceGames;
}

export default useBoardGameGeekCollection;
