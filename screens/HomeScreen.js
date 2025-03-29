import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Button,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import colors from '../helpers/colors';
import SpinnerScreen from './SpinnerScreen';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';

const HomeScreen = ({ navigation }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [complexity, setComplexity] = useState([]);
  const [gameLength, setGameLength] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]); 
  const [gameVotes, setGameVotes] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [winner, setWinner] = useState(null);

  // 1) Pull your BGG games from the custom hook
  const { games, isLoading, error } = useBoardGameGeekCollection();
  // For debugging, show one example
  console.log('Example game object:', games[0]);

  // 2) Build the participants array for the spinner
  const participants = Object.entries(gameVotes)
    .flatMap(([gameName, votes]) => Array(votes).fill(gameName));

  // 3) Toggle checkboxes for complexity or gameLength
  const toggleSelection = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  // 4) Filter logic
  const handleSubmit = () => {
    // Filter the BGG "games" array (already shaped from your hook)
    const results = games.filter((game) => {
      const matchesPlayerCount =
        playerCount >= game.playersMin && playerCount <= game.playersMax;

      const matchesComplexity =
        complexity.length > 0 ? complexity.includes(game.complexity) : true;

      const matchesLength =
        gameLength.length > 0 ? gameLength.includes(game.length) : true;

      return (
        matchesPlayerCount &&
        matchesComplexity &&
        matchesLength
      );
    });

    setFilteredGames(results);

    // 5) Initialize votes for just the filtered set
    const initialVotes = results.reduce((acc, game) => {
      acc[game.name] = 0;
      return acc;
    }, {});
    setGameVotes(initialVotes);
  };

  // 6) Reset entire filter state + gameVotes
  const resetForm = () => {
    setPlayerCount(2);
    setComplexity([]);
    setGameLength([]);
    setFilteredGames([]);
    setGameVotes({});
  };

  const handleVote = (gameName, change) => {
    setGameVotes((prevVotes) => {
      const updated = { ...prevVotes };
      const totalVotes = Object.values(updated).reduce((sum, v) => sum + v, 0);
  
      const currentGameVotes = updated[gameName] || 0;
      const newGameVotes = currentGameVotes + change;
  
      const newTotalVotes = totalVotes - currentGameVotes + newGameVotes;
  
      // If adding a vote would exceed the player count, skip it
      if (change > 0 && newTotalVotes > playerCount) {
        return updated; // no changes
      }
  
      // Otherwise, allow the vote, but never go below 0
      updated[gameName] = Math.max(newGameVotes, 0);
      return updated;
    });
  };
  

  // 8) Tally the total votes
  const totalVotes = Object.values(gameVotes).reduce((sum, votes) => sum + votes, 0);

  // 9) Spinner logic
  const openSpinner = () => setShowSpinner(true);
  const closeSpinner = () => setShowSpinner(false);

  // 10) Loading / Error states for BGG data
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.tintMain} />
        <Text style={styles.infoText}>Loading your collection...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  // 11) Return the main UI
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Options</Text>

      {/* Player Count Checkboxes */}
      <Text style={styles.label}>Number of Players</Text>
      <View style={styles.checkboxGroup}>
        {[...Array(10)].map((_, i) => (
          <TouchableOpacity
            key={i + 1}
            onPress={() => setPlayerCount(i + 1)}
            style={[
              styles.checkboxContainer,
              playerCount === i + 1 && styles.checkboxSelected,
            ]}
          >
            <Text style={styles.checkboxText}>{i + 1} Players</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Complexity Checkboxes */}
      <Text style={styles.label}>Complexity</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox label="Low" value="low" state={complexity} setState={setComplexity} />
        <Checkbox label="Medium" value="medium" state={complexity} setState={setComplexity} />
        <Checkbox label="High" value="high" state={complexity} setState={setComplexity} />
      </View>

      {/* Game Length Checkboxes */}
      <Text style={styles.label}>Game Length</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox label="Under 30 Minutes" value="under 30 min" state={gameLength} setState={setGameLength} />
        <Checkbox label="Under 1 Hour" value="under 1 hour" state={gameLength} setState={setGameLength} />
        <Checkbox label="Under 2 Hours" value="under 2 hours" state={gameLength} setState={setGameLength} />
        <Checkbox label="Long" value="long" state={gameLength} setState={setGameLength} />
      </View>

      <Button title="Submit" onPress={handleSubmit} color={colors.tintMain} />
      <Button title="Reset" onPress={resetForm} color={colors.textSecondary} />

      {/* Display Filtered Games with Voting */}
      <Text style={styles.title}>Game List</Text>
      {filteredGames.map((game) => (
        <View key={game.id} style={styles.gameItem}>
          <Text style={styles.gameText}>{game.name}</Text>
          <Text style={styles.gameDetails}>
            {game.playersMin}-{game.playersMax} players | {game.length} | Complexity: {game.complexity}
          </Text>

          {/* Voting UI */}
          <View style={styles.voteContainer}>
            <TouchableOpacity
              onPress={() => handleVote(game.name, -1)}
              style={styles.voteButton}
            >
              <Text style={styles.voteText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.voteCount}>{gameVotes[game.name] || 0}</Text>
            <TouchableOpacity
              onPress={() => handleVote(game.name, 1)}
              style={styles.voteButton}
            >
              <Text style={styles.voteText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Condition to show Spin button if votes match playerCount */}
      {totalVotes === playerCount && filteredGames.length > 0 && (
        <Button
          title="Spin the Spinner!"
          onPress={openSpinner}
          color={colors.tintMain}
        />
      )}

      {/* Popup Spinner Screen */}
      <SpinnerScreen 
        showSpinner={showSpinner} 
        closeSpinner={closeSpinner} 
        winner={winner} 
        participants={participants} 
      />
    </ScrollView>
  );
};

/** Reusable checkbox component */
const Checkbox = ({ label, value, state, setState }) => (
  <TouchableOpacity
    onPress={() => {
      if (state.includes(value)) {
        setState(state.filter((item) => item !== value));
      } else {
        setState([...state, value]);
      }
    }}
    style={[
      styles.checkboxContainer,
      state.includes(value) && styles.checkboxSelected,
    ]}
  >
    <Text style={styles.checkboxText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.backgroundMain,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.textMain,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.textMain,
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  checkboxContainer: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.cardMain,
    margin: 5,
  },
  checkboxSelected: {
    backgroundColor: colors.tintSecondary,
  },
  checkboxText: {
    color: colors.textSpecial,
  },
  gameItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.cardSecondary,
    width: '100%',
    alignItems: 'center',
  },
  gameText: {
    color: colors.textMain,
    fontSize: 18,
  },
  gameDetails: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  voteButton: {
    padding: 10,
    backgroundColor: colors.tintSecondary,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  voteText: {
    color: colors.textMain,
    fontSize: 18,
  },
  voteCount: {
    color: colors.textMain,
    fontSize: 18,
  },
  infoText: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
