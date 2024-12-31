import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';
import colors from '../helpers/colors';

const RankingsScreen = () => {
  const { games, error, isLoading, reload } = useBoardGameGeekCollection();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.tintMain} size="large" />
        <Text style={styles.loading}>Loading your collection...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Owned Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.gameItem}>
            <Text style={styles.gameName}>{item.name}</Text>
            <Text style={styles.gameDetails}>
              Players: {item.playersMin}-{item.playersMax} | Length: {item.length}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default RankingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: 16,
    alignItems: 'center',
  },
  loading: {
    marginTop: 10,
    color: colors.textSecondary,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  title: {
    fontSize: 24,
    color: colors.textMain,
    marginBottom: 16,
  },
  gameItem: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
  },
  gameName: {
    fontSize: 18,
    color: colors.textMain,
  },
  gameDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
