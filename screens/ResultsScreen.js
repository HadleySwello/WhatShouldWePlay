import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SpinnerScreen from './SpinnerScreen';
import { savePreset } from '../helpers/presetsStorage';
import colors from '../helpers/colors';

function initialVotes(games) {
  return (games || []).reduce((acc, game) => {
    acc[game.name] = 0;
    return acc;
  }, {});
}

function equalWeightParticipants(filteredGames) {
  return (filteredGames || []).map((g) => g.name);
}

export default function ResultsScreen({ route, navigation }) {
  const { filteredGames = [], playerCount = 2, filters } = route.params || {};
  const [showSpinner, setShowSpinner] = useState(false);
  const [voteMode, setVoteMode] = useState(false);
  const [showPresetInput, setShowPresetInput] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetSaved, setPresetSaved] = useState(false);
  const [gameVotes, setGameVotes] = useState(() => initialVotes(filteredGames));

  const gameKey = filteredGames.map((g) => g.id).join(',');
  useEffect(() => {
    setGameVotes(initialVotes(filteredGames));
  }, [gameKey]);

  const totalVotes = Object.values(gameVotes).reduce((sum, n) => sum + n, 0);
  const weightedParticipants = Object.entries(gameVotes).flatMap(
    ([gameName, votes]) => Array(votes).fill(gameName)
  );
  const canSpin = filteredGames.length > 0 && totalVotes === playerCount;
  const isSingleGame = filteredGames.length === 1;

  const [spinnerMode, setSpinnerMode] = useState('quick');

  const handleQuickSpin = () => {
    if (filteredGames.length === 0) return;
    setSpinnerMode('quick');
    setShowSpinner(true);
  };

  const handleVoteSpin = () => {
    if (!canSpin) return;
    setSpinnerMode('vote');
    setShowSpinner(true);
  };

  const spinnerParticipants =
    spinnerMode === 'quick'
      ? equalWeightParticipants(filteredGames)
      : weightedParticipants;

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

  const listHeader = (
    <View>
      {voteMode ? (
        <Text style={styles.voteHint}>
          One vote per player ({totalVotes} of {playerCount} assigned)
        </Text>
      ) : (
        <Text style={styles.voteHint}>
          {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} match
        </Text>
      )}
      {canSavePreset && (
        presetSaved ? (
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
        )
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listSection}>
        {listHeader}
        <FlatList
          data={filteredGames}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No games match your criteria.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.gameItem}>
              <View style={styles.gameInfo}>
                <Text style={styles.gameName}>{item.name}</Text>
                <Text style={styles.gameDetails}>
                  {item.playersMin}-{item.playersMax} players · {item.length} ·
                  {item.complexityWeight != null
                    ? ` ${item.complexityWeight.toFixed(1)}`
                    : ` ${item.complexity}`}
                </Text>
              </View>
              {voteMode && (
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
              )}
            </View>
          )}
        />
      </View>

      {filteredGames.length > 0 && (
        <View style={styles.bottomBar}>
          {!voteMode ? (
            <>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleQuickSpin}
              >
                <Text style={styles.primaryButtonText}>
                  Quick Spin
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setVoteMode(true)}
              >
                <Text style={styles.secondaryButtonText}>Vote First</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  !canSpin && styles.primaryButtonDisabled,
                ]}
                onPress={handleVoteSpin}
                disabled={!canSpin}
              >
                <Text style={styles.primaryButtonText}>
                  {isSingleGame ? 'Select Game' : 'Spin to Choose'}
                </Text>
              </TouchableOpacity>
              {!canSpin && (
                <Text style={styles.helperText}>
                  Assign all {playerCount} votes to enable the spinner.
                </Text>
              )}
              <TouchableOpacity
                style={styles.textButton}
                onPress={() => setVoteMode(false)}
              >
                <Text style={styles.textButtonText}>Back to Quick Spin</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}

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
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
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
    marginBottom: 12,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 20,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.cardSecondary,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 18,
    color: colors.textMain,
  },
  helperText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
  textButton: {
    alignItems: 'center',
    marginTop: 12,
  },
  textButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
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
