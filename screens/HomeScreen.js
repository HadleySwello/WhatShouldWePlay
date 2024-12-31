import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Button,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';

import colors from '../helpers/colors';
import games from '../helpers/games';
import SpinnerScreen from './SpinnerScreen';

const HomeScreen = ({ navigation }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [complexity, setComplexity] = useState([]);
  const [setupCost, setSetupCost] = useState([]);
  const [footprint, setFootprint] = useState([]);
  const [gameLength, setGameLength] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [gameVotes, setGameVotes] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [winner, setWinner] = useState(null);

  // {"Ascension": 0, "Harry Potter Duel": 0, "Hogwarts Battle": 0, "King of Tokyo": 0, "Sparkle Kitty": 0, "Wingspan": 0}
  const participants = Object.entries(gameVotes)
    .flatMap(([game, votes]) => Array(votes).fill(game));

  console.log(participants)

  const toggleSelection = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleSubmit = () => {
    const results = games.filter((game) => {
      const matchesPlayerCount =
        playerCount >= game.playersMin && playerCount <= game.playersMax;
      const matchesComplexity =
        complexity.length > 0 ? complexity.includes(game.complexity) : true;
      const matchesSetupCost =
        setupCost.length > 0 ? setupCost.includes(game.setupCost) : true;
      const matchesFootprint =
        footprint.length > 0 ? footprint.includes(game.footprint) : true;
      const matchesLength =
        gameLength.length > 0 ? gameLength.includes(game.length) : true;

      return (
        matchesPlayerCount &&
        matchesComplexity &&
        matchesSetupCost &&
        matchesFootprint &&
        matchesLength
      );
    });
    setFilteredGames(results);

    const initialVotes = results.reduce((acc, game) => {
      acc[game.name] = 0;
      return acc;
    }, {});
    setGameVotes(initialVotes);
  };

  const resetForm = () => {
    setPlayerCount(2);
    setComplexity([]);
    setSetupCost([]);
    setFootprint([]);
    setGameLength([]);
    setFilteredGames([]);
    setGameVotes({});
  };

  const handleVote = (gameName, change) => {
    setGameVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      const newVoteCount = (updatedVotes[gameName] || 0) + change;
      updatedVotes[gameName] = Math.max(newVoteCount, 0); // Prevent negative votes
      return updatedVotes;
    });
  };

  const totalVotes = Object.values(gameVotes).reduce((sum, votes) => sum + votes, 0);

  const openSpinner = () => {
    setShowSpinner(true);
  };

  const closeSpinner = () => {
    setShowSpinner(false);
  };

  const Checkbox = ({ label, value, state, setState }) => (
    <TouchableOpacity
      onPress={() => toggleSelection(value, state, setState)}
      style={[
        styles.checkboxContainer,
        state.includes(value) && styles.checkboxSelected,
      ]}
    >
      <Text style={styles.checkboxText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Find Your Perfect Game</Text>
      <Text style={styles.value}>Selected: {playerCount} Players</Text>

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

      <Text style={styles.label}>Complexity</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox
          label="Low"
          value="low"
          state={complexity}
          setState={setComplexity}
        />
        <Checkbox
          label="Medium"
          value="medium"
          state={complexity}
          setState={setComplexity}
        />
        <Checkbox
          label="High"
          value="high"
          state={complexity}
          setState={setComplexity}
        />
      </View>

      <Text style={styles.label}>Setup Cost</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox
          label="Low"
          value="low"
          state={setupCost}
          setState={setSetupCost}
        />
        <Checkbox
          label="Medium"
          value="medium"
          state={setupCost}
          setState={setSetupCost}
        />
        <Checkbox
          label="High"
          value="high"
          state={setupCost}
          setState={setSetupCost}
        />
      </View>

      <Text style={styles.label}>Game Footprint Size</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox
          label="Small"
          value="small"
          state={footprint}
          setState={setFootprint}
        />
        <Checkbox
          label="Medium"
          value="medium"
          state={footprint}
          setState={setFootprint}
        />
        <Checkbox
          label="Large"
          value="large"
          state={footprint}
          setState={setFootprint}
        />
      </View>

      <Text style={styles.label}>Game Length</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox
          label="Under 30 Minutes"
          value="under 30 min"
          state={gameLength}
          setState={setGameLength}
        />
        <Checkbox
          label="Under 1 Hour"
          value="under 1 hour"
          state={gameLength}
          setState={setGameLength}
        />
        <Checkbox
          label="Under 2 Hours"
          value="under 2 hours"
          state={gameLength}
          setState={setGameLength}
        />
        <Checkbox
          label="Long"
          value="long"
          state={gameLength}
          setState={setGameLength}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} color={colors.tintMain} />
      <Button title="Reset" onPress={resetForm} color={colors.tintSecondary} />

      {filteredGames.map((game) => (
        <View key={game.name} style={styles.gameItem}>
          <Text style={styles.gameText}>{game.name}</Text>
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
              style={[
                styles.voteButton,
                totalVotes < playerCount ? null : styles.voteButtonDisabled,
              ]}
              disabled={totalVotes >= playerCount}
            >
              <Text
                style={[
                  styles.voteText,
                  totalVotes >= playerCount ? styles.voteTextDisabled : null,
                ]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {totalVotes === playerCount && (
        <Button
          title="Spin the Spinner!"
          onPress={openSpinner}
          color={colors.tintMain}
        />
      )}

      <SpinnerScreen 
        showSpinner={showSpinner} 
        closeSpinner={closeSpinner} 
        winner={winner} 
        participants={participants} 
      />
    </ScrollView>
  );
};

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
    backgroundColor: colors.tintMain,
  },
  checkboxText: {
    color: colors.textMain,
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
});

export default HomeScreen;
