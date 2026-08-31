/**
 * Persist filter vibes in AsyncStorage.
 * Vibe shape: { id, name, filters, createdAt?, updatedAt? }
 * Filter shape: { playerCount, complexityMin, complexityMax, maxLength, selectedMechanics, selectedCategories }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

import copy, { t } from '../constants/copy';

const VIBES_KEY = 'filterVibes';

type VibeFilters = {
  playerCount?: number | null;
  complexityMin?: number | null;
  complexityMax?: number | null;
  maxLength?: number | null;
  selectedMechanics?: string[];
  selectedCategories?: string[];
};

type NormalizedVibeFilters = {
  playerCount: number;
  complexityMin: number | null;
  complexityMax: number | null;
  maxLength: number | null;
  selectedMechanics: string[];
  selectedCategories: string[];
};

type SavedVibe = {
  id: string;
  name: string;
  filters: NormalizedVibeFilters;
  createdAt: number;
  updatedAt: number;
};

type VibeUpdateInput = {
  name?: string | null;
  filters?: Partial<VibeFilters> | null;
};

type FindVibeOptions = {
  excludeId?: string;
};

export const MAX_VIBES = 15;
export const MAX_VIBE_NAME_LENGTH = 64;
export { QUICK_VIBE_NAMES } from './quickVibes';

export function normalizeVibeName(raw: string | null | undefined): string {
  if (raw == null || typeof raw !== 'string') return '';
  return raw
    .replace(/[\r\n\t\v\f]+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function normalizeFilters(
  filters: Partial<VibeFilters> | null | undefined
): NormalizedVibeFilters {
  const safeFilters = filters ?? {};
  let min = safeFilters.complexityMin ?? null;
  let max = safeFilters.complexityMax ?? null;
  if (min != null && max != null && min > max) {
    min = max;
  }
  return {
    playerCount: safeFilters.playerCount ?? 2,
    complexityMin: min,
    complexityMax: max,
    maxLength: safeFilters.maxLength ?? null,
    selectedMechanics: safeFilters.selectedMechanics ?? [],
    selectedCategories: safeFilters.selectedCategories ?? [],
  };
}

export async function getVibes(): Promise<SavedVibe[]> {
  try {
    const raw = await AsyncStorage.getItem(VIBES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedVibe[]) : [];
  } catch {
    return [];
  }
}

export async function saveVibe(
  name: string | null | undefined,
  filters: Partial<VibeFilters> | null | undefined
): Promise<SavedVibe> {
  const vibes = await getVibes();
  if (vibes.length >= MAX_VIBES) {
    throw new Error(t(copy.errors.maxVibesReached, { max: MAX_VIBES }));
  }
  const now = Date.now();
  const safeName = normalizeVibeName(name);
  if (!safeName) throw new Error(copy.errors.vibeNameRequired);
  const vibe: SavedVibe = {
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

export async function updateVibe(
  id: string,
  { name, filters }: VibeUpdateInput
): Promise<SavedVibe | null> {
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

export async function deleteVibe(id: string): Promise<void> {
  const vibes = (await getVibes()).filter((r) => r.id !== id);
  await AsyncStorage.setItem(VIBES_KEY, JSON.stringify(vibes));
}

export async function findVibeByName(
  name: string | null | undefined,
  { excludeId }: FindVibeOptions = {}
): Promise<SavedVibe | null> {
  const normalized = (name || '').trim().toLowerCase();
  if (!normalized) return null;
  const vibes = await getVibes();
  const match = vibes.find((r) => {
    if (excludeId && r.id === excludeId) return false;
    return (r.name || '').trim().toLowerCase() === normalized;
  });
  return match || null;
}
