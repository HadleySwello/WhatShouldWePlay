import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../helpers/colors';

export default function CollectionImportedScreen({ route, navigation }) {
  const gameCount = route.params?.gameCount ?? 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collection Imported</Text>
      <Text style={styles.body}>
        {gameCount} {gameCount === 1 ? 'game' : 'games'} added to your collection.
      </Text>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.replace('Home')}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>Start Picking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 20,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
});
