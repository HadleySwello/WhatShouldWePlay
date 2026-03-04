/**
 * Central complexity tier and summary logic.
 * Tier thresholds (BGG-aligned): low < 2.0, medium 2.0–3.49, high >= 3.5
 */

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
 * @param {number|null} complexityMin
 * @param {number|null} complexityMax
 * @returns {string} - For display in filter summaries
 */
export function formatComplexitySummary(complexityMin, complexityMax) {
  const min = complexityMin ?? null;
  const max = complexityMax ?? null;
  if (min == null && max == null) return 'Any';
  if (min != null && max == null) return `≥ ${min}`;
  if (min == null && max != null) return `≤ ${max}`;
  return `${min}–${max}`;
}
