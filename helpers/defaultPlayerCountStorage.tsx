/**
 * Persist defaultPlayerCount in AsyncStorage.
 * Always a number 1–10, never null. Default 2.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'defaultPlayerCount';

export const PLAYER_COUNT_MIN = 1;
export const PLAYER_COUNT_MAX = 10;
export const DEFAULT_PLAYER_COUNT = 2;

function sanitize(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return DEFAULT_PLAYER_COUNT;
  return Math.max(PLAYER_COUNT_MIN, Math.min(PLAYER_COUNT_MAX, Math.round(n)));
}

export async function getDefaultPlayerCount() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw == null) {
      await AsyncStorage.setItem(STORAGE_KEY, String(DEFAULT_PLAYER_COUNT));
      return DEFAULT_PLAYER_COUNT;
    }
    const n = Number(raw);
    if (!Number.isFinite(n)) {
      await AsyncStorage.setItem(STORAGE_KEY, String(DEFAULT_PLAYER_COUNT));
      return DEFAULT_PLAYER_COUNT;
    }
    const clamped = sanitize(n);
    if (clamped !== n) {
      await AsyncStorage.setItem(STORAGE_KEY, String(clamped));
    }
    return clamped;
  } catch {
    await AsyncStorage.setItem(STORAGE_KEY, String(DEFAULT_PLAYER_COUNT));
    return DEFAULT_PLAYER_COUNT;
  }
}

export async function setDefaultPlayerCount(value) {
  const clamped = sanitize(value);
  await AsyncStorage.setItem(STORAGE_KEY, String(clamped));
  return clamped;
}
