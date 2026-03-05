/**
 * Persist themeMode in AsyncStorage.
 * Values: 'light' | 'dark' | 'system'. Default 'system'.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'themeMode';

const DEFAULT_VALUE = 'system';

const VALID_VALUES = ['light', 'dark', 'system'];

function sanitize(value) {
  if (VALID_VALUES.includes(value)) {
    return value;
  }
  return DEFAULT_VALUE;
}

export async function getThemeMode() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw == null) {
      await AsyncStorage.setItem(STORAGE_KEY, DEFAULT_VALUE);
      return DEFAULT_VALUE;
    }
    return sanitize(raw);
  } catch {
    await AsyncStorage.setItem(STORAGE_KEY, DEFAULT_VALUE);
    return DEFAULT_VALUE;
  }
}

export async function setThemeMode(value) {
  const sanitized = sanitize(value);
  await AsyncStorage.setItem(STORAGE_KEY, sanitized);
  return sanitized;
}
