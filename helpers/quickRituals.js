/**
 * Quick rituals: persona-aligned, market-informed filter defaults.
 * Based on docs/quick-presets-deep-research-report.md
 */
export const QUICK_RITUALS = [
  {
    id: 'family-weeknight',
    name: 'Family Weeknight Win',
    isQuick: true,
    description:
      'Short teach, low rules overhead, finishes in ~30–60 min. Great for families or first-time players.',
    filters: {
      playerCount: 4,
      complexityMin: 0,
      complexityMax: 2,
      maxLength: 'under 1 hour',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'family-plus',
    name: 'Family Game Night Plus',
    isQuick: true,
    description:
      'A fuller session—more planning and depth, still finishable in an evening. Great for families ready to level up.',
    filters: {
      playerCount: 4,
      complexityMin: 2,
      complexityMax: 3,
      maxLength: 'under 2 hours',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'crowd-pleaser',
    name: 'Anytime Crowd-Pleaser',
    isQuick: true,
    description:
      'Low-stress, low-conflict games that play smoothly with a wide range of skill levels.',
    filters: {
      playerCount: 4,
      complexityMin: null,
      complexityMax: 3,
      maxLength: 'under 2 hours',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'big-table',
    name: 'Big Table Icebreakers',
    isQuick: true,
    description:
      'Fast starts, high laughter-per-minute, minimal rules. Optimized for 5+ players.',
    filters: {
      playerCount: 5,
      complexityMin: 0,
      complexityMax: 2,
      maxLength: 'under 30 min',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'social-deduction',
    name: 'Social Deduction Light',
    isQuick: true,
    description:
      'Bluffing and reads without a huge rules burden—good for energizing a group.',
    filters: {
      playerCount: 6,
      complexityMin: 0,
      complexityMax: 2,
      maxLength: 'under 30 min',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'thinky-euro',
    name: 'Thinky Euro Night',
    isQuick: true,
    description:
      'Medium-to-heavy strategy with meaningful choices, but still finishable in a single evening.',
    filters: {
      playerCount: 4,
      complexityMin: 3,
      complexityMax: 4,
      maxLength: 'under 2 hours',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'deep-strategy',
    name: 'Deep Strategy Epic',
    isQuick: true,
    description:
      'For when the group explicitly wants "a big one"—high complexity, long arcs, serious payoff.',
    filters: {
      playerCount: 4,
      complexityMin: 4,
      complexityMax: null,
      maxLength: 'long',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'two-player',
    name: 'Two-Player Duel',
    isQuick: true,
    description:
      'Tight head-to-head games with quick turns and strong replayability.',
    filters: {
      playerCount: 2,
      complexityMin: null,
      complexityMax: 3,
      maxLength: 'under 1 hour',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'solo-coop',
    name: 'Solo or Co-op Brainburn',
    isQuick: true,
    description:
      'Puzzle-like strategic challenge for one player or two cooperating.',
    filters: {
      playerCount: 1,
      complexityMin: 3,
      complexityMax: null,
      maxLength: 'under 2 hours',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
];

export const QUICK_RITUAL_NAMES = QUICK_RITUALS.map((r) => r.name);
