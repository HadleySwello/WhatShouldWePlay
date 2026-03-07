import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import AppText from '../components/AppText';
import PlayerCountStepper from '../components/PlayerCountStepper';
import {
  getDefaultPlayerCount,
  setDefaultPlayerCount,
  DEFAULT_PLAYER_COUNT,
} from '../helpers/defaultPlayerCountStorage';
import {
  getVotingModeEnabled,
  setVotingModeEnabled,
} from '../helpers/votingModeStorage';
import { useThemeMode } from '../theme/ThemeModeContext';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const THEME_VALUES = ['light', 'dark', 'system'];

export default function SettingsScreen({ navigation }) {
  const { styles, tokens, theme } = useAppTheme();
  const { themeMode, setThemeMode } = useThemeMode();
  const [defaultPlayerCount, setDefaultPlayerCountState] =
    useState(DEFAULT_PLAYER_COUNT);
  const [votingModeEnabled, setVotingModeEnabledState] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getDefaultPlayerCount().then(setDefaultPlayerCountState);
      getVotingModeEnabled().then(setVotingModeEnabledState);
    }, [])
  );

  const themeSelectedIndex = THEME_VALUES.indexOf(themeMode);
  const handleThemeChange = useCallback(
    (event) => {
      const index = event.nativeEvent.selectedSegmentIndex;
      if (index >= 0 && index < THEME_VALUES.length) {
        setThemeMode(THEME_VALUES[index]);
      }
    },
    [setThemeMode]
  );

  const handleDefaultPlayerCountChange = useCallback((value) => {
    setDefaultPlayerCount(value).then(setDefaultPlayerCountState);
  }, []);

  const isSinglePlayer = defaultPlayerCount === 1;
  const handleVotingModeChange = useCallback((value) => {
    setVotingModeEnabled(value).then(setVotingModeEnabledState);
  }, []);
  const handleVotingModeRowPress = useCallback(() => {
    if (isSinglePlayer) {
      Alert.alert(
        copy.alerts.votingModeSinglePlayerTitle,
        copy.alerts.votingModeSinglePlayerMessage
      );
    }
  }, [isSinglePlayer]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      copy.alerts.deleteAccountTitle,
      copy.alerts.deleteAccountMessage,
      [
        { text: copy.alerts.deleteAccountCancel, style: 'cancel' },
        {
          text: copy.alerts.deleteAccountConfirm,
          style: 'destructive',
          onPress: () => {
            AsyncStorage.clear().then(() => {
              navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
            });
          },
        },
      ]
    );
  }, [navigation]);

  return (
    <ScrollView
      style={styles.screen.container}
      contentContainerStyle={layout.paddingXl}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[styles.card.default, styles.card.body, layout.marginBottomLg]}
      >
        <AppText variant="sectionTitle" style={layout.marginBottomSm}>
          {copy.settings.appearance}
        </AppText>
        <AppText variant="helper" style={layout.marginBottomLg}>
          {copy.settings.appearanceDescription}
        </AppText>
        <SegmentedControl
          values={[
            copy.settings.themeLight,
            copy.settings.themeDark,
            copy.settings.themeSystem,
          ]}
          selectedIndex={themeSelectedIndex >= 0 ? themeSelectedIndex : 2}
          onChange={handleThemeChange}
          appearance={theme.dark ? 'dark' : 'light'}
          backgroundColor={tokens.colors.backgroundMain}
          fontStyle={{ color: tokens.colors.textSecondary }}
          activeFontStyle={{ color: tokens.colors.onTintSecondary }}
          tintColor={tokens.colors.tintSecondary}
        />
      </View>

      <View
        style={[styles.card.default, styles.card.body, layout.marginBottomLg]}
      >
        <AppText variant="sectionTitle" style={layout.marginBottomSm}>
          {copy.settings.theRitual}
        </AppText>
        <AppText variant="helper" style={layout.marginBottomLg}>
          {copy.settings.defaultPlayerCountDescription}
        </AppText>
        <View style={layout.marginBottomLg}>
          <PlayerCountStepper
            value={defaultPlayerCount}
            onValueChange={handleDefaultPlayerCountChange}
          />
        </View>

        <TouchableOpacity
          onPress={isSinglePlayer ? handleVotingModeRowPress : undefined}
          activeOpacity={isSinglePlayer ? 0.7 : 1}
        >
          <View style={styles.votingModeRowInner}>
            <View style={styles.settingsRowInfo}>
              <AppText variant="body" style={styles.settingsRowTitle}>
                {copy.settings.enableVotingMode}
              </AppText>
              <AppText variant="helper" style={styles.settingsRowDesc}>
                {copy.settings.enableVotingModeDescription}
              </AppText>
            </View>
            <View pointerEvents={isSinglePlayer ? 'none' : 'auto'}>
              <Switch
                value={isSinglePlayer ? false : votingModeEnabled}
                onValueChange={handleVotingModeChange}
                disabled={isSinglePlayer}
                trackColor={{
                  false: tokens.colors.cardMain,
                  true: tokens.colors.tintMain,
                }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={[styles.card.default, styles.card.body, layout.marginBottomLg]}
      >
        <AppText variant="sectionTitle" style={layout.marginBottomLg}>
          {copy.settings.account}
        </AppText>
        <AppButton
          variant="primary"
          onPress={() => navigation.navigate('ConnectBGG')}
        >
          {copy.settings.changeUsername}
        </AppButton>
        <AppButton variant="tertiary" onPress={handleDeleteAccount}>
          {copy.settings.deleteMyAccount}
        </AppButton>
      </View>
    </ScrollView>
  );
}
