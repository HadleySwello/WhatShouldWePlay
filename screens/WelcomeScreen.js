import React from 'react';
import { View } from 'react-native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function WelcomeScreen({ navigation }) {
  const { styles } = useAppTheme();

  return (
    <View
      style={[
        styles.screen.container,
        layout.paddingXl,
        layout.center,
      ]}
    >
      <AppText variant="title" style={layout.marginBottomLg}>
        {copy.welcome.title}
      </AppText>
      <AppText variant="subtitle" style={layout.marginBottom3xl}>
        {copy.welcome.subtitle}
      </AppText>
      <AppButton
        variant="primary"
        onPress={() => navigation.navigate('ConnectBGG')}
        style={layout.marginBottomMd}
      >
        {copy.welcome.cta}
      </AppButton>
    </View>
  );
}
