import AsyncStorage from '@react-native-async-storage/async-storage';

const REDUCE_MOVEMENT_KEY = 'reduceMovement';

export async function getReduceMovement(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(REDUCE_MOVEMENT_KEY);
    return value === 'true';
  } catch (_e) {
    return false;
  }
}

export async function setReduceMovement(
  value: boolean | string | null | undefined
): Promise<void> {
  try {
    await AsyncStorage.setItem(REDUCE_MOVEMENT_KEY, value ? 'true' : 'false');
  } catch (_e) {
    // console.log(_e);
  }
}
