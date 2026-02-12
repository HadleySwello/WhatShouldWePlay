import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { XMLParser } from 'fast-xml-parser';

import seedGames from '../data/seedGames';
import * as userGamesStorage from '../helpers/userGamesStorage';

const BGG_API_BASE = 'https://boardgamegeek.com/xmlapi2';
const USERNAME = 'doink1212';
const parser = new XMLParser({ ignoreAttributes: false });

// Attempt to fetch the user's collection, up to 5 retries if we get 202
const fetchCollection = async (retry = 0, maxRetries = 5) => {
  const response = await axios.get(`${BGG_API_BASE}/collection`, {
    params: {
      username: USERNAME,
      own: 1,   // only owned games
      stats: 1, // includes rating/players in "stats"
    },
  });

  if (response.status === 200) {
    // Parse the XML -> JSON
    const data = parser.parse(response.data);
    return data;
  } else if (response.status === 202) {
    // BGG says "request queued" -> wait 3s, retry
    if (retry < maxRetries) {
      console.warn('BGG API is processing. Retrying...');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return fetchCollection(retry + 1, maxRetries);
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

    let sourceGames = [];
    try {
      const data = await fetchCollection();
      const items = data?.items?.item || [];

      sourceGames = items.map((item) => {
        const rawName = item.name;
        const gameName =
          typeof rawName === 'object'
            ? rawName['#text']
            : rawName || 'Unknown Game';

        const minPlayers = parseInt(item.stats?.['@_minplayers'] || '1', 10);
        const maxPlayers = parseInt(item.stats?.['@_maxplayers'] || '1', 10);
        const ratingValue = item.stats?.rating?.['@_value'] || null;

        return {
          id: item['@_objectid'] || '(no id)',
          name: gameName,
          playersMin: minPlayers,
          playersMax: maxPlayers,
          complexity: parseComplexity(item),
          length: parseLength(item),
          color: '#ec7e1f',
          image: item.image || '',
          thumbnail: item.thumbnail || '',
          yearPublished: item.yearpublished || 'N/A',
          rating: ratingValue,
        };
      });

      setError(null);
      await AsyncStorage.setItem('bggCollection', JSON.stringify(sourceGames));
    } catch (err) {
      sourceGames = seedGames;
      setError(null);
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

/** optional: parse the complexity from "averageweight", if you see it in "stats.rating.averageweight" */
function parseComplexity(item) {
  const avgWeight = parseFloat(
    item.stats?.rating?.averageweight?.['@_value'] || '0'
  );
  if (avgWeight < 2) return 'low';
  if (avgWeight < 3.5) return 'medium';
  return 'high';
}

/** optional: parse the length from stats.@_playingtime or yearpublished */
function parseLength(item) {
  const playingTime = parseInt(item.stats?.['@_playingtime'] || '0', 10);
  if (playingTime <= 30) return 'under 30 min';
  if (playingTime <= 60) return 'under 1 hour';
  if (playingTime <= 120) return 'under 2 hours';
  return 'long';
}

export default useBoardGameGeekCollection;
