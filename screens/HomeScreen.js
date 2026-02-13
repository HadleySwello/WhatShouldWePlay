import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../helpers/colors';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Should We Play?</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Wizard')}
      >
        <Text style={styles.primaryButtonText}>Let's Choose</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('MyGames')}
      >
        <Text style={styles.primaryButtonText}>My Games</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('ConnectBGG')}
      >
        <Text style={styles.linkText}>Change Username</Text>
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
    fontSize: 26,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 48,
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 32,
  },
  linkText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
