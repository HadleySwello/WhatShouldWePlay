import React from 'react';
import { View } from 'react-native';
import AppGradientBackground from '../components/AppGradientBackground';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppLogo from '../components/AppLogo';
import PoweredByBGG from '../components/PoweredByBGG';
import copy from '../constants/copy';
import { useAppTheme, layout } from '../theme';

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
        <View style={layout.center}>
          <View style={styles.welcome.logoContainer}>
            <AppLogo width={280} height={280} />
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
        <PoweredByBGG style={styles.welcome.footerAttribution} />
      </View>
    </View>
  );
}
