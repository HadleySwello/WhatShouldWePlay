import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppButton from '../components/AppButton';
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
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function SettingsScreen({ navigation }) {
  const { styles, tokens } = useAppTheme();
  const [defaultPlayerCount, setDefaultPlayerCountState] =
    useState(DEFAULT_PLAYER_COUNT);
  const [votingModeEnabled, setVotingModeEnabledState] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getDefaultPlayerCount().then(setDefaultPlayerCountState);
      getVotingModeEnabled().then(setVotingModeEnabledState);
    }, [])
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
        'Voting Mode',
        'Voting mode is not available for single-player games.'
      );
    }
  }, [isSinglePlayer]);

  return (
    <ScrollView
      style={styles.screen.container}
      contentContainerStyle={layout.paddingXl}
      showsVerticalScrollIndicator={false}
    >
      <AppText variant="sectionTitle">Default player count</AppText>
      <PlayerCountStepper
        value={defaultPlayerCount}
        onValueChange={handleDefaultPlayerCountChange}
      />
      <AppText variant="sectionTitle" style={styles.settingsSectionTitle}>
        Enable Voting Mode
      </AppText>
      <TouchableOpacity
        onPress={isSinglePlayer ? handleVotingModeRowPress : undefined}
        activeOpacity={isSinglePlayer ? 0.7 : 1}
      >
        <View style={styles.votingModeSettingsRow}>
          <AppText variant="body">Enable Voting Mode</AppText>
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
      </TouchableOpacity>
      <AppButton
        variant="primary"
        onPress={() => navigation.navigate('ConnectBGG')}
      >
        Change Username
      </AppButton>
    </ScrollView>
  );
}
