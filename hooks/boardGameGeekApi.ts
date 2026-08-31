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
const TEST_USERNAME = 'test';
const THING_API_LIMIT = 20;
const parser = new XMLParser({ ignoreAttributes: false });

type BggApiExtra = {
  extra?: {
    bggApiToken?: string;
  };
};

type BggGameRecord = Record<string, any>;

type GameDetails = {
  description?: string;
  categories: string[];
  mechanics: string[];
  minAge: number | null;
  minPlaytime: number | null;
  maxPlaytime: number | null;
  bggAverage: number | null;
  bggRank: number | null;
  complexityWeight?: number;
};

export type BoardGame = {
  id: string;
  name: string;
  playersMin: number;
  playersMax: number;
  complexityWeight: number;
  length: string;
  image: string;
  thumbnail: string;
  yearPublished: string | number;
  rating: string | number | null;
  categories: string[];
  mechanics: string[];
  description?: string;
  minAge?: number | null;
  minPlaytime?: number | null;
  maxPlaytime?: number | null;
  bggAverage?: number | null;
  bggRank?: number | null;
};

export type BoardGameGeekCollectionResult = {
  games: BoardGame[];
  username: string | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  addUserGame: (game: BoardGame) => Promise<void>;
  removeUserGame: (gameId: string) => Promise<void>;
};

type ThingDataMap = Record<string, GameDetails>;

function getBggApiToken(): string {
  return (
    (Constants.expoConfig as BggApiExtra | undefined)?.extra?.bggApiToken || ''
  );
}

function parseBggErrors(data: BggGameRecord | null | undefined): string | null {
  const err = data?.errors?.error;
  if (!err) return null;
  const list = Array.isArray(err) ? err : [err];
  const messages = list
    .map((e: BggGameRecord) => e?.message || e?.['#text'])
    .filter(Boolean);
  return messages.length > 0 ? String(messages[0]) : copy.bgg.unknownError;
}

const fetchCollectionForUsername = async (
  username: string,
  retry = 0,
  maxRetries = 5
): Promise<BggGameRecord> => {
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
    const data = parser.parse(response.data) as BggGameRecord;
    const errMsg = parseBggErrors(data);
    if (errMsg) throw new Error(errMsg);
    return data;
  }

  if (response.status === 202) {
    if (retry < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return fetchCollectionForUsername(username, retry + 1, maxRetries);
    }
    throw new Error('Reached max retries while waiting for BGG request.');
  }

  throw new Error(`Unexpected status: ${response.status}`);
};

