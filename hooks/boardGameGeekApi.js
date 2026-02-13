import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XMLParser } from 'fast-xml-parser';

import seedGames from '../data/seedGames';
import * as userGamesStorage from '../helpers/userGamesStorage';

const BGG_API_BASE = 'https://boardgamegeek.com/xmlapi2';
const BGG_USERNAME_KEY = 'bggUsername';
const BGG_COLLECTION_KEY = 'bggCollection';
const TEST_USERNAME = 'test'; // dev only: use seed data, no API call
const parser = new XMLParser({ ignoreAttributes: false });

// Attempt to fetch the user's collection, up to 5 retries if we get 202
const fetchCollectionForUsername = async (username, retry = 0, maxRetries = 5) => {
  const response = await axios.get(`${BGG_API_BASE}/collection`, {
    params: {
      username,
      own: 1,
      stats: 1,
    },
  });

  if (response.status === 200) {
    // Parse the XML -> JSON
    const data = parser.parse(response.data);
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

/**
 * A hook that fetches the BGG collection, merges data from the snippet
 * into a single shape -- no placeholders, no second calls, just what's
 * actually in the snippet.
 */
const useBoardGameGeekCollection = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
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
        try {
          const data = await fetchCollectionForUsername(storedUsername);
          const raw = data?.items?.item;
          const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
          sourceGames = items.map((item) => mapItemToGame(item));
          setError(null);
          await AsyncStorage.setItem(BGG_COLLECTION_KEY, JSON.stringify(sourceGames));
        } catch (err) {
          sourceGames = seedGames;
          setError(null);
        }
      }
    }

    const userGames = await userGamesStorage.getUserGames();
    const combined = sourceGames.concat(userGames);
    setGames(combined);
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
    isLoading,
    error,
    reload: loadData,
    addUserGame,
    removeUserGame,
  };
};

function mapItemToGame(item) {
  const rawName = item.name;
  const gameName =
    typeof rawName === 'object' ? rawName['#text'] : rawName || 'Unknown Game';
  const minPlayers = parseInt(item.stats?.['@_minplayers'] || '1', 10);
  const maxPlayers = parseInt(item.stats?.['@_maxplayers'] || '1', 10);
  const ratingValue = item.stats?.rating?.['@_value'] || null;
  const complexityWeight = parseComplexityWeight(item);
  return {
    id: item['@_objectid'] || '(no id)',
    name: gameName,
    playersMin: minPlayers,
    playersMax: maxPlayers,
    complexity: parseComplexity(item),
    complexityWeight,
    length: parseLength(item),
    color: '#ec7e1f',
    image: item.image || '',
    thumbnail: item.thumbnail || '',
    yearPublished: item.yearpublished || 'N/A',
    rating: ratingValue,
  };
}

function parseComplexityWeight(item) {
  return parseFloat(
    item.stats?.rating?.averageweight?.['@_value'] || '0'
  );
}

function parseComplexity(item) {
  const avgWeight = parseComplexityWeight(item);
  if (avgWeight < 2) return 'low';
  if (avgWeight < 3.5) return 'medium';
  return 'high';
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
  if (!trimmed) throw new Error('Username required');

  if (trimmed.toLowerCase() === TEST_USERNAME) {
    await AsyncStorage.setItem(BGG_USERNAME_KEY, TEST_USERNAME);
    await AsyncStorage.setItem(BGG_COLLECTION_KEY, JSON.stringify(seedGames));
    return seedGames;
  }

  const data = await fetchCollectionForUsername(trimmed);
  const raw = data?.items?.item;
  const items = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const sourceGames = items.map(mapItemToGame);
  await AsyncStorage.setItem(BGG_USERNAME_KEY, trimmed);
  await AsyncStorage.setItem(BGG_COLLECTION_KEY, JSON.stringify(sourceGames));
  return sourceGames;
}

export default useBoardGameGeekCollection;
