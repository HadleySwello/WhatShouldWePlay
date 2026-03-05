export const QUICK_PRESETS = [
  {
    id: 'party',
    name: 'Party Night',
    isQuick: true,
    description: 'Light games, short sessions—great for groups.',
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
    id: 'heavy',
    name: 'Heavy Night',
    isQuick: true,
    description: 'Complex games for serious gamers.',
    filters: {
      playerCount: 3,
      complexityMin: null,
      complexityMax: null,
      maxLength: null,
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'family',
    name: 'Family',
    isQuick: true,
    description: 'Accessible games for all ages.',
    filters: {
      playerCount: 4,
      complexityMin: 0,
      complexityMax: 2,
      maxLength: 'under 1 hour',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
];

export const QUICK_PRESET_NAMES = QUICK_PRESETS.map((p) => p.name);
