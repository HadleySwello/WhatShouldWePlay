import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';
import { getPresets } from '../helpers/presetsStorage';
import PresetsModal from '../components/PresetsModal';
import colors from '../helpers/colors';

const QUICK_PRESETS = [
  {
    id: 'party',
    name: 'Party Night',
    description: 'Light games, short sessions—great for groups.',
    filters: {
      playerCount: 4,
      maxComplexityStars: 2,
      maxLength: 'under 1 hour',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'heavy',
    name: 'Heavy Night',
    description: 'Complex games for serious gamers.',
    filters: {
      playerCount: 3,
      maxComplexityStars: 6,
      maxLength: null,
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Accessible games for all ages.',
    filters: {
      playerCount: 4,
      maxComplexityStars: 2,
      maxLength: 'under 1 hour',
      selectedMechanics: [],
      selectedCategories: [],
    },
  },
];

const LENGTH_ORDER = ['under 30 min', 'under 1 hour', 'under 2 hours', 'long'];

function lengthMatches(maxLength, gameLength) {
  if (!maxLength) return true;
  if (maxLength === 'long') return gameLength === 'long';
  const maxIdx = LENGTH_ORDER.indexOf(maxLength);
  const gameIdx = LENGTH_ORDER.indexOf(gameLength);
  return gameIdx >= 0 && gameIdx <= maxIdx;
}

function getComplexityWeight(game) {
  if (game.complexityWeight != null) return game.complexityWeight;
  const map = { low: 1.5, medium: 2.5, high: 4 };
  return map[game.complexity] != null ? map[game.complexity] : 5;
}

function filterGames(
  games,
  playerCount,
  maxComplexityStars,
  maxLength,
  selectedMechanics,
  selectedCategories
) {
  const mechs = selectedMechanics ?? [];
  const cats = selectedCategories ?? [];
  return games.filter((game) => {
    const matchPlayers =
      playerCount >= game.playersMin && playerCount <= game.playersMax;
    const matchComplexity =
      maxComplexityStars == null ||
      getComplexityWeight(game) <= maxComplexityStars;
    const matchLength = lengthMatches(maxLength, game.length);
    const matchMechanic =
      mechs.length === 0 ||
      (game.mechanics && mechs.some((m) => game.mechanics.includes(m)));
    const matchCategory =
      cats.length === 0 ||
      (game.categories && cats.some((c) => game.categories.includes(c)));
    return (
      matchPlayers &&
      matchComplexity &&
      matchLength &&
      matchMechanic &&
      matchCategory
    );
  });
}

function filterGamesByPlayersTimeComplexity(
  games,
  playerCount,
  maxComplexityStars,
  maxLength
) {
  return games.filter((game) => {
    const matchPlayers =
      playerCount >= game.playersMin && playerCount <= game.playersMax;
    const matchComplexity =
      maxComplexityStars == null ||
      getComplexityWeight(game) <= maxComplexityStars;
    const matchLength = lengthMatches(maxLength, game.length);
    return matchPlayers && matchComplexity && matchLength;
  });
}

function getUniqueMechanics(games) {
  const set = new Set();
  for (const g of games) {
    const list = g.mechanics || [];
    for (const m of list) set.add(m);
  }
  return [...set].sort();
}

function getUniqueCategories(games) {
  const set = new Set();
  for (const g of games) {
    const list = g.categories || [];
    for (const c of list) set.add(c);
  }
  return [...set].sort();
}

const PLAY_TIME_OPTIONS = [
  { value: null, label: 'Any' },
  { value: 'under 30 min', label: '≤30m' },
  { value: 'under 1 hour', label: '≤1h' },
  { value: 'under 2 hours', label: '≤2h' },
  { value: 'long', label: '3h+' },
];

export default function SetupScreen({ navigation }) {
  const { games, isLoading } = useBoardGameGeekCollection();
  const [playerCount, setPlayerCount] = useState(2);
  const [maxComplexityStars, setMaxComplexityStars] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [selectedMechanics, setSelectedMechanics] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mechanicsExpanded, setMechanicsExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);

  useEffect(() => {
    getPresets().then(setSavedPresets);
  }, []);

  const filteredGames = useMemo(
    () =>
      filterGames(
        games,
        playerCount,
        maxComplexityStars,
        maxLength,
        selectedMechanics,
        selectedCategories
      ),
    [
      games,
      playerCount,
      maxComplexityStars,
      maxLength,
      selectedMechanics,
      selectedCategories,
    ]
  );

  const facetGames = useMemo(
    () =>
      filterGamesByPlayersTimeComplexity(
        games,
        playerCount,
        maxComplexityStars,
        maxLength
      ),
    [games, playerCount, maxComplexityStars, maxLength]
  );

  const uniqueMechanics = getUniqueMechanics(facetGames);
  const uniqueCategories = getUniqueCategories(facetGames);

  const hasNoMatches = filteredGames.length === 0;

  const handlePresetSelect = (preset) => {
    const f = preset.filters || preset;
    const filtered = filterGames(
      games,
      f.playerCount ?? 2,
      f.maxComplexityStars ?? null,
      f.maxLength ?? null,
      f.selectedMechanics ?? [],
      f.selectedCategories ?? []
    );
    setShowPresetsModal(false);
    navigation.navigate('Results', {
      filteredGames: filtered,
      playerCount: f.playerCount ?? 2,
      filters: {
        playerCount: f.playerCount ?? 2,
        maxComplexityStars: f.maxComplexityStars ?? null,
        maxLength: f.maxLength ?? null,
        selectedMechanics: f.selectedMechanics ?? [],
        selectedCategories: f.selectedCategories ?? [],
      },
    });
  };

  const handleFindGames = () => {
    if (filteredGames.length === 0) return;
    navigation.navigate('Results', {
      filteredGames,
      playerCount,
      filters: {
        playerCount,
        maxComplexityStars,
        maxLength,
        selectedMechanics,
        selectedCategories,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.tintMain} />
        <Text style={styles.loadingText}>Loading your collection...</Text>
      </View>
    );
  }

  return (
    <View style={styles.filtersContainer}>
      <ScrollView
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filtersContent}>
          <View style={styles.filtersTop}>
            <Text style={styles.sectionTitle}>How many players?</Text>
            <View style={styles.stepperRow}>
              <TouchableOpacity
                style={styles.stepperButton}
                onPress={() => setPlayerCount((n) => Math.max(1, n - 1))}
              >
                <Text style={styles.stepperSymbol}>−</Text>
              </TouchableOpacity>
              <Text style={styles.stepperValue}>{playerCount}</Text>
              <TouchableOpacity
                style={styles.stepperButton}
                onPress={() => setPlayerCount((n) => Math.min(10, n + 1))}
              >
                <Text style={styles.stepperSymbol}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.usePresetButton}
              onPress={() => setShowPresetsModal(true)}
            >
              <Text style={styles.usePresetButtonText}>Use a preset</Text>
            </TouchableOpacity>
            {hasNoMatches && (
              <View style={styles.noMatchesCard}>
                <Text style={styles.noMatchesTitle}>No matches</Text>
                <Text style={styles.noMatchesBody}>
                  Try loosening your filters, or adding more games to your
                  collection.
                </Text>
              </View>
            )}
            <Text style={styles.label}>Play Time</Text>
            <Text style={styles.helper}>Maximum game length</Text>
            <View style={styles.chipWrap}>
              {PLAY_TIME_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value === null ? 'any' : opt.value}
                  style={[
                    styles.presetChip,
                    maxLength === opt.value && styles.presetChipSelected,
                  ]}
                  onPress={() => setMaxLength(opt.value)}
                >
                  <Text
                    style={[
                      styles.presetChipText,
                      maxLength === opt.value && styles.presetChipTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Complexity</Text>
            <Text style={styles.helper}>
              How complex are you willing to go?
            </Text>
            <View style={styles.complexitySliderWrap}>
              <Slider
                style={styles.complexitySlider}
                minimumValue={1}
                maximumValue={6}
                step={1}
                value={maxComplexityStars == null ? 6 : maxComplexityStars}
                onValueChange={(v) => {
                  const n = Math.round(v);
                  setMaxComplexityStars(n >= 6 ? null : n);
                }}
                minimumTrackTintColor={colors.tintMain}
                maximumTrackTintColor={colors.cardMain}
                thumbTintColor={colors.tintMain}
              />
              <View style={styles.complexitySliderLabels}>
                <Text style={styles.complexitySliderLabel}>Light</Text>
                <Text style={styles.complexitySliderLabel}>Heavy</Text>
              </View>
            </View>

            {(uniqueMechanics.length > 0 || uniqueCategories.length > 0) && (
              <View style={styles.advancedFiltersBlock}>
                <Text style={styles.advancedFiltersLabel}>
                  Advanced Filters
                </Text>

                {uniqueMechanics.length > 0 && (
                  <View style={styles.collapsibleSection}>
                    <TouchableOpacity
                      style={styles.collapsibleHeader}
                      onPress={() => setMechanicsExpanded((x) => !x)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.collapsibleLabel}>Mechanics</Text>
                      <Icon
                        name={mechanicsExpanded ? 'expand-less' : 'expand-more'}
                        size={24}
                        color={colors.textMain}
                      />
                    </TouchableOpacity>
                    {!mechanicsExpanded && (
                      <Text style={styles.collapsibleSummary}>
                        {selectedMechanics.length === 0
                          ? 'Any'
                          : selectedMechanics.length === 1
                            ? selectedMechanics[0]
                            : `${selectedMechanics.length} selected`}
                      </Text>
                    )}
                    {mechanicsExpanded && (
                      <View style={styles.collapsibleContent}>
                        <Text style={styles.helper}>
                          Filter by game mechanism
                        </Text>
                        <View style={styles.chipWrap}>
                          <TouchableOpacity
                            style={[
                              styles.categoryChip,
                              selectedMechanics.length === 0 &&
                                styles.categoryChipSelected,
                            ]}
                            onPress={() => setSelectedMechanics([])}
                          >
                            <Text
                              style={[
                                styles.categoryChipText,
                                selectedMechanics.length === 0 &&
                                  styles.categoryChipTextSelected,
                              ]}
                            >
                              Any
                            </Text>
                          </TouchableOpacity>
                          {uniqueMechanics.map((mech) => {
                            const isSelected = selectedMechanics.includes(mech);
                            return (
                              <TouchableOpacity
                                key={mech}
                                style={[
                                  styles.categoryChip,
                                  isSelected && styles.categoryChipSelected,
                                ]}
                                onPress={() =>
                                  setSelectedMechanics((prev) =>
                                    isSelected
                                      ? prev.filter((m) => m !== mech)
                                      : [...prev, mech]
                                  )
                                }
                              >
                                <Text
                                  style={[
                                    styles.categoryChipText,
                                    isSelected &&
                                      styles.categoryChipTextSelected,
                                  ]}
                                >
                                  {mech}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                )}

                {uniqueCategories.length > 0 && (
                  <View style={styles.collapsibleSection}>
                    <TouchableOpacity
                      style={styles.collapsibleHeader}
                      onPress={() => setCategoriesExpanded((x) => !x)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.collapsibleLabel}>Categories</Text>
                      <Icon
                        name={
                          categoriesExpanded ? 'expand-less' : 'expand-more'
                        }
                        size={24}
                        color={colors.textMain}
                      />
                    </TouchableOpacity>
                    {!categoriesExpanded && (
                      <Text style={styles.collapsibleSummary}>
                        {selectedCategories.length === 0
                          ? 'Any'
                          : selectedCategories.length === 1
                            ? selectedCategories[0]
                            : `${selectedCategories.length} selected`}
                      </Text>
                    )}
                    {categoriesExpanded && (
                      <View style={styles.collapsibleContent}>
                        <Text style={styles.helper}>Filter by game type</Text>
                        <View style={styles.chipWrap}>
                          <TouchableOpacity
                            style={[
                              styles.categoryChip,
                              selectedCategories.length === 0 &&
                                styles.categoryChipSelected,
                            ]}
                            onPress={() => setSelectedCategories([])}
                          >
                            <Text
                              style={[
                                styles.categoryChipText,
                                selectedCategories.length === 0 &&
                                  styles.categoryChipTextSelected,
                              ]}
                            >
                              Any
                            </Text>
                          </TouchableOpacity>
                          {uniqueCategories.map((cat) => {
                            const isSelected = selectedCategories.includes(cat);
                            return (
                              <TouchableOpacity
                                key={cat}
                                style={[
                                  styles.categoryChip,
                                  isSelected && styles.categoryChipSelected,
                                ]}
                                onPress={() =>
                                  setSelectedCategories((prev) =>
                                    isSelected
                                      ? prev.filter((c) => c !== cat)
                                      : [...prev, cat]
                                  )
                                }
                              >
                                <Text
                                  style={[
                                    styles.categoryChipText,
                                    isSelected &&
                                      styles.categoryChipTextSelected,
                                  ]}
                                >
                                  {cat}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            hasNoMatches && styles.primaryButtonDisabled,
          ]}
          onPress={handleFindGames}
          disabled={hasNoMatches}
        >
          <Text style={styles.primaryButtonText}>
            {hasNoMatches ? 'No matches' : `View ${filteredGames.length} Games`}
          </Text>
        </TouchableOpacity>
      </View>

      <PresetsModal
        visible={showPresetsModal}
        onClose={() => setShowPresetsModal(false)}
        quickPresets={QUICK_PRESETS}
        savedPresets={savedPresets}
        onSelectPreset={handlePresetSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepperButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cardMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperSymbol: {
    fontSize: 28,
    color: colors.textMain,
  },
  stepperValue: {
    fontSize: 38,
    color: colors.textMain,
    marginHorizontal: 32,
    minWidth: 48,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 20,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 16,
  },
  noMatchesCard: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: colors.tintMain,
  },
  noMatchesTitle: {
    fontSize: 18,
    color: colors.textMain,
    fontWeight: '600',
    marginBottom: 8,
  },
  noMatchesBody: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  matchCount: {
    fontSize: 16,
    color: colors.tintMain,
    marginBottom: 16,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  presetChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.cardMain,
  },
  presetChipSelected: {
    backgroundColor: colors.tintMain,
  },
  presetChipText: {
    fontSize: 15,
    color: colors.textMain,
  },
  presetChipTextSelected: {
    color: colors.backgroundMain,
  },
  filtersContainer: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  filtersScroll: {
    flex: 1,
  },
  filtersScrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  filtersContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  filtersTop: {},
  stickyButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: colors.backgroundMain,
    borderTopWidth: 1,
    borderTopColor: colors.cardMain,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  usePresetButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.tintMain,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  usePresetButtonText: {
    fontSize: 16,
    color: colors.tintMain,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    color: colors.textMain,
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    color: colors.textMain,
    marginTop: 24,
    marginBottom: 6,
  },
  helper: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  complexitySliderWrap: {
    marginBottom: 28,
  },
  complexitySlider: {
    width: '100%',
    height: 40,
  },
  complexitySliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 8,
  },
  complexitySliderLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  advancedFiltersBlock: {
    marginTop: 24,
  },
  advancedFiltersLabel: {
    fontSize: 18,
    color: colors.textMain,
    marginBottom: 12,
    fontWeight: '600',
  },
  collapsibleSection: {
    marginBottom: 16,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  collapsibleLabel: {
    fontSize: 18,
    color: colors.textMain,
  },
  collapsibleSummary: {
    fontSize: 15,
    color: colors.textSecondary,
    paddingBottom: 8,
  },
  collapsibleContent: {
    paddingTop: 4,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.cardMain,
  },
  categoryChipSelected: {
    backgroundColor: colors.tintMain,
  },
  categoryChipText: {
    fontSize: 15,
    color: colors.textMain,
  },
  categoryChipTextSelected: {
    color: colors.backgroundMain,
  },
});
