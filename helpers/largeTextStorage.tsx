import AsyncStorage from '@react-native-async-storage/async-storage';

const LARGE_TEXT_KEY = 'largeText';

export async function getLargeText() {
  try {
    const value = await AsyncStorage.getItem(LARGE_TEXT_KEY);
    return value === 'true';
  } catch (_e) {
    return false;
  }
}

export async function setLargeText(value) {
  try {
    await AsyncStorage.setItem(LARGE_TEXT_KEY, value ? 'true' : 'false');
  } catch (_e) {
    // console.log(_e);
  }
}
