import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';
import colors from '../helpers/colors';

export default function RankingsScreen({ navigation }) {
  const { games, error, isLoading, reload } = useBoardGameGeekCollection();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => reload()}
          style={styles.refreshButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <FontAwesome5 name="sync-alt" size={20} color={colors.tintMain} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, reload]);

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
        <Text style={styles.softError}>Couldn't load your collection. Try again?</Text>
        <TouchableOpacity style={styles.retryButton} onPress={reload}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
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
                {item.yearPublished} · Rating: {item.rating || '—'}
              </Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Wizard')}
      >
        <Text style={styles.primaryButtonText}>Choose a Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loading: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 16,
  },
  softError: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'center',
  },
  retryButtonText: {
    color: colors.tintMain,
    fontSize: 16,
  },
  refreshButton: {
    padding: 8,
    marginRight: 8,
  },
  gameItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
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
    marginTop: 2,
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
});
