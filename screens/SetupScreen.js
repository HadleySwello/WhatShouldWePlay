import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';
import { getPresets } from '../helpers/presetsStorage';
import colors from '../helpers/colors';

const QUICK_PRESETS = [
  {
    id: 'party',
    name: 'Party Night',
    filters: { playerCount: 4, maxComplexityStars: 2, maxLength: 'under 1 hour', selectedMechanic: null, selectedCategory: null },
  },
  {
    id: 'heavy',
    name: 'Heavy Night',
    filters: { playerCount: 3, maxComplexityStars: 6, maxLength: null, selectedMechanic: null, selectedCategory: null },
  },
  {
    id: 'family',
    name: 'Family',
    filters: { playerCount: 4, maxComplexityStars: 2, maxLength: 'under 1 hour', selectedMechanic: null, selectedCategory: null },
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
  selectedMechanic,
  selectedCategory
) {
  return games.filter((game) => {
    const matchPlayers =
      playerCount >= game.playersMin && playerCount <= game.playersMax;
    const matchComplexity =
      maxComplexityStars == null ||
      getComplexityWeight(game) <= maxComplexityStars;
    const matchLength = lengthMatches(maxLength, game.length);
    const matchMechanic =
      !selectedMechanic ||
      (game.mechanics && game.mechanics.includes(selectedMechanic));
    const matchCategory =
      !selectedCategory ||
      (game.categories && game.categories.includes(selectedCategory));
    return (
      matchPlayers &&
      matchComplexity &&
      matchLength &&
      matchMechanic &&
      matchCategory
    );
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
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showNoMatches, setShowNoMatches] = useState(false);
  const [savedPresets, setSavedPresets] = useState([]);

  useEffect(() => {
    getPresets().then(setSavedPresets);
  }, []);

  const applyPreset = (preset) => {
    const f = preset.filters || preset;
    setPlayerCount(f.playerCount ?? 2);
    setMaxComplexityStars(f.maxComplexityStars ?? null);
    setMaxLength(f.maxLength ?? null);
    setSelectedMechanic(f.selectedMechanic ?? null);
    setSelectedCategory(f.selectedCategory ?? null);
    setShowNoMatches(false);
  };

  const filteredCount = filterGames(
    games,
    playerCount,
    maxComplexityStars,
    maxLength,
    selectedMechanic,
    selectedCategory
  ).length;

  const uniqueMechanics = getUniqueMechanics(games);
  const uniqueCategories = getUniqueCategories(games);

  const goToResults = (filteredList) => {
    navigation.navigate('Results', {
      filteredGames: filteredList,
      playerCount,
      filters: {
        playerCount,
        maxComplexityStars,
        maxLength,
        selectedMechanic,
        selectedCategory,
      },
    });
  };

  const handleFindGames = () => {
    const filtered = filterGames(
      games,
      playerCount,
      maxComplexityStars,
      maxLength,
      selectedMechanic,
      selectedCategory
    );
    if (filtered.length === 0) {
      setShowNoMatches(true);
      return;
    }
    setShowNoMatches(false);
    goToResults(filtered);
  };

  const handleSkipFilters = () => {
    const filtered = filterGames(
      games,
      playerCount,
      null,
      null,
      null,
      null
    );
    if (filtered.length === 0) {
      setShowNoMatches(true);
      return;
    }
    setShowNoMatches(false);
    goToResults(filtered);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.tintMain} />
        <Text style={styles.loadingText}>Loading your collection...</Text>
      </View>
    );
  }

  if (showNoMatches) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMatchesTitle}>No Matches</Text>
        <Text style={styles.noMatchesBody}>
          No games match your criteria. Try adjusting your filters.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowNoMatches(false)}
        >
          <Text style={styles.primaryButtonText}>Adjust Filters</Text>
        </TouchableOpacity>
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
          <Text style={styles.matchCount}>{filteredCount} games match</Text>
          <Text style={styles.sectionTitle}>Quick presets</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.presetsScroll}
            contentContainerStyle={styles.presetsScrollContent}
          >
            {QUICK_PRESETS.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.presetChip}
                onPress={() => applyPreset(p)}
              >
                <Text style={styles.presetChipText}>{p.name}</Text>
              </TouchableOpacity>
            ))}
            {savedPresets.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.presetChip}
                onPress={() => applyPreset(p)}
              >
                <Text style={styles.presetChipText}>{p.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.sectionTitle}>Optional filters</Text>

          <Text style={styles.helper}>How complex are you willing to go?</Text>
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

          {uniqueMechanics.length > 0 && (
            <>
              <Text style={styles.label}>Mechanic</Text>
              <Text style={styles.helper}>Filter by game mechanism</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryScrollContent}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    selectedMechanic === null && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedMechanic(null)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedMechanic === null &&
                        styles.categoryChipTextSelected,
                    ]}
                  >
                    Any
                  </Text>
                </TouchableOpacity>
                {uniqueMechanics.map((mech) => (
                  <TouchableOpacity
                    key={mech}
                    style={[
                      styles.categoryChip,
                      selectedMechanic === mech && styles.categoryChipSelected,
                    ]}
                    onPress={() =>
                      setSelectedMechanic(
                        selectedMechanic === mech ? null : mech
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedMechanic === mech &&
                          styles.categoryChipTextSelected,
                      ]}
                    >
                      {mech}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          {uniqueCategories.length > 0 && (
            <>
              <Text style={styles.label}>Category</Text>
              <Text style={styles.helper}>Filter by game type</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryScrollContent}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    selectedCategory === null && styles.categoryChipSelected,
                  ]}
                  onPress={() => setSelectedCategory(null)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === null && styles.categoryChipTextSelected,
                    ]}
                  >
                    Any
                  </Text>
                </TouchableOpacity>
                {uniqueCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      selectedCategory === cat && styles.categoryChipSelected,
                    ]}
                    onPress={() =>
                      setSelectedCategory(selectedCategory === cat ? null : cat)
                    }
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedCategory === cat && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}

          <Text style={styles.label}>Play Time</Text>
          <Text style={styles.helper}>Maximum game length</Text>
          <View style={styles.playTimeRow}>
            {PLAY_TIME_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value === null ? 'any' : opt.value}
                style={[
                  styles.playTimeOption,
                  maxLength === opt.value && styles.playTimeOptionSelected,
                ]}
                onPress={() => setMaxLength(opt.value)}
              >
                <Text style={styles.playTimeOptionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

          <View style={styles.filtersButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleFindGames}>
              <Text style={styles.primaryButtonText}>Find Games</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={handleSkipFilters}>
              <Text style={styles.textButtonText}>Skip Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginTop: 16,
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
  noMatchesTitle: {
    fontSize: 24,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 16,
  },
  noMatchesBody: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  matchCount: {
    fontSize: 16,
    color: colors.tintMain,
    marginBottom: 16,
  },
  presetsScroll: {
    marginBottom: 20,
    minHeight: 44,
  },
  presetsScrollContent: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
  },
  presetChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.cardMain,
  },
  presetChipText: {
    fontSize: 15,
    color: colors.textMain,
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
    paddingBottom: 32,
  },
  filtersContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  filtersTop: {
  },
  filtersButtons: {
    paddingTop: 24,
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
  categoryScroll: {
    marginBottom: 20,
    minHeight: 44,
  },
  categoryScrollContent: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
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
  playTimeRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  playTimeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: colors.cardMain,
  },
  playTimeOptionSelected: {
    backgroundColor: colors.tintSecondary,
  },
  playTimeOptionText: {
    fontSize: 14,
    color: colors.textMain,
  },
  textButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  textButtonText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
});