const fetchThingDetailsBatch = async (
  ids: Array<string | number> | string,
  retry = 0,
  maxRetries = 5
): Promise<ThingDataMap> => {
  if (!ids || (Array.isArray(ids) && ids.length === 0)) return {};
  if (Array.isArray(ids) && ids.length > THING_API_LIMIT) {
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
    const data = parser.parse(response.data) as BggGameRecord;
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

const fetchThingDetails = async (
  ids: Array<string | number>
): Promise<ThingDataMap> => {
  if (!ids || ids.length === 0) return {};
  const idArr = Array.isArray(ids) ? [...ids] : [String(ids)];
  const merged: ThingDataMap = {};
  for (let i = 0; i < idArr.length; i += THING_API_LIMIT) {
    const batch = idArr.slice(i, i + THING_API_LIMIT);
    const batchResult = await fetchThingDetailsBatch(batch);
    Object.assign(merged, batchResult);
  }
  return merged;
};

function parseThingResponse(data: BggGameRecord): ThingDataMap {
  const result: ThingDataMap = {};
  const raw = data?.items?.item;
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];

  for (const item of items) {
    const id = item['@_id'] || item['@_objectid'];
    if (!id) continue;

    const links = item.link;
    const linkList = Array.isArray(links) ? links : links ? [links] : [];
    const categories: string[] = [];
    const mechanics: string[] = [];

    for (const link of linkList) {
      const type = link['@_type'];
      const value = link['@_value'];
      if (!value) continue;
      if (type === 'boardgamecategory') categories.push(String(value));
      if (type === 'boardgamemechanic') mechanics.push(String(value));
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
      (r: BggGameRecord) => r['@_type'] === 'subtype' && r['@_id'] === '1'
    );
    const bggRank = boardGameRank
      ? parseInt(boardGameRank['@_value'], 10)
      : null;
    const description = item.description;

    result[String(id)] = {
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

const useBoardGameGeekCollection = (): BoardGameGeekCollectionResult => {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (forceRefresh = false): Promise<void> => {
    setLoading(true);
    setError(null);

    const storedUsername = await AsyncStorage.getItem(BGG_USERNAME_KEY);
    let sourceGames: BoardGame[] = [];

    if (storedUsername) {
      if (storedUsername.toLowerCase() === TEST_USERNAME) {
        const cached = await AsyncStorage.getItem(BGG_COLLECTION_KEY);
        sourceGames = cached ? (JSON.parse(cached) as BoardGame[]) : seedGames;
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
          sourceGames = JSON.parse(cachedRaw) as BoardGame[];
          setError(null);
        } else {
          try {
            const data = await fetchCollectionForUsername(storedUsername);
            const raw = data?.items?.item;
            const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
            sourceGames = items.map((item: BggGameRecord) =>
              mapItemToGame(item)
            );

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
              sourceGames = JSON.parse(cachedRaw as string) as BoardGame[];
            } else {
              sourceGames = seedGames as BoardGame[];
            }
            setError(
              (err as Error)?.message || copy.bgg.failedToLoadCollection
            );
          }
        }
      }
    }

    const userGames = (await userGamesStorage.getUserGames()) as BoardGame[];
    const normalized = (g: BoardGame): BoardGame => ({
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

  const addUserGame = async (game: BoardGame): Promise<void> => {
    await userGamesStorage.addUserGame(game);
    await loadData();
  };

  const removeUserGame = async (gameId: string): Promise<void> => {
    await userGamesStorage.removeUserGame(gameId);
    await loadData();
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

function mapItemToGame(item: BggGameRecord): BoardGame {
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
    name: String(gameName),
    playersMin: minPlayers,
    playersMax: maxPlayers,
    complexityWeight,
    length: parseLength(item),
    image: item.image || '',
    thumbnail: item.thumbnail || '',
    yearPublished: item.yearpublished || 'N/A',
    rating: ratingValue,
    categories: [],
    mechanics: [],
  };
}

function parseComplexityWeight(item: BggGameRecord): number {
  const fromStats = item.stats?.rating?.averageweight?.['@_value'];
  const fromStatistics = item.statistics?.ratings?.averageweight?.['@_value'];
  const raw = fromStats ?? fromStatistics ?? '0';
  return parseFloat(raw);
}

function parseLength(item: BggGameRecord): string {
  const playingTime = parseInt(item.stats?.['@_playingtime'] || '0', 10);
  if (playingTime <= 30) return 'under 30 min';
  if (playingTime <= 60) return 'under 1 hour';
  if (playingTime <= 120) return 'under 2 hours';
  return 'long';
}

export async function fetchAndSaveCollection(
  username: string | undefined | null
): Promise<BoardGame[]> {
  const trimmed = (username || '').trim();
  if (!trimmed) throw new Error(copy.connectBGG.usernameRequired);

  if (trimmed.toLowerCase() === TEST_USERNAME) {
    await AsyncStorage.setItem(BGG_USERNAME_KEY, TEST_USERNAME);
    await AsyncStorage.setItem(BGG_COLLECTION_KEY, JSON.stringify(seedGames));
    return seedGames as BoardGame[];
  }

  const data = await fetchCollectionForUsername(trimmed);
  const raw = data?.items?.item;
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
  let sourceGames = items.map((item: BggGameRecord) => mapItemToGame(item));

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
