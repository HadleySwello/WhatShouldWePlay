import React from 'react';
import { View } from 'react-native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function HomeScreen({ navigation }) {
  const { styles } = useAppTheme();

  return (
    <View style={[styles.screen.container, layout.fill, layout.center, layout.paddingXl]}>
      <AppText variant="title" style={layout.marginBottom3xl}>
        Start Picking
      </AppText>

      <AppButton onPress={() => navigation.navigate('Setup')} variant="primary">
        Choose A Game
      </AppButton>

      <AppButton onPress={() => navigation.navigate('MyGames')} variant="primary">
        Browse Collection
      </AppButton>

      <AppButton onPress={() => navigation.navigate('Settings')} variant="primary">
        Settings
      </AppButton>
    </View>
  );
}
