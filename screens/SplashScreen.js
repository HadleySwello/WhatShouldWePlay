import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppGradientBackground from '../components/AppGradientBackground';
import AppText from '../components/AppText';
import AppLoadingGradient from '../components/AppLoadingGradient';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

import AppLogo from '../components/AppLogo';
import PoweredByBGG from '../components/PoweredByBGG';

const BGG_COLLECTION_KEY = 'bggCollection';

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
            <AppLogo width={280} height={280} />
          </View>
          <AppText variant="subtitle">{copy.splash.subtitle}</AppText>
          {copy.splash.tagline ? (
            <AppText variant="body" style={styles.splash.tagline}>
              {copy.splash.tagline}
            </AppText>
          ) : null}
        </View>
        <PoweredByBGG style={styles.splash.footerAttribution} />
      </View>
    </View>
  );
}
