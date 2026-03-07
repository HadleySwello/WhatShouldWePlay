import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient, Defs, Stop, Svg, Rect } from 'react-native-svg';

import AppText from '../components/AppText';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const BGG_URL = 'https://boardgamegeek.com';
const BGG_COLLECTION_KEY = 'bggCollection';
const SPLASH_DELAY_MS = 3000;

export default function SplashScreen({ navigation }) {
  const [, setChecked] = useState(false);
  const { styles, tokens } = useAppTheme();

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

        const timer = setTimeout(() => {
          if (cancelled) return;
          if (hasCollection) {
            navigation.replace('Home');
          } else {
            navigation.replace('Welcome');
          }
        }, SPLASH_DELAY_MS);

        return () => clearTimeout(timer);
      } catch {
        if (!cancelled) {
          setChecked(true);
          setTimeout(() => navigation.replace('Welcome'), SPLASH_DELAY_MS);
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
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={tokens.colors.backgroundMain} stopOpacity="1" />
            <Stop offset="0.75" stopColor={tokens.colors.tintSecondary} stopOpacity="0.15" />
            <Stop offset="1" stopColor={tokens.colors.tintMain} stopOpacity="0.25" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <View
        style={[
          styles.screen.container,
          layout.center,
          layout.paddingLg,
          { backgroundColor: 'transparent' }
        ]}
      >
        <View style={[styles.card.default, styles.screen.splashCard]}>
          <AppText variant="title" style={layout.marginBottomLg}>
            {copy.splash.title}
          </AppText>
          <AppText variant="subtitle">{copy.splash.subtitle}</AppText>
          {copy.splash.tagline ? (
            <AppText
              variant="body"
              style={[layout.marginTopMd, { opacity: 0.8, fontSize: 14 }]}
            >
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
          <AppText variant="footer">{copy.splash.attribution}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

