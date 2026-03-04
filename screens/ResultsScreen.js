import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import SpinnerScreen from './SpinnerScreen';
import { savePreset } from '../helpers/presetsStorage';
import { getVotes, setVotes } from '../helpers/voteCache';
import colors from '../helpers/colors';

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

  const [showSpinner, setShowSpinner] = useState(false);
  const [showPresetInput, setShowPresetInput] = useState(false);
  const [presetName, setPresetName] = useState('');
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
    totalVotes > 0 && weightedParticipants.length > 0
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

  const listHeader = (
    <View>
      <Text style={styles.voteHint}>
        {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'}{' '}
        match
      </Text>
      {filteredGames.length > 0 && (
        <Text style={styles.voteHint}>
          One vote per player ({totalVotes} of {playerCount} assigned)
        </Text>
      )}
      {allVotesAssigned && (
        <Text style={styles.allVotesAssigned}>All votes assigned.</Text>
      )}
      {canSavePreset &&
        (presetSaved ? (
          <Text style={styles.presetSavedText}>Preset saved!</Text>
        ) : showPresetInput ? (
          <View style={styles.presetInputRow}>
            <TextInput
              style={styles.presetInput}
              placeholder="Preset name"
              placeholderTextColor={colors.textSecondary}
              value={presetName}
              onChangeText={setPresetName}
              autoCapitalize="words"
            />
            <TouchableOpacity
              style={styles.presetSaveButton}
              onPress={() => {
                const name = presetName.trim() || 'My Preset';
                savePreset(name, filters).then(() => {
                  setPresetSaved(true);
                  setShowPresetInput(false);
                  setPresetName('');
                });
              }}
            >
              <Text style={styles.presetSaveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.presetCancelButton}
              onPress={() => {
                setShowPresetInput(false);
                setPresetName('');
              }}
            >
              <Text style={styles.presetCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.savePresetButton}
            onPress={() => setShowPresetInput(true)}
          >
            <Text style={styles.savePresetButtonText}>Save as preset</Text>
          </TouchableOpacity>
        ))}
    </View>
  );

  if (filteredGames.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No matches</Text>
          <Text style={styles.emptyBody}>Try adjusting your filters.</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.primaryButtonText}>Back to Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
                  style={styles.thumbnail}
                />
              ) : (
                <View style={[styles.thumbnail, styles.thumbnailPlaceholder]} />
              )}
              <View style={styles.gameInfo}>
                <Text style={styles.gameName}>{item.name}</Text>
                <Text style={styles.gameDetails}>
                  {item.playersMin}-{item.playersMax} players · {item.length} ·
                  {item.complexityWeight != null
                    ? ` ${item.complexityWeight.toFixed(1)}`
                    : ` ${item.complexity}`}
                </Text>
              </View>
              <View style={styles.voteRow}>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => handleVote(item.name, -1)}
                >
                  <Text style={styles.voteSymbol}>−</Text>
                </TouchableOpacity>
                <Text style={styles.voteCount}>
                  {gameVotes[item.name] || 0}
                </Text>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => handleVote(item.name, 1)}
                >
                  <Text style={styles.voteSymbol}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSpin}>
          <Text style={styles.primaryButtonText}>
            {isSingleGame ? 'Select Game' : 'Spin to Choose'}
          </Text>
        </TouchableOpacity>
      </View>

      <SpinnerScreen
        showSpinner={showSpinner}
        closeSpinner={() => setShowSpinner(false)}
        participants={spinnerParticipants}
        onBackToList={() => setShowSpinner(false)}
        onPlayThis={handleSpinnerComplete}
        autoNavigate={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  listSection: {
    flex: 1,
  },
  voteHint: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  allVotesAssigned: {
    fontSize: 14,
    color: colors.tintMain,
    textAlign: 'center',
    paddingBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    color: colors.textMain,
    marginBottom: 12,
  },
  emptyBody: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12,
  },
  thumbnailPlaceholder: {
    backgroundColor: colors.cardMain,
  },
  gameInfo: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    color: colors.textMain,
  },
  gameDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  voteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  voteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardMain,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voteSymbol: {
    fontSize: 22,
    color: colors.textMain,
  },
  voteCount: {
    fontSize: 18,
    color: colors.textMain,
    minWidth: 28,
    textAlign: 'center',
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 20,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  presetSavedText: {
    fontSize: 15,
    color: colors.tintMain,
    marginTop: 12,
    marginBottom: 8,
  },
  presetInputRow: {
    marginTop: 12,
    marginBottom: 16,
  },
  presetInput: {
    backgroundColor: colors.cardMain,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.textMain,
    marginBottom: 12,
  },
  presetSaveButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  presetSaveButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  presetCancelButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  presetCancelText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  savePresetButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    marginTop: 8,
  },
  savePresetButtonText: {
    fontSize: 16,
    color: colors.tintMain,
  },
});
