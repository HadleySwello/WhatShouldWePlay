/**
 * Persist filter vibes in AsyncStorage.
 * Vibe shape: { id, name, filters, createdAt?, updatedAt? }
 * Filter shape: { playerCount, complexityMin, complexityMax, maxLength, selectedMechanics, selectedCategories }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import copy, { t } from '../constants/copy';

const VIBES_KEY = 'filterVibes';

export const MAX_VIBES = 15;
export const MAX_VIBE_NAME_LENGTH = 64;
export { QUICK_VIBE_NAMES } from './quickVibes';

export function normalizeVibeName(raw) {
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

export async function getVibes() {
  try {
    const raw = await AsyncStorage.getItem(VIBES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveVibe(name, filters) {
  const vibes = await getVibes();
  if (vibes.length >= MAX_VIBES) {
    throw new Error(t(copy.errors.maxVibesReached, { max: MAX_VIBES }));
  }
  const now = Date.now();
  const safeName = normalizeVibeName(name);
  if (!safeName) throw new Error(copy.errors.vibeNameRequired);
  const vibe = {
    id: generateId(),
    name:
      safeName.length > MAX_VIBE_NAME_LENGTH
        ? safeName.slice(0, MAX_VIBE_NAME_LENGTH)
        : safeName,
    filters: normalizeFilters(filters),
    createdAt: now,
    updatedAt: now,
  };
  vibes.push(vibe);
  await AsyncStorage.setItem(VIBES_KEY, JSON.stringify(vibes));
  return vibe;
}

export async function updateVibe(id, { name, filters }) {
  const vibes = await getVibes();
  const idx = vibes.findIndex((r) => r.id === id);
  if (idx < 0) return null;
  const safeName = name != null ? normalizeVibeName(name) : null;
  const finalName =
    safeName != null && safeName.length > 0
      ? safeName.length > MAX_VIBE_NAME_LENGTH
        ? safeName.slice(0, MAX_VIBE_NAME_LENGTH)
        : safeName
      : vibes[idx].name;
  vibes[idx] = {
    ...vibes[idx],
    ...(name != null && { name: finalName }),
    ...(filters != null && { filters: normalizeFilters(filters) }),
    updatedAt: Date.now(),
  };
  await AsyncStorage.setItem(VIBES_KEY, JSON.stringify(vibes));
  return vibes[idx];
}

export async function deleteVibe(id) {
  const vibes = (await getVibes()).filter((r) => r.id !== id);
  await AsyncStorage.setItem(VIBES_KEY, JSON.stringify(vibes));
}

export async function findVibeByName(name, { excludeId } = {}) {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return null;
  const vibes = await getVibes();
  const match = vibes.find((r) => {
    if (excludeId && r.id === excludeId) return false;
    return (r.name || '').trim().toLowerCase() === normalized;
  });
  return match || null;
}
