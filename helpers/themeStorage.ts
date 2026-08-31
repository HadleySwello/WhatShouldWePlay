/**
 * Persist themeMode in AsyncStorage.
 * Values: 'light' | 'dark' | 'system'. Default 'system'.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'themeMode';

type ThemeMode = 'light' | 'dark' | 'system';

const DEFAULT_VALUE: ThemeMode = 'system';

const VALID_VALUES: ThemeMode[] = ['light', 'dark', 'system'];

function sanitize(value: string | null | undefined): ThemeMode {
  if (typeof value === 'string' && VALID_VALUES.includes(value as ThemeMode)) {
    return value as ThemeMode;
  }
  return DEFAULT_VALUE;
}

export async function getThemeMode(): Promise<ThemeMode> {
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

export async function setThemeMode(
  value: ThemeMode | string | null | undefined
): Promise<ThemeMode> {
  const sanitized = sanitize(value);
  await AsyncStorage.setItem(STORAGE_KEY, sanitized);
  return sanitized;
}
