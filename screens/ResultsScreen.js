import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SpinnerScreen from './SpinnerScreen';
import colors from '../helpers/colors';

function initialVotes(games) {
  return (games || []).reduce((acc, game) => {
    acc[game.name] = 0;
    return acc;
  }, {});
}

export default function ResultsScreen({ route, navigation }) {
  const { filteredGames = [], playerCount = 2 } = route.params || {};
  const [showSpinner, setShowSpinner] = useState(false);
  const [gameVotes, setGameVotes] = useState(() => initialVotes(filteredGames));

  const gameKey = filteredGames.map((g) => g.id).join(',');
  useEffect(() => {
    setGameVotes(initialVotes(filteredGames));
  }, [gameKey]);

  const totalVotes = Object.values(gameVotes).reduce((sum, n) => sum + n, 0);
  const participants = Object.entries(gameVotes).flatMap(([gameName, votes]) =>
    Array(votes).fill(gameName)
  );
  const canSpin = filteredGames.length > 0 && totalVotes === playerCount;
  const isSingleGame = filteredGames.length === 1;

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

  const handleSpinPress = () => {
    if (!canSpin) return;
    setShowSpinner(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listSection}>
        <Text style={styles.voteHint}>
          One vote per player ({totalVotes} of {playerCount} assigned)
        </Text>
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
              <View style={styles.voteRow}>
                <TouchableOpacity
                  style={styles.voteButton}
                  onPress={() => handleVote(item.name, -1)}
                >
                  <Text style={styles.voteSymbol}>−</Text>
                </TouchableOpacity>
                <Text style={styles.voteCount}>{gameVotes[item.name] || 0}</Text>
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

      {filteredGames.length > 0 && (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.primaryButton, !canSpin && styles.primaryButtonDisabled]}
            onPress={handleSpinPress}
            disabled={!canSpin}
          >
            <Text style={styles.primaryButtonText}>
              {isSingleGame ? 'Select Game' : 'Spin to Choose'}
            </Text>
          </TouchableOpacity>
          <View style={styles.helperRow}>
            {!canSpin ? (
              <Text style={styles.helperText}>
                Assign all {playerCount} votes to enable the spinner.
              </Text>
            ) : null}
          </View>
        </View>
      )}

      <SpinnerScreen
        showSpinner={showSpinner}
        closeSpinner={() => setShowSpinner(false)}
        participants={participants}
        onBackToList={() => setShowSpinner(false)}
        onPlayThis={(winnerName) => {
          setShowSpinner(false);
          const game = filteredGames.find((g) => g.name === winnerName);
          navigation.navigate('SelectedGame', { game: game ?? null });
        }}
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
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  helperRow: {
    minHeight: 32,
    justifyContent: 'center',
  },
  helperText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});
