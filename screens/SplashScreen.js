import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppGradientBackground from '../components/AppGradientBackground';
import AppText from '../components/AppText';
import AppLoadingGradient from '../components/AppLoadingGradient';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

import LogoLight from '../assets/WhatShouldWePlayLogo-Light.svg';
import LogoDark from '../assets/WhatShouldWePlayLogo-Dark.svg';

const BGG_URL = 'https://boardgamegeek.com';
const BGG_COLLECTION_KEY = 'bggCollection';

export default function SplashScreen({ navigation }) {
  const [, setChecked] = useState(false);
  const { styles, theme } = useAppTheme();
  const isDark = theme.dark === true;
  const Logo = isDark ? LogoDark : LogoLight;

  useEffect(() => {
    let cancelled = false;

    const checkAndGo = async () => {
      try {
        const raw = await AsyncStorage.getItem(BGG_COLLECTION_KEY);
        const collection = raw ? JSON.parse(raw) : null;
        const hasCollection =
          Array.isArray(collection) && collection.length > 0;

        if (cancelled) return;
        setChecked(true);

        if (hasCollection) {
          navigation.replace('Home');
        } else {
          navigation.replace('Welcome');
        }
      } catch {
        if (!cancelled) {
          setChecked(true);
          navigation.replace('Welcome');
        }
      }
    };

    checkAndGo();
    return () => {
      cancelled = true;
    };
  }, [navigation]);

  return (
    <View style={styles.screen.wrapper}>
      <AppGradientBackground />
      <View
        style={[
          styles.screen.container,
          layout.center,
          layout.paddingLg,
          { backgroundColor: 'transparent' },
        ]}
      >
        <View style={layout.center}>
          <View style={styles.splash.loadingContainer}>
            <AppLoadingGradient size={80} />
          </View>
          <View style={styles.splash.logoContainer}>
            <Logo width={280} height={280} />
          </View>
          <AppText variant="subtitle">
            {copy.splash.subtitle}
          </AppText>
          {copy.splash.tagline ? (
            <AppText variant="body" style={styles.splash.tagline}>
              {copy.splash.tagline}
            </AppText>
          ) : null}
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
