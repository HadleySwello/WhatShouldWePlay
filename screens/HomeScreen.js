import React from 'react';
import { View } from 'react-native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function HomeScreen({ navigation }) {
  const { styles } = useAppTheme();

  return (
    <View
      style={[
        styles.screen.container,
        layout.fill,
        layout.center,
        layout.paddingXl,
      ]}
    >
      <AppText variant="title" style={layout.marginBottom3xl}>
        {copy.home.title}
      </AppText>

      <AppButton onPress={() => navigation.navigate('Setup')} variant="primary">
        {copy.home.ctaChoose}
      </AppButton>

      <AppButton
        onPress={() => navigation.navigate('MyGames')}
        variant="primary"
      >
        {copy.home.ctaBrowse}
      </AppButton>

      <AppButton
        onPress={() => navigation.navigate('Settings')}
        variant="primary"
      >
        {copy.home.ctaSettings}
      </AppButton>
    </View>
  );
}
