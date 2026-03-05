import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RangeSlider } from '@sharcoux/slider';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';
import {
  getPresets,
  savePreset,
  updatePreset,
  deletePreset,
} from '../helpers/presetsStorage';
import PresetsModal from '../components/PresetsModal';
import PresetNameModal from '../components/PresetNameModal';
import PlayerCountStepper from '../components/PlayerCountStepper';
import {
  getDefaultPlayerCount,
  DEFAULT_PLAYER_COUNT,
} from '../helpers/defaultPlayerCountStorage';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppChip from '../components/AppChip';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const QUICK_PRESETS = [
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

const LENGTH_ORDER = ['under 30 min', 'under 1 hour', 'under 2 hours', 'long'];

function lengthMatches(maxLength, gameLength) {
  if (!maxLength) return true;
  if (maxLength === 'long') return gameLength === 'long';
  const maxIdx = LENGTH_ORDER.indexOf(maxLength);
  const gameIdx = LENGTH_ORDER.indexOf(gameLength);
  return gameIdx >= 0 && gameIdx <= maxIdx;
}

function gameMatchesComplexityFilter(game, complexityMin, complexityMax) {
  const active = complexityMin != null || complexityMax != null;
  if (!active) return true;
  const w = game.complexityWeight;
  if (!Number.isFinite(w)) return false;
  if (complexityMin != null && w < complexityMin) return false;
  if (complexityMax != null && w > complexityMax) return false;
  return true;
}

function filterGames(
  games,
  playerCount,
  complexityMin,
  complexityMax,
  maxLength,
  selectedMechanics,
  selectedCategories
) {
  const mechs = selectedMechanics ?? [];
  const cats = selectedCategories ?? [];
  return games.filter((game) => {
    const matchPlayers =
      playerCount >= game.playersMin && playerCount <= game.playersMax;
    const matchComplexity = gameMatchesComplexityFilter(
      game,
      complexityMin,
      complexityMax
    );
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

function filtersMatchPreset(
  playerCount,
  complexityMin,
  complexityMax,
  maxLength,
  selectedMechanics,
  selectedCategories,
  presetFilters
) {
  const f = presetFilters || {};
  const mechs = selectedMechanics ?? [];
  const cats = selectedCategories ?? [];
  const pMechs = f.selectedMechanics ?? [];
  const pCats = f.selectedCategories ?? [];
  const mechsEq =
    mechs.length === pMechs.length && mechs.every((m, i) => m === pMechs[i]);
  const catsEq =
    cats.length === pCats.length && cats.every((c, i) => c === pCats[i]);
  return (
    (playerCount ?? DEFAULT_PLAYER_COUNT) ===
      (f.playerCount ?? DEFAULT_PLAYER_COUNT) &&
    (complexityMin ?? null) === (f.complexityMin ?? null) &&
    (complexityMax ?? null) === (f.complexityMax ?? null) &&
    (maxLength ?? null) === (f.maxLength ?? null) &&
    mechsEq &&
    catsEq
  );
}

function getCurrentFilters(
  playerCount,
  complexityMin,
  complexityMax,
  maxLength,
  selectedMechanics,
  selectedCategories
) {
  return {
    playerCount: playerCount ?? DEFAULT_PLAYER_COUNT,
    complexityMin: complexityMin ?? null,
    complexityMax: complexityMax ?? null,
    maxLength: maxLength ?? null,
    selectedMechanics: selectedMechanics ?? [],
    selectedCategories: selectedCategories ?? [],
  };
}

export default function SetupScreen({ navigation }) {
  const { games, isLoading } = useBoardGameGeekCollection();
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
  const [complexityMin, setComplexityMin] = useState(null);
  const [complexityMax, setComplexityMax] = useState(null);
  const [maxLength, setMaxLength] = useState(null);
  const [selectedMechanics, setSelectedMechanics] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mechanicsExpanded, setMechanicsExpanded] = useState(false);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [showPresetNameModal, setShowPresetNameModal] = useState(false);
  const [presetNameModalMode, setPresetNameModalMode] = useState('saveAsNew'); // 'rename' | 'saveAsNew'
  const [savedPresets, setSavedPresets] = useState([]);
  const [loadedPreset, setLoadedPreset] = useState(null);
  const { tokens, styles } = useAppTheme();

  const refreshPresets = useCallback(() => {
    getPresets().then(setSavedPresets);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshPresets();
      if (!loadedPreset) {
        getDefaultPlayerCount().then(setPlayerCount);
      }
    }, [refreshPresets, loadedPreset])
  );

  const filteredGames = useMemo(
    () =>
      filterGames(
        games,
        playerCount,
        complexityMin,
        complexityMax,
        maxLength,
        selectedMechanics,
        selectedCategories
      ),
    [
      games,
      playerCount,
      complexityMin,
      complexityMax,
      maxLength,
      selectedMechanics,
      selectedCategories,
    ]
  );

  const uniqueMechanics = getUniqueMechanics(games);
  const uniqueCategories = getUniqueCategories(games);

  const hasNoMatches = filteredGames.length === 0;

  const currentFilters = getCurrentFilters(
    playerCount,
    complexityMin,
    complexityMax,
    maxLength,
    selectedMechanics,
    selectedCategories
  );
  const isModified =
    loadedPreset &&
    loadedPreset.filters &&
    !filtersMatchPreset(
      playerCount,
      complexityMin,
      complexityMax,
      maxLength,
      selectedMechanics,
      selectedCategories,
      loadedPreset.filters
    );
  const isMyPreset = loadedPreset && !loadedPreset.isQuick;

  const applyPresetFilters = useCallback((f) => {
    const ff = f || {};
    setPlayerCount(ff.playerCount ?? DEFAULT_PLAYER_COUNT);
    setComplexityMin(ff.complexityMin ?? null);
    setComplexityMax(ff.complexityMax ?? null);
    setMaxLength(ff.maxLength ?? null);
    setSelectedMechanics(ff.selectedMechanics ?? []);
    setSelectedCategories(ff.selectedCategories ?? []);
  }, []);

  const handlePresetSelect = useCallback(
    (preset) => {
      const f = preset.filters || preset;
      applyPresetFilters(f);
      setLoadedPreset({
        id: preset.id,
        name: preset.name,
        filters: {
          playerCount: f.playerCount ?? DEFAULT_PLAYER_COUNT,
          complexityMin: f.complexityMin ?? null,
          complexityMax: f.complexityMax ?? null,
          maxLength: f.maxLength ?? null,
          selectedMechanics: f.selectedMechanics ?? [],
          selectedCategories: f.selectedCategories ?? [],
        },
        isQuick: preset.isQuick === true,
      });
      setShowPresetsModal(false);
    },
    [applyPresetFilters]
  );

  const handleSaveOverwrite = useCallback(() => {
    if (!loadedPreset || !isMyPreset || !isModified) return;
    updatePreset(loadedPreset.id, {
      name: loadedPreset.name,
      filters: currentFilters,
    }).then((updated) => {
      if (updated) {
        setLoadedPreset({ ...loadedPreset, filters: currentFilters });
        refreshPresets();
      }
    });
  }, [loadedPreset, isMyPreset, isModified, currentFilters, refreshPresets]);

  const handleSaveAsNew = useCallback(() => {
    setPresetNameModalMode('saveAsNew');
    setShowPresetNameModal(true);
  }, []);

  const handleRename = useCallback(() => {
    setPresetNameModalMode('rename');
    setShowPresetNameModal(true);
  }, []);

  const handlePresetNameSave = useCallback(
    (name) => {
      if (presetNameModalMode === 'rename' && loadedPreset && isMyPreset) {
        updatePreset(loadedPreset.id, {
          name,
          filters: loadedPreset.filters,
        }).then((updated) => {
          if (updated) {
            setLoadedPreset({ ...loadedPreset, name });
            setShowPresetNameModal(false);
            refreshPresets();
          }
        });
      } else {
        savePreset(name, currentFilters).then((preset) => {
          setLoadedPreset({
            id: preset.id,
            name: preset.name,
            filters: preset.filters,
            isQuick: false,
          });
          setShowPresetNameModal(false);
          refreshPresets();
        });
      }
    },
    [
      presetNameModalMode,
      loadedPreset,
      isMyPreset,
      currentFilters,
      refreshPresets,
    ]
  );

  const handleFindGames = () => {
    if (filteredGames.length === 0) return;
    navigation.navigate('Results', {
      filteredGames,
      playerCount,
      filters: {
        playerCount,
        complexityMin,
        complexityMax,
        maxLength,
        selectedMechanics,
        selectedCategories,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.screen.container, layout.center]}>
        <ActivityIndicator size="large" color={tokens.colors.tintMain} />
        <AppText variant="helper" style={layout.marginTopMd}>
          Loading your collection...
        </AppText>
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
          <View>
            <TouchableOpacity
              style={styles.usePresetButton}
              onPress={() => setShowPresetsModal(true)}
            >
              <AppText variant="usePresetButton">Load a Preset</AppText>
            </TouchableOpacity>
            <AppText variant="sectionTitle">How many players?</AppText>
            <PlayerCountStepper
              value={playerCount}
              onValueChange={setPlayerCount}
            />
            {hasNoMatches && (
              <View style={styles.noMatchesCard}>
                <AppText variant="noMatchesTitle">
                  No games match these filters.
                </AppText>
                <AppText variant="noMatchesBody">
                  Try adjusting your filters.
                </AppText>
              </View>
            )}
            <AppText variant="label" style={styles.label}>
              Play Time
            </AppText>
            <AppText variant="helper" style={styles.helper}>
              Maximum game length
            </AppText>
            <View style={styles.chipWrap}>
              {PLAY_TIME_OPTIONS.map((opt) => (
                <AppChip
                  key={opt.value === null ? 'any' : opt.value}
                  selected={maxLength === opt.value}
                  onPress={() => setMaxLength(opt.value)}
                >
                  {opt.label}
                </AppChip>
              ))}
            </View>
            <AppText variant="label" style={styles.label}>
              Complexity
            </AppText>
            <AppText variant="helper" style={styles.helper}>
              How complex are you willing to go?
            </AppText>
            <View style={styles.complexityRow}>
              <AppText variant="body">Any complexity</AppText>
              <Switch
                value={complexityMin == null && complexityMax == null}
                onValueChange={(on) => {
                  if (on) {
                    setComplexityMin(null);
                    setComplexityMax(null);
                  } else {
                    setComplexityMin(0);
                    setComplexityMax(5);
                  }
                }}
                trackColor={{
                  false: tokens.colors.cardMain,
                  true: tokens.colors.tintMain,
                }}
                thumbColor="#fff"
              />
            </View>
            {complexityMin != null || complexityMax != null ? (
              <View style={styles.complexitySliderWrap}>
                <RangeSlider
                  style={styles.complexitySlider}
                  range={[complexityMin ?? 0, complexityMax ?? 5]}
                  minimumValue={0}
                  maximumValue={5}
                  step={1}
                  crossingAllowed={false}
                  inboundColor={tokens.colors.tintMain}
                  outboundColor={tokens.colors.cardMain}
                  thumbTintColor={tokens.colors.tintMain}
                  onValueChange={(range) => {
                    let [low, high] = range;
                    low = Math.round(low);
                    high = Math.round(high);
                    if (low > high) low = high;
                    if (high < low) high = low;
                    setComplexityMin(low);
                    setComplexityMax(high);
                  }}
                />
                <AppText variant="helper" style={styles.complexityReadout}>
                  Min: {complexityMin ?? 0} Max: {complexityMax ?? 5}
                </AppText>
              </View>
            ) : (
              <AppText variant="helper" style={styles.complexityReadout}>
                Any
              </AppText>
            )}

            {(uniqueMechanics.length > 0 || uniqueCategories.length > 0) && (
              <View style={styles.advancedFiltersBlock}>
                <AppText variant="advancedFiltersLabel">
                  Advanced Filters
                </AppText>

                {uniqueMechanics.length > 0 && (
                  <View style={styles.collapsibleSection}>
                    <TouchableOpacity
                      style={styles.collapsibleHeader}
                      onPress={() => setMechanicsExpanded((x) => !x)}
                      activeOpacity={0.7}
                    >
                      <AppText variant="collapsibleLabel">Mechanics</AppText>
                      <Icon
                        name={mechanicsExpanded ? 'expand-less' : 'expand-more'}
                        size={24}
                        color={tokens.colors.textMain}
                      />
                    </TouchableOpacity>
                    {!mechanicsExpanded && (
                      <AppText variant="collapsibleSummary">
                        {selectedMechanics.length === 0
                          ? 'Any'
                          : selectedMechanics.length === 1
                            ? selectedMechanics[0]
                            : `${selectedMechanics.length} selected`}
                      </AppText>
                    )}
                    {mechanicsExpanded && (
                      <View style={styles.collapsibleContent}>
                        <AppText variant="helper">
                          Filter by game mechanism
                        </AppText>
                        <View style={styles.chipWrap}>
                          <AppChip
                            selected={selectedMechanics.length === 0}
                            onPress={() => setSelectedMechanics([])}
                          >
                            Any
                          </AppChip>
                          {uniqueMechanics.map((mech) => {
                            const isSelected = selectedMechanics.includes(mech);
                            return (
                              <AppChip
                                key={mech}
                                selected={isSelected}
                                onPress={() =>
                                  setSelectedMechanics((prev) =>
                                    isSelected
                                      ? prev.filter((m) => m !== mech)
                                      : [...prev, mech]
                                  )
                                }
                              >
                                {mech}
                              </AppChip>
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
                      <AppText variant="collapsibleLabel">Categories</AppText>
                      <Icon
                        name={
                          categoriesExpanded ? 'expand-less' : 'expand-more'
                        }
                        size={24}
                        color={tokens.colors.textMain}
                      />
                    </TouchableOpacity>
                    {!categoriesExpanded && (
                      <AppText variant="collapsibleSummary">
                        {selectedCategories.length === 0
                          ? 'Any'
                          : selectedCategories.length === 1
                            ? selectedCategories[0]
                            : `${selectedCategories.length} selected`}
                      </AppText>
                    )}
                    {categoriesExpanded && (
                      <View style={styles.collapsibleContent}>
                        <AppText variant="helper">Filter by game type</AppText>
                        <View style={styles.chipWrap}>
                          <AppChip
                            selected={selectedCategories.length === 0}
                            onPress={() => setSelectedCategories([])}
                          >
                            Any
                          </AppChip>
                          {uniqueCategories.map((cat) => {
                            const isSelected = selectedCategories.includes(cat);
                            return (
                              <AppChip
                                key={cat}
                                selected={isSelected}
                                onPress={() =>
                                  setSelectedCategories((prev) =>
                                    isSelected
                                      ? prev.filter((c) => c !== cat)
                                      : [...prev, cat]
                                  )
                                }
                              >
                                {cat}
                              </AppChip>
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
        <AppButton
          variant="primary"
          onPress={handleFindGames}
          disabled={hasNoMatches}
          style={[
            styles.button.primaryCompact,
            layout.stretch,
            hasNoMatches && styles.button.disabled,
          ]}
        >
          {hasNoMatches ? 'No matches' : `View ${filteredGames.length} Games`}
        </AppButton>
        <View style={styles.stickyPresetSection}>
          <AppText variant="presetHeaderTitle">
            {loadedPreset
              ? isModified
                ? `Preset: ${loadedPreset.name} (modified)`
                : `Preset: ${loadedPreset.name}`
              : 'Custom filters'}
          </AppText>
          {(loadedPreset == null ||
            (isMyPreset && isModified) ||
            (isMyPreset && !isModified) ||
            (loadedPreset && loadedPreset.isQuick && isModified)) && (
            <View style={styles.presetSaveControls}>
              {loadedPreset == null ? (
                <TouchableOpacity
                  style={styles.stickyPresetAction}
                  onPress={handleSaveAsNew}
                >
                  <AppText variant="presetSaveControlText">Save as new</AppText>
                </TouchableOpacity>
              ) : isMyPreset && isModified ? (
                <React.Fragment>
                  <TouchableOpacity
                    style={styles.stickyPresetAction}
                    onPress={handleSaveOverwrite}
                  >
                    <AppText variant="presetSaveControlText">Save</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.stickyPresetAction}
                    onPress={handleSaveAsNew}
                  >
                    <AppText variant="presetSaveControlText">
                      Save as new
                    </AppText>
                  </TouchableOpacity>
                </React.Fragment>
              ) : isMyPreset && !isModified ? (
                <TouchableOpacity
                  style={styles.stickyPresetAction}
                  onPress={handleRename}
                >
                  <AppText variant="presetSaveControlText">Rename</AppText>
                </TouchableOpacity>
              ) : loadedPreset.isQuick && isModified ? (
                <TouchableOpacity
                  style={styles.stickyPresetAction}
                  onPress={handleSaveAsNew}
                >
                  <AppText variant="presetSaveControlText">Save as new</AppText>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      </View>

      <PresetsModal
        visible={showPresetsModal}
        onClose={() => setShowPresetsModal(false)}
        quickPresets={QUICK_PRESETS}
        savedPresets={savedPresets}
        onSelectPreset={handlePresetSelect}
        onDeletePreset={(preset) => {
          deletePreset(preset.id).then(() => {
            if (loadedPreset && loadedPreset.id === preset.id) {
              setLoadedPreset(null);
            }
            refreshPresets();
          });
        }}
      />
      <PresetNameModal
        visible={showPresetNameModal}
        onClose={() => setShowPresetNameModal(false)}
        onSave={handlePresetNameSave}
        excludeId={
          presetNameModalMode === 'rename' && loadedPreset
            ? loadedPreset.id
            : undefined
        }
        checkPresetCount={presetNameModalMode === 'saveAsNew'}
      />
    </View>
  );
}
