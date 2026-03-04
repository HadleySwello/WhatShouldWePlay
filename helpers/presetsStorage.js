/**
 * Persist filter presets in AsyncStorage.
 * Filter shape: { playerCount, maxComplexityStars, maxLength, selectedMechanics, selectedCategories }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRESETS_KEY = 'filterPresets';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export async function getPresets() {
  try {
    const raw = await AsyncStorage.getItem(PRESETS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function savePreset(name, filters) {
  const presets = await getPresets();
  const preset = {
    id: generateId(),
    name,
    filters: {
      playerCount: filters.playerCount ?? 2,
      maxComplexityStars: filters.maxComplexityStars ?? null,
      maxLength: filters.maxLength ?? null,
      selectedMechanics: filters.selectedMechanics ?? [],
      selectedCategories: filters.selectedCategories ?? [],
    },
  };
  presets.push(preset);
  await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  return preset;
}
