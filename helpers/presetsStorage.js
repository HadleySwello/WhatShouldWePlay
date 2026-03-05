/**
 * Persist filter presets in AsyncStorage.
 * Preset shape: { id, name, filters, createdAt?, updatedAt? }
 * Filter shape: { playerCount, complexityMin, complexityMax, maxLength, selectedMechanics, selectedCategories }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRESETS_KEY = 'filterPresets';

export const MAX_PRESETS = 15;
export const MAX_PRESET_NAME_LENGTH = 64;
export { QUICK_PRESET_NAMES } from './quickPresets';

export function normalizePresetName(raw) {
  if (raw == null || typeof raw !== 'string') return '';
  return raw
    .replace(/[\r\n\t\v\f]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function normalizeFilters(filters) {
  let min = filters.complexityMin ?? null;
  let max = filters.complexityMax ?? null;
  if (min != null && max != null && min > max) {
    min = max;
  }
  return {
    playerCount: filters.playerCount ?? 2,
    complexityMin: min,
    complexityMax: max,
    maxLength: filters.maxLength ?? null,
    selectedMechanics: filters.selectedMechanics ?? [],
    selectedCategories: filters.selectedCategories ?? [],
  };
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
  if (presets.length >= MAX_PRESETS) {
    throw new Error(`Maximum number of presets (${MAX_PRESETS}) reached.`);
  }
  const now = Date.now();
  const safeName = normalizePresetName(name);
  if (!safeName) throw new Error('Preset name is required.');
  const preset = {
    id: generateId(),
    name:
      safeName.length > MAX_PRESET_NAME_LENGTH
        ? safeName.slice(0, MAX_PRESET_NAME_LENGTH)
        : safeName,
    filters: normalizeFilters(filters),
    createdAt: now,
    updatedAt: now,
  };
  presets.push(preset);
  await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  return preset;
}

export async function updatePreset(id, { name, filters }) {
  const presets = await getPresets();
  const idx = presets.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  const safeName = name != null ? normalizePresetName(name) : null;
  const finalName =
    safeName != null && safeName.length > 0
      ? safeName.length > MAX_PRESET_NAME_LENGTH
        ? safeName.slice(0, MAX_PRESET_NAME_LENGTH)
        : safeName
      : presets[idx].name;
  presets[idx] = {
    ...presets[idx],
    ...(name != null && { name: finalName }),
    ...(filters != null && { filters: normalizeFilters(filters) }),
    updatedAt: Date.now(),
  };
  await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  return presets[idx];
}

export async function deletePreset(id) {
  const presets = (await getPresets()).filter((p) => p.id !== id);
  await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
}

export async function findPresetByName(name, { excludeId } = {}) {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return null;
  const presets = await getPresets();
  const match = presets.find((p) => {
    if (excludeId && p.id === excludeId) return false;
    return (p.name || '').trim().toLowerCase() === normalized;
  });
  return match || null;
}
