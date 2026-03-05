/**
 * Persist filter rituals in AsyncStorage.
 * Ritual shape: { id, name, filters, createdAt?, updatedAt? }
 * Filter shape: { playerCount, complexityMin, complexityMax, maxLength, selectedMechanics, selectedCategories }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import copy, { t } from '../constants/copy';

const RITUALS_KEY = 'filterRituals';

export const MAX_RITUALS = 15;
export const MAX_RITUAL_NAME_LENGTH = 64;
export { QUICK_RITUAL_NAMES } from './quickRituals';

export function normalizeRitualName(raw) {
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

export async function getRituals() {
  try {
    const raw = await AsyncStorage.getItem(RITUALS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveRitual(name, filters) {
  const rituals = await getRituals();
  if (rituals.length >= MAX_RITUALS) {
    throw new Error(t(copy.errors.maxRitualsReached, { max: MAX_RITUALS }));
  }
  const now = Date.now();
  const safeName = normalizeRitualName(name);
  if (!safeName) throw new Error(copy.errors.ritualNameRequired);
  const ritual = {
    id: generateId(),
    name:
      safeName.length > MAX_RITUAL_NAME_LENGTH
        ? safeName.slice(0, MAX_RITUAL_NAME_LENGTH)
        : safeName,
    filters: normalizeFilters(filters),
    createdAt: now,
    updatedAt: now,
  };
  rituals.push(ritual);
  await AsyncStorage.setItem(RITUALS_KEY, JSON.stringify(rituals));
  return ritual;
}

export async function updateRitual(id, { name, filters }) {
  const rituals = await getRituals();
  const idx = rituals.findIndex((r) => r.id === id);
  if (idx < 0) return null;
  const safeName = name != null ? normalizeRitualName(name) : null;
  const finalName =
    safeName != null && safeName.length > 0
      ? safeName.length > MAX_RITUAL_NAME_LENGTH
        ? safeName.slice(0, MAX_RITUAL_NAME_LENGTH)
        : safeName
      : rituals[idx].name;
  rituals[idx] = {
    ...rituals[idx],
    ...(name != null && { name: finalName }),
    ...(filters != null && { filters: normalizeFilters(filters) }),
    updatedAt: Date.now(),
  };
  await AsyncStorage.setItem(RITUALS_KEY, JSON.stringify(rituals));
  return rituals[idx];
}

export async function deleteRitual(id) {
  const rituals = (await getRituals()).filter((r) => r.id !== id);
  await AsyncStorage.setItem(RITUALS_KEY, JSON.stringify(rituals));
}

export async function findRitualByName(name, { excludeId } = {}) {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return null;
  const rituals = await getRituals();
  const match = rituals.find((r) => {
    if (excludeId && r.id === excludeId) return false;
    return (r.name || '').trim().toLowerCase() === normalized;
  });
  return match || null;
}
