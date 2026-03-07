import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { fetchAndSaveCollection } from '../hooks/boardGameGeekApi';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function ConnectBGGScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { tokens, styles } = useAppTheme();

  const handleLoad = () => {
    setErrorMessage(null);
    setLoading(true);
    fetchAndSaveCollection(username)
      .then(() => {
        setLoading(false);
        navigation.replace('Home');
      })
      .catch((err) => {
        setLoading(false);
        const msg = err?.message || '';
        setErrorMessage(msg || copy.connectBGG.error);
      });
  };

  const canSubmit = username.trim().length > 0 && !loading;

  return (
    <KeyboardAvoidingView
      style={[styles.screen.container, layout.paddingXl, layout.center]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <AppText variant="header" style={layout.marginBottomLg}>
        {copy.connectBGG.header}
      </AppText>
      <AppText variant="body" style={layout.marginBottomXl}>
        {copy.connectBGG.body}
      </AppText>

      <AppInput
        placeholder={copy.connectBGG.placeholder}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrorMessage(null);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
        style={layout.marginBottomLg}
      />

      {errorMessage ? (
        <AppText variant="error" style={layout.marginBottomLg}>
          {errorMessage}
        </AppText>
      ) : null}

      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={tokens.colors.tintMain} />
          <AppText variant="helper">{copy.connectBGG.loading}</AppText>
        </View>
      ) : (
        <AppButton
          variant="primary"
          onPress={handleLoad}
          disabled={!canSubmit}
          style={[
            styles.button.primaryCompact,
            !canSubmit && styles.button.disabled,
          ]}
        >
          {copy.connectBGG.cta}
        </AppButton>
      )}
    </KeyboardAvoidingView>
  );
}
