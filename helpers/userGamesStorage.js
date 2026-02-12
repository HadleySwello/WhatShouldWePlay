/**
 * Persist user-added games in AsyncStorage. Same shape as BGG/seed games.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_GAMES_KEY = 'userAddedGames';

export async function getUserGames() {
  try {
    const raw = await AsyncStorage.getItem(USER_GAMES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveUserGames(games) {
  await AsyncStorage.setItem(USER_GAMES_KEY, JSON.stringify(games));
}

export async function addUserGame(game) {
  const games = await getUserGames();
  games.push(game);
  await saveUserGames(games);
  return games;
}

export async function removeUserGame(gameId) {
  const games = await getUserGames();
  const next = games.filter((g) => g.id !== gameId);
  await saveUserGames(next);
  return next;
}
