import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import AppGradientBackground from '../components/AppGradientBackground';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

import LogoLight from '../assets/WhatShouldWePlayLogo-Light.svg';
import LogoDark from '../assets/WhatShouldWePlayLogo-Dark.svg';

export default function HomeScreen({ navigation }) {
  const { styles, tokens, theme } = useAppTheme();
  const isDark = theme.dark === true;

  const Logo = isDark ? LogoDark : LogoLight;

  return (
    <View style={styles.screen.wrapper}>
      <AppGradientBackground />

      <TouchableOpacity
        style={styles.screen.settingsIcon}
        onPress={() => navigation.navigate('Settings')}
        activeOpacity={0.7}
      >
        <Feather
          name="settings"
          size={28}
          color={tokens.colors.textSecondary}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.screen.container,
          layout.center,
          layout.paddingXl,
          { backgroundColor: 'transparent' },
        ]}
      >
        <View style={layout.center}>
          <View style={layout.marginBottomSm}>
            <Logo width={280} height={280} />
          </View>
          <AppText variant="subtitle" style={layout.marginBottom3xl}>
            {copy.home.heroDescription}
          </AppText>
          <View style={styles.homeButtonContainer}>
            <AppButton
              onPress={() => navigation.navigate('Setup')}
              variant="primary"
            >
              {copy.home.ctaChoose}
            </AppButton>
          </View>
        </View>

        <View style={styles.screen.homeFooterContainer}>
          <AppButton
            onPress={() => navigation.navigate('MyGames')}
            variant="tertiary"
          >
            {copy.home.ctaBrowse}
          </AppButton>
        </View>
      </View>
    </View>
  );
}
