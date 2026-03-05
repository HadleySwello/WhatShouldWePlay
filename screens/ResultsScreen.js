import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SpinnerScreen from './SpinnerScreen';
import { savePreset } from '../helpers/presetsStorage';
import { getVotes, setVotes } from '../helpers/voteCache';
import { getVotingModeEnabled } from '../helpers/votingModeStorage';

import AppText from '../components/AppText';
import VotingModeInfoModal from '../components/VotingModeInfoModal';
import { getComplexityTier } from '../helpers/complexity';
import AppButton from '../components/AppButton';
import PresetNameModal from '../components/PresetNameModal';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

function initialVotes(games) {
  return (games || []).reduce((acc, game) => {
    acc[game.name] = 0;
    return acc;
  }, {});
}

function mergeCachedWithInitial(cached, filteredGames) {
  const result = initialVotes(filteredGames);
  if (!cached || typeof cached !== 'object') return result;
  for (const game of filteredGames) {
    if (
      game.name in cached &&
      typeof cached[game.name] === 'number' &&
      cached[game.name] >= 0
    ) {
      result[game.name] = Math.floor(cached[game.name]);
    }
  }
  return result;
}

function equalWeightParticipants(filteredGames) {
  return (filteredGames || []).map((g) => g.name);
}

export default function ResultsScreen({ route, navigation }) {
  const {
    filteredGames = [],
    playerCount: rawPlayerCount = 2,
    filters,
  } = route.params || {};
  const playerCount = Math.max(0, rawPlayerCount ?? 0);
  const { styles, tokens } = useAppTheme();

  const [showSpinner, setShowSpinner] = useState(false);
  const [votingModeEnabled, setVotingModeEnabled] = useState(false);
  const [showVotingModeInfoModal, setShowVotingModeInfoModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getVotingModeEnabled().then(setVotingModeEnabled);
    }, [])
  );
  const [showPresetNameModal, setShowPresetNameModal] = useState(false);
  const [presetSaved, setPresetSaved] = useState(false);

  const gameKey = filteredGames.map((g) => g.id).join(',');
  const [gameVotes, setGameVotes] = useState(() => {
    const cached = getVotes(gameKey);
    return cached
      ? mergeCachedWithInitial(cached, filteredGames)
      : initialVotes(filteredGames);
  });

  useEffect(() => {
    const cached = getVotes(gameKey);
    const merged = cached
      ? mergeCachedWithInitial(cached, filteredGames)
      : initialVotes(filteredGames);
    setGameVotes(merged);
  }, [gameKey]);

  useEffect(() => {
    if (gameKey) {
      setVotes(gameKey, gameVotes);
    }
  }, [gameKey, gameVotes]);

  const totalVotes = Object.values(gameVotes).reduce((sum, n) => sum + n, 0);
  const weightedParticipants = Object.entries(gameVotes).flatMap(
    ([gameName, votes]) => (votes > 0 ? Array(votes).fill(gameName) : [])
  );
  const isSingleGame = filteredGames.length === 1;

  const spinnerParticipants =
    votingModeEnabled &&
    totalVotes > 0 &&
    weightedParticipants.length > 0
      ? weightedParticipants
      : equalWeightParticipants(filteredGames);

  const handleSpin = () => {
    if (filteredGames.length === 0) return;
    if (isSingleGame) {
      const game = filteredGames[0];
      navigation.navigate('SelectedGame', {
        game: game ?? null,
        filters,
        filteredGames,
        playerCount,
      });
      return;
    }
    setShowSpinner(true);
  };

  const handleSpinnerComplete = (winnerName) => {
    setShowSpinner(false);
    const game = filteredGames.find((g) => g.name === winnerName);
    navigation.navigate('SelectedGame', {
      game: game ?? null,
      filters,
      filteredGames,
      playerCount,
    });
  };

  const handleVote = (gameName, change) => {
    setGameVotes((prev) => {
      const updated = { ...prev };
      const current = updated[gameName] || 0;
      const total = Object.values(updated).reduce((s, v) => s + v, 0);
      const newTotal = total - current + (current + change);
      if (change > 0 && newTotal > playerCount) return prev;
      updated[gameName] = Math.max(0, current + change);
      return updated;
    });
  };

  const canSavePreset = filters && filteredGames.length > 0;
  const allVotesAssigned =
    playerCount > 0 && totalVotes >= playerCount && filteredGames.length > 0;

  const isSinglePlayer = playerCount === 1;
  const handleVotingModeToggle = (value) => {
    if (value === false) {
      setGameVotes(initialVotes(filteredGames));
    }
    setVotingModeEnabled(value);
  };
  const handleVotingModeRowPress = () => {
    if (isSinglePlayer) {
      Alert.alert(
        'Voting Mode',
        'Voting mode is not available for single-player games.'
      );
    }
  };

  const listHeader = (
    <View>
      <AppText variant="voteHint">
        {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}{' '}
        match
      </AppText>
      <View style={styles.votingModeRow}>
        <TouchableOpacity
          style={layout.flex1}
          onPress={isSinglePlayer ? handleVotingModeRowPress : undefined}
          activeOpacity={isSinglePlayer ? 0.7 : 1}
        >
          <View style={styles.votingModeRowInner}>
            <AppText variant="body">Enable Voting Mode</AppText>
            <Switch
              value={isSinglePlayer ? false : votingModeEnabled}
              onValueChange={handleVotingModeToggle}
              disabled={isSinglePlayer}
              trackColor={{
                false: tokens.colors.cardMain,
                true: tokens.colors.tintMain,
              }}
              thumbColor="#fff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowVotingModeInfoModal(true)}
          style={styles.votingModeInfoIcon}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon name="info-outline" size={22} color={tokens.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      {votingModeEnabled && filteredGames.length > 0 && (
        <AppText variant="voteHint">
          One vote per player ({totalVotes} of {playerCount} assigned)
        </AppText>
      )}
      {votingModeEnabled && allVotesAssigned && (
        <AppText variant="allVotesAssigned">All votes assigned.</AppText>
      )}
      {canSavePreset &&
        (presetSaved ? (
          <AppText variant="presetSavedText">Preset saved!</AppText>
        ) : (
          <TouchableOpacity
            style={styles.savePresetButton}
            onPress={() => setShowPresetNameModal(true)}
          >
            <AppText variant="savePresetButtonText">Save as preset</AppText>
          </TouchableOpacity>
        ))}
    </View>
  );

  if (filteredGames.length === 0) {
    return (
      <View style={styles.screen.container}>
        <View style={styles.emptyState}>
          <AppText variant="emptyTitle">No matches</AppText>
          <AppText variant="emptyBody">Try adjusting your filters.</AppText>
          <AppButton
            variant="primary"
            onPress={() => navigation.goBack()}
            style={styles.button.primaryCompact}
          >
            Back to Filters
          </AppButton>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen.container}>
      <View style={styles.listSection}>
        {listHeader}
        <FlatList
          data={filteredGames}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.gameItem}>
              {item.thumbnail ? (
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.listItem.thumbnail}
                  resizeMode="cover"
                />
              ) : (
                <View
                  style={[
                    styles.listItem.thumbnail,
                    styles.listItem.thumbnailPlaceholder,
                  ]}
                />
              )}
              <View style={layout.flex1}>
                <AppText variant="gameName">{item.name}</AppText>
                <AppText variant="gameDetails">
                  {item.playersMin}-{item.playersMax} players · {item.length} ·
                  {(() => {
                    const tier = getComplexityTier(item.complexityWeight);
                    if (tier != null) return ` ${tier}`;
                    const w = item.complexityWeight;
                    return Number.isFinite(w) ? ` ${w.toFixed(1)}` : ' —';
                  })()}
                </AppText>
              </View>
              {votingModeEnabled && (
                <View style={styles.voteRow}>
                  <TouchableOpacity
                    style={styles.voteButton}
                    onPress={() => handleVote(item.name, -1)}
                  >
                    <AppText variant="voteSymbol">−</AppText>
                  </TouchableOpacity>
                  <AppText variant="voteCount">
                    {gameVotes[item.name] || 0}
                  </AppText>
                  <TouchableOpacity
                    style={styles.voteButton}
                    onPress={() => handleVote(item.name, 1)}
                  >
                    <AppText variant="voteSymbol">+</AppText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.bottomBar}>
        <AppButton
          variant="primary"
          onPress={handleSpin}
          style={styles.button.primaryCompact}
        >
          {isSingleGame ? 'Select Game' : 'Spin to Choose'}
        </AppButton>
      </View>

      <SpinnerScreen
        showSpinner={showSpinner}
        closeSpinner={() => setShowSpinner(false)}
        participants={spinnerParticipants}
        onBackToList={() => setShowSpinner(false)}
        onPlayThis={handleSpinnerComplete}
        autoNavigate={true}
      />

      <PresetNameModal
        visible={showPresetNameModal}
        onClose={() => setShowPresetNameModal(false)}
        onSave={(name) => {
          savePreset(name, filters).then(() => {
            setPresetSaved(true);
            setShowPresetNameModal(false);
          });
        }}
        checkPresetCount
      />

      <VotingModeInfoModal
        visible={showVotingModeInfoModal}
        onClose={() => setShowVotingModeInfoModal(false)}
      />
    </View>
  );
}
