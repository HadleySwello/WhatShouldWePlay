import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../helpers/colors';

const BGG_COLLECTION_KEY = 'bggCollection';
const SPLASH_DELAY_MS = 5000;

export default function SplashScreen({ navigation }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkAndGo = async () => {
      try {
        const raw = await AsyncStorage.getItem(BGG_COLLECTION_KEY);
        const collection = raw ? JSON.parse(raw) : null;
        const hasCollection = Array.isArray(collection) && collection.length > 0;

        if (cancelled) return;
        setChecked(true);

        const timer = setTimeout(() => {
          if (cancelled) return;
          if (hasCollection) {
            navigation.replace('Home');
          } else {
            navigation.replace('ConnectBGG');
          }
        }, SPLASH_DELAY_MS);

        return () => clearTimeout(timer);
      } catch (_) {
        if (!cancelled) {
          setChecked(true);
          setTimeout(() => navigation.replace('ConnectBGG'), SPLASH_DELAY_MS);
        }
      }
    };

    checkAndGo();
    return () => { cancelled = true; };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Should We Play?</Text>
      <Text style={styles.subtitle}>A Board Game Decision Tool</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Data provided by BoardGameGeek</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
