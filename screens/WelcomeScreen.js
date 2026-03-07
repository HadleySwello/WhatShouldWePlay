import React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import AppGradientBackground from '../components/AppGradientBackground';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

import LogoLight from '../assets/WhatShouldWePlayLogo-Light.svg';
import LogoDark from '../assets/WhatShouldWePlayLogo-Dark.svg';

const BGG_URL = 'https://boardgamegeek.com';

export default function WelcomeScreen({ navigation }) {
  const { styles, theme } = useAppTheme();
  const isDark = theme.dark === true;
  const Logo = isDark ? LogoDark : LogoLight;

  return (
    <View style={styles.screen.wrapper}>
      <AppGradientBackground />
      <View
        style={[
          styles.screen.container,
          layout.paddingXl,
          layout.center,
          { backgroundColor: 'transparent' },
        ]}
      >
        <View style={layout.center}>
          <View style={styles.welcome.logoContainer}>
            <Logo width={280} height={280} />
          </View>
          <AppText variant="subtitle" style={styles.welcome.subtitle}>
            {copy.welcome.subtitle}
          </AppText>
          <View style={styles.buttonRow}>
            <AppButton
              variant="primary"
              onPress={() => navigation.navigate('ConnectBGG')}
            >
              {copy.welcome.cta}
            </AppButton>
          </View>
        </View>
        <TouchableOpacity
          style={styles.footer}
          onPress={() => Linking.openURL(BGG_URL)}
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/powered-by-bgg.jpg')}
            style={styles.bggLogo}
            resizeMode="contain"
            accessible
            accessibilityLabel={copy.splash.a11y}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
