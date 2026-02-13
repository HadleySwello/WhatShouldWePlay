import React, { useState } from 'react';
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
import colors from '../helpers/colors';

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

function filterGames(games, playerCount, maxComplexityStars, maxLength) {
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

const PLAY_TIME_OPTIONS = [
  { value: null, label: 'Any' },
  { value: 'under 30 min', label: '≤30m' },
  { value: 'under 1 hour', label: '≤1h' },
  { value: 'under 2 hours', label: '≤2h' },
  { value: 'long', label: '3h+' },
];

export default function WizardScreen({ navigation }) {
  const { games, isLoading } = useBoardGameGeekCollection();
  const [wizardStep, setWizardStep] = useState('players');
  const [playerCount, setPlayerCount] = useState(2);
  const [maxComplexityStars, setMaxComplexityStars] = useState(null);
  const [maxLength, setMaxLength] = useState(null);

  const goToResults = (filteredList) => {
    navigation.navigate('Results', {
      filteredGames: filteredList,
      playerCount,
    });
  };

  const handleFindGames = () => {
    const filtered = filterGames(games, playerCount, maxComplexityStars, maxLength);
    goToResults(filtered);
  };

  const handleSkipFilters = () => {
    const filtered = filterGames(games, playerCount, null, null);
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

  if (wizardStep === 'players') {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.progress}>Step 1 of 2</Text>
        <Text style={styles.question}>How many players?</Text>
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
          style={styles.primaryButton}
          onPress={() => setWizardStep('filters')}
        >
          <Text style={styles.primaryButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filtersContent}>
        <View style={styles.filtersTop}>
          <Text style={[styles.progress, styles.filtersProgress]}>Step 2 of 2</Text>
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
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 16,
  },
  progress: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  question: {
    fontSize: 24,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 32,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
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
  filtersContainer: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  filtersContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  filtersTop: {
    flex: 1,
  },
  filtersButtons: {
    paddingTop: 24,
  },
  filtersProgress: {
    marginBottom: 24,
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
