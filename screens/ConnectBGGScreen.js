import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { fetchAndSaveCollection } from '../hooks/boardGameGeekApi';
import colors from '../helpers/colors';

export default function ConnectBGGScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLoad = () => {
    setErrorMessage(null);
    setLoading(true);
    fetchAndSaveCollection(username)
      .then(() => {
        setLoading(false);
        navigation.replace('MyGames');
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Couldn't find that username. Try again?");
      });
  };

  const canSubmit = username.trim().length > 0 && !loading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>Connect Your Collection</Text>
      <Text style={styles.body}>
        Enter your BoardGameGeek username to load your games.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.textSecondary}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrorMessage(null);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />

      {errorMessage ? (
        <Text style={styles.softError}>{errorMessage}</Text>
      ) : null}

      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={colors.tintMain} />
          <Text style={styles.loadingText}>Fetching your collection…</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
          onPress={handleLoad}
          disabled={!canSubmit}
        >
          <Text style={styles.primaryButtonText}>Load My Games</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.cardMain,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.textMain,
    marginBottom: 16,
  },
  softError: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
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
});
