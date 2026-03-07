import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient, Defs, Stop, Svg, Rect } from 'react-native-svg';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const BGG_URL = 'https://boardgamegeek.com';

export default function WelcomeScreen({ navigation }) {
  const { styles, tokens } = useAppTheme();

  return (
    <View style={styles.screen.wrapper}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="gradW" x1="0" y1="0" x2="0" y2="1">
            <Stop
              offset="0"
              stopColor={tokens.colors.backgroundMain}
              stopOpacity="1"
            />
            <Stop
              offset="0.75"
              stopColor={tokens.colors.tintSecondary}
              stopOpacity="0.15"
            />
            <Stop
              offset="1"
              stopColor={tokens.colors.tintMain}
              stopOpacity="0.25"
            />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#gradW)" />
      </Svg>
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
          <View style={{ width: '100%', alignItems: 'center' }}>
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
