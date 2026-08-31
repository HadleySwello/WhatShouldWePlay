/**
 * Persist user-added games in AsyncStorage. Same shape as BGG/seed games.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_GAMES_KEY = 'userAddedGames';

export type UserGame = {
  id: string | number;
  [key: string]: unknown;
};

export async function getUserGames(): Promise<UserGame[]> {
  try {
    const raw = await AsyncStorage.getItem(USER_GAMES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UserGame[];
  } catch {
    return [];
  }
}

export async function saveUserGames(games: UserGame[]): Promise<void> {
  await AsyncStorage.setItem(USER_GAMES_KEY, JSON.stringify(games));
}

export async function addUserGame(game: UserGame): Promise<UserGame[]> {
  const games = await getUserGames();
  games.push(game);
  await saveUserGames(games);
  return games;
}

export async function removeUserGame(
  gameId: string | number
): Promise<UserGame[]> {
  const games = await getUserGames();
  const next = games.filter((g) => g.id !== gameId);
  await saveUserGames(next);
  return next;
}
