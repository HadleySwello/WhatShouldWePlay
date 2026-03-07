/**
 * Central complexity tier and summary logic.
 * Tier thresholds (BGG-aligned): low < 2.0, medium 2.0–3.49, high >= 3.5
 */
import copy from '../constants/copy';

/**
 * Capitalize tier for display (Low, Medium, High).
 * @param {string|null} tier - 'low' | 'medium' | 'high' | null
 * @returns {string|null}
 */
export function capitalizeComplexityTier(tier) {
  if (tier == null || typeof tier !== 'string') return null;
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

/**
 * @param {number} weight - BGG complexity weight (e.g. 2.5)
 * @returns {'low'|'medium'|'high'|null}
 */
export function getComplexityTier(weight) {
  if (weight == null || typeof weight !== 'number' || !Number.isFinite(weight)) {
    return null;
  }
  if (weight < 2.0) return 'low';
  if (weight < 3.5) return 'medium';
  return 'high';
}

/**
 * Map BGG complexity value (0-5) to tier for display.
 * 0,1 → light; 2,3 → medium; 4,5 → heavy
 */
function valueToTier(val) {
  if (val == null || val < 0) return null;
  if (val <= 1) return 'light';
  if (val <= 3) return 'medium';
  return 'heavy';
}

/**
 * @param {number|null} complexityMin
 * @param {number|null} complexityMax
 * @returns {string} - For display in filter summaries (tier-based, e.g. "Light and up")
 */
export function formatComplexitySummary(complexityMin, complexityMax) {
  const min = complexityMin ?? null;
  const max = complexityMax ?? null;
  if (min == null && max == null) return copy.ritualMetadata.any;
  if (min != null && max == null) {
    const tier = valueToTier(min);
    if (tier === 'light') return copy.ritualMetadata.lightAndUp;
    if (tier === 'medium') return copy.ritualMetadata.mediumAndUp;
    return copy.ritualMetadata.heavyAndUp;
  }
  if (min == null && max != null) {
    const tier = valueToTier(max);
    if (tier === 'light') return copy.ritualMetadata.upToLight;
    if (tier === 'medium') return copy.ritualMetadata.upToMedium;
    return copy.ritualMetadata.upToHeavy;
  }
  const minTier = valueToTier(min);
  const maxTier = valueToTier(max);
  if (minTier === maxTier) {
    if (minTier === 'light') return copy.ritualMetadata.light;
    if (minTier === 'medium') return copy.ritualMetadata.medium;
    return copy.ritualMetadata.heavy;
  }
  if (minTier === 'light' && maxTier === 'medium') return copy.ritualMetadata.lightToMedium;
  if (minTier === 'light' && maxTier === 'heavy') return copy.ritualMetadata.lightToHeavy;
  return copy.ritualMetadata.mediumToHeavy;
}
