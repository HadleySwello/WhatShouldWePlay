/**
 * Persist votingModeEnabled in AsyncStorage.
 * Default false. Only Settings screen persists; Results reads but does not write.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'votingModeEnabled';

const DEFAULT_VALUE = false;

export async function getVotingModeEnabled(): Promise<boolean> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw == null) {
      await AsyncStorage.setItem(STORAGE_KEY, String(DEFAULT_VALUE));
      return DEFAULT_VALUE;
    }
    return raw === 'true';
  } catch {
    await AsyncStorage.setItem(STORAGE_KEY, String(DEFAULT_VALUE));
    return DEFAULT_VALUE;
  }
}

export async function setVotingModeEnabled(
  value: boolean | string | number | null | undefined
): Promise<boolean> {
  const bool = Boolean(value);
  await AsyncStorage.setItem(STORAGE_KEY, String(bool));
  return bool;
}
