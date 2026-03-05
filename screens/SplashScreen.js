import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppText from '../components/AppText';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const BGG_URL = 'https://boardgamegeek.com';
const BGG_COLLECTION_KEY = 'bggCollection';
const SPLASH_DELAY_MS = 3000;

export default function SplashScreen({ navigation }) {
  const [, setChecked] = useState(false);
  const { styles } = useAppTheme();

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
    <View
      style={[
        styles.screen.container,
        layout.center,
        layout.paddingLg,
      ]}
    >
      <AppText variant="title" style={layout.marginBottomMd}>
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
  );
}
