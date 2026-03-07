import React from 'react';
import { View, Image, TouchableOpacity, Linking } from 'react-native';
import AppGradientBackground from '../components/AppGradientBackground';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const BGG_URL = 'https://boardgamegeek.com';

export default function WelcomeScreen({ navigation }) {
  const { styles } = useAppTheme();

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
        <View style={[styles.card.default, styles.screen.splashCard]}>
          <AppText variant="title" style={layout.marginBottomLg}>
            {copy.welcome.title}
          </AppText>
          <AppText variant="subtitle" style={layout.marginBottom3xl}>
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
          <AppText variant="footer">{copy.splash.attribution}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
