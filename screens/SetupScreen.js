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
  getRituals,
  saveRitual,
  updateRitual,
  deleteRitual,
} from '../helpers/ritualsStorage';
import RitualsModal from '../components/RitualsModal';
import RitualNameModal from '../components/RitualNameModal';
import PlayerCountStepper from '../components/PlayerCountStepper';
import {
  getDefaultPlayerCount,
  DEFAULT_PLAYER_COUNT,
} from '../helpers/defaultPlayerCountStorage';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppChip from '../components/AppChip';
import copy, { t } from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';
import { QUICK_RITUALS } from '../helpers/quickRituals';

const LENGTH_ORDER = ['under 30 min', 'under 1 hour', 'under 2 hours', 'long'];

function getPlayTimeOptions(copy) {
  return [
    { value: null, label: copy.setup.any },
    { value: 'under 30 min', label: copy.lengthLabels.under30min },
    { value: 'under 1 hour', label: copy.lengthLabels.under1hour },
    { value: 'under 2 hours', label: copy.lengthLabels.under2hours },
    { value: 'long', label: copy.lengthLabels.long },
  ];
}

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

function filtersMatchRitual(
  playerCount,
  complexityMin,
  complexityMax,
  maxLength,
  selectedMechanics,
  selectedCategories,
  ritualFilters
) {
  const f = ritualFilters || {};
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
  const [showRitualsModal, setShowRitualsModal] = useState(false);
  const [showRitualNameModal, setShowRitualNameModal] = useState(false);
  const [ritualNameModalMode, setRitualNameModalMode] = useState('saveAsNew'); // 'rename' | 'saveAsNew'
  const [savedRituals, setSavedRituals] = useState([]);
  const [loadedRitual, setLoadedRitual] = useState(null);
  const { tokens, styles } = useAppTheme();

  const refreshRituals = useCallback(() => {
    getRituals().then(setSavedRituals);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshRituals();
      if (!loadedRitual) {
        getDefaultPlayerCount().then(setPlayerCount);
      }
    }, [refreshRituals, loadedRitual])
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
    loadedRitual &&
    loadedRitual.filters &&
    !filtersMatchRitual(
      playerCount,
      complexityMin,
      complexityMax,
      maxLength,
      selectedMechanics,
      selectedCategories,
      loadedRitual.filters
    );
  const isMyRitual = loadedRitual && !loadedRitual.isQuick;

  const applyRitualFilters = useCallback((f) => {
    const ff = f || {};
    setPlayerCount(ff.playerCount ?? DEFAULT_PLAYER_COUNT);
    setComplexityMin(ff.complexityMin ?? null);
    setComplexityMax(ff.complexityMax ?? null);
    setMaxLength(ff.maxLength ?? null);
    setSelectedMechanics(ff.selectedMechanics ?? []);
    setSelectedCategories(ff.selectedCategories ?? []);
  }, []);

  const handleRitualSelect = useCallback(
    (ritual) => {
      const f = ritual.filters || ritual;
      applyRitualFilters(f);
      setLoadedRitual({
        id: ritual.id,
        name: ritual.name,
        filters: {
          playerCount: f.playerCount ?? DEFAULT_PLAYER_COUNT,
          complexityMin: f.complexityMin ?? null,
          complexityMax: f.complexityMax ?? null,
          maxLength: f.maxLength ?? null,
          selectedMechanics: f.selectedMechanics ?? [],
          selectedCategories: f.selectedCategories ?? [],
        },
        isQuick: ritual.isQuick === true,
      });
      setShowRitualsModal(false);
    },
    [applyRitualFilters]
  );

  const handleSaveOverwrite = useCallback(() => {
    if (!loadedRitual || !isMyRitual || !isModified) return;
    updateRitual(loadedRitual.id, {
      name: loadedRitual.name,
      filters: currentFilters,
    }).then((updated) => {
      if (updated) {
        setLoadedRitual({ ...loadedRitual, filters: currentFilters });
        refreshRituals();
      }
    });
  }, [loadedRitual, isMyRitual, isModified, currentFilters, refreshRituals]);

  const handleSaveAsNew = useCallback(() => {
    setRitualNameModalMode('saveAsNew');
    setShowRitualNameModal(true);
  }, []);

  const handleRename = useCallback(() => {
    setRitualNameModalMode('rename');
    setShowRitualNameModal(true);
  }, []);

  const handleRitualNameSave = useCallback(
    (name) => {
      if (ritualNameModalMode === 'rename' && loadedRitual && isMyRitual) {
        updateRitual(loadedRitual.id, {
          name,
          filters: loadedRitual.filters,
        }).then((updated) => {
          if (updated) {
            setLoadedRitual({ ...loadedRitual, name });
            setShowRitualNameModal(false);
            refreshRituals();
          }
        });
      } else {
        saveRitual(name, currentFilters).then((ritual) => {
          setLoadedRitual({
            id: ritual.id,
            name: ritual.name,
            filters: ritual.filters,
            isQuick: false,
          });
          setShowRitualNameModal(false);
          refreshRituals();
        });
      }
    },
    [
      ritualNameModalMode,
      loadedRitual,
      isMyRitual,
      currentFilters,
      refreshRituals,
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
          {copy.setup.loading}
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
              style={styles.useRitualButton}
              onPress={() => setShowRitualsModal(true)}
            >
              <AppText variant="useRitualButton">
                {copy.setup.loadRitual}
              </AppText>
            </TouchableOpacity>
            <AppText variant="sectionTitle">
              {copy.setup.howManyPlayers}
            </AppText>
            <PlayerCountStepper
              value={playerCount}
              onValueChange={setPlayerCount}
            />
            {hasNoMatches && (
              <View style={styles.noMatchesCard}>
                <AppText variant="noMatchesTitle">
                  {copy.setup.noMatchesTitle}
                </AppText>
                <AppText variant="noMatchesBody">
                  {copy.setup.noMatchesBody}
                </AppText>
              </View>
            )}
            <AppText variant="label" style={styles.label}>
              {copy.setup.playTime}
            </AppText>
            <AppText variant="helper" style={styles.helper}>
              {copy.setup.maxLength}
            </AppText>
            <View style={styles.chipWrap}>
              {getPlayTimeOptions(copy).map((opt) => (
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
              {copy.setup.complexity}
            </AppText>
            <AppText variant="helper" style={styles.helper}>
              {copy.setup.complexityHelper}
            </AppText>
            <View style={styles.complexityRow}>
              <AppText variant="body">{copy.setup.anyComplexity}</AppText>
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
                  {t(copy.setup.minMaxReadout, {
                    min: complexityMin ?? 0,
                    max: complexityMax ?? 5,
                  })}
                </AppText>
              </View>
            ) : null}

            {(uniqueMechanics.length > 0 || uniqueCategories.length > 0) && (
              <View style={styles.advancedFiltersBlock}>
                <AppText variant="advancedFiltersLabel">
                  {copy.setup.advancedFilters}
                </AppText>

                {uniqueMechanics.length > 0 && (
                  <View style={styles.collapsibleSection}>
                    <TouchableOpacity
                      style={styles.collapsibleHeader}
                      onPress={() => setMechanicsExpanded((x) => !x)}
                      activeOpacity={0.7}
                    >
                      <AppText variant="collapsibleLabel">
                        {copy.setup.mechanics}
                      </AppText>
                      <Icon
                        name={mechanicsExpanded ? 'expand-less' : 'expand-more'}
                        size={24}
                        color={tokens.colors.textMain}
                      />
                    </TouchableOpacity>
                    {!mechanicsExpanded && (
                      <AppText variant="collapsibleSummary">
                        {selectedMechanics.length === 0
                          ? copy.setup.any
                          : selectedMechanics.length === 1
                            ? selectedMechanics[0]
                            : t(copy.setup.selectedCount, {
                                count: selectedMechanics.length,
                              })}
                      </AppText>
                    )}
                    {mechanicsExpanded && (
                      <View style={styles.collapsibleContent}>
                        <AppText variant="helper">
                          {copy.setup.mechanicsHelper}
                        </AppText>
                        <View style={styles.chipWrap}>
                          <AppChip
                            selected={selectedMechanics.length === 0}
                            onPress={() => setSelectedMechanics([])}
                          >
                            {copy.setup.any}
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
                      <AppText variant="collapsibleLabel">
                        {copy.setup.categories}
                      </AppText>
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
                          ? copy.setup.any
                          : selectedCategories.length === 1
                            ? selectedCategories[0]
                            : t(copy.setup.selectedCount, {
                                count: selectedCategories.length,
                              })}
                      </AppText>
                    )}
                    {categoriesExpanded && (
                      <View style={styles.collapsibleContent}>
                        <AppText variant="helper">
                          {copy.setup.categoriesHelper}
                        </AppText>
                        <View style={styles.chipWrap}>
                          <AppChip
                            selected={selectedCategories.length === 0}
                            onPress={() => setSelectedCategories([])}
                          >
                            {copy.setup.any}
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
            styles.button.primary,
            layout.stretch,
            hasNoMatches && styles.button.disabled,
          ]}
        >
          {hasNoMatches
            ? copy.setup.ctaNoMatches
            : t(copy.setup.ctaViewGames, { count: filteredGames.length })}
        </AppButton>
        <View style={styles.stickyRitualSection}>
          <AppText variant="ritualHeaderTitle">
            {loadedRitual
              ? isModified
                ? t(copy.setup.ritualHeaderModified, {
                    name: loadedRitual.name,
                  })
                : t(copy.setup.ritualHeader, { name: loadedRitual.name })
              : copy.setup.customFilters}
          </AppText>
          {(loadedRitual == null ||
            (isMyRitual && isModified) ||
            (isMyRitual && !isModified) ||
            (loadedRitual && loadedRitual.isQuick && isModified)) && (
            <View style={styles.ritualSaveControls}>
              {loadedRitual == null ? (
                <TouchableOpacity
                  style={styles.stickyRitualAction}
                  onPress={handleSaveAsNew}
                >
                  <AppText variant="ritualSaveControlText">
                    {copy.setup.saveAsNew}
                  </AppText>
                </TouchableOpacity>
              ) : isMyRitual && isModified ? (
                <React.Fragment>
                  <TouchableOpacity
                    style={styles.stickyRitualAction}
                    onPress={handleSaveOverwrite}
                  >
                    <AppText variant="ritualSaveControlText">
                      {copy.setup.save}
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.stickyRitualAction}
                    onPress={handleSaveAsNew}
                  >
                    <AppText variant="ritualSaveControlText">
                      {copy.setup.saveAsNew}
                    </AppText>
                  </TouchableOpacity>
                </React.Fragment>
              ) : isMyRitual && !isModified ? (
                <TouchableOpacity
                  style={styles.stickyRitualAction}
                  onPress={handleRename}
                >
                  <AppText variant="ritualSaveControlText">
                    {copy.setup.rename}
                  </AppText>
                </TouchableOpacity>
              ) : loadedRitual.isQuick && isModified ? (
                <TouchableOpacity
                  style={styles.stickyRitualAction}
                  onPress={handleSaveAsNew}
                >
                  <AppText variant="ritualSaveControlText">
                    {copy.setup.saveAsNew}
                  </AppText>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      </View>

      <RitualsModal
        visible={showRitualsModal}
        onClose={() => setShowRitualsModal(false)}
        quickRituals={QUICK_RITUALS}
        savedRituals={savedRituals}
        onSelectRitual={handleRitualSelect}
        onDeleteRitual={(ritual) => {
          deleteRitual(ritual.id).then(() => {
            if (loadedRitual && loadedRitual.id === ritual.id) {
              setLoadedRitual(null);
            }
            refreshRituals();
          });
        }}
      />
      <RitualNameModal
        visible={showRitualNameModal}
        onClose={() => setShowRitualNameModal(false)}
        onSave={handleRitualNameSave}
        excludeId={
          ritualNameModalMode === 'rename' && loadedRitual
            ? loadedRitual.id
            : undefined
        }
        checkRitualCount={ritualNameModalMode === 'saveAsNew'}
      />
    </View>
  );
}
