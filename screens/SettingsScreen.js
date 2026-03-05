import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PlayerCountStepper from '../components/PlayerCountStepper';
import {
  getDefaultPlayerCount,
  setDefaultPlayerCount,
  DEFAULT_PLAYER_COUNT,
} from '../helpers/defaultPlayerCountStorage';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function SettingsScreen({ navigation }) {
  const { styles } = useAppTheme();
  const [defaultPlayerCount, setDefaultPlayerCountState] = useState(
    DEFAULT_PLAYER_COUNT
  );

  useFocusEffect(
    useCallback(() => {
      getDefaultPlayerCount().then(setDefaultPlayerCountState);
    }, [])
  );

  const handleDefaultPlayerCountChange = useCallback((value) => {
    setDefaultPlayerCount(value).then(setDefaultPlayerCountState);
  }, []);

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
      <AppButton
        variant="primary"
        onPress={() => navigation.navigate('ConnectBGG')}
      >
        Change Username
      </AppButton>
    </ScrollView>
  );
}
