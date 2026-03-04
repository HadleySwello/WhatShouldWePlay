import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppText from '../components/AppText';
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
        What Should We Play?
      </AppText>
      <AppText variant="subtitle">A Board Game Decision Tool</AppText>
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
          accessibilityLabel="Powered by BoardGameGeek"
        />
        <AppText variant="footer">Data provided by BoardGameGeek</AppText>
      </TouchableOpacity>
    </View>
  );
}
