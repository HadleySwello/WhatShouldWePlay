import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import AppText from '../components/AppText';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import AppFAQModal from '../components/AppFAQModal';
import PoweredByBGG from '../components/PoweredByBGG';
import copy from '../constants/copy';
import { fetchAndSaveCollection } from '../hooks/boardGameGeekApi';
import { useAppTheme, layout } from '../theme';

export default function ConnectBGGScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const { tokens, styles } = useAppTheme();

  const handleLoad = () => {
    if (!username.trim()) {
      setErrorMessage(copy.connectBGG.usernameRequired);
      return;
    }
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
    <View style={styles.screen.wrapper}>
      <KeyboardAvoidingView
        style={[styles.connectBgg.container]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AppText variant="header" style={styles.connectBgg.header}>
          {copy.connectBGG.header}
        </AppText>
        <AppText variant="body" style={styles.connectBgg.body}>
          {copy.connectBGG.body}
        </AppText>

        <View style={styles.connectBgg.inputContainer}>
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
          />
        </View>

        {errorMessage ? (
          <AppText variant="error" style={layout.marginBottomLg}>
            {errorMessage}
          </AppText>
        ) : null}

        <AppFAQModal
          visible={showHelp}
          onClose={() => setShowHelp(false)}
          onSelectDemo={(name) => {
            setUsername(name);
            setShowHelp(false);
          }}
        />

        {loading ? (
          <View style={layout.rowCenter}>
            <ActivityIndicator
              size="small"
              color={tokens.colors.tintMain}
              style={layout.marginRightMd}
            />
            <AppText variant="helper">{copy.connectBGG.loading}</AppText>
          </View>
        ) : (
          <AppButton
            variant="primary"
            onPress={handleLoad}
            disabled={!canSubmit}
            style={layout.stretch}
          >
            {copy.connectBGG.cta}
          </AppButton>
        )}

        {!loading && (
          <TouchableOpacity
            style={styles.connectBgg.helpButton}
            onPress={() => setShowHelp(true)}
          >
            <Feather
              name="help-circle"
              size={16}
              color={tokens.colors.tintMain}
            />
            <AppText style={styles.connectBgg.helpText}>
              {copy.connectBGG.help}
            </AppText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.connectBgg.loginLinkSection}
          onPress={() => Linking.openURL(copy.connectBGG.bggLoginUrl)}
          activeOpacity={0.7}
        >
          <PoweredByBGG
            style={styles.connectBgg.bggLoginLogo}
            pressable={false}
          />
          <AppText variant="helper" style={styles.connectBgg.bggLoginHelper}>
            {copy.connectBGG.findAccount}
          </AppText>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
