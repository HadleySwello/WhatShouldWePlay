import React from 'react';
import { View } from 'react-native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
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
        What Should We Play?
      </AppText>
      <AppText variant="subtitle" style={layout.marginBottom3xl}>
        Connect your BoardGameGeek collection to find the perfect game for your
        group.
      </AppText>
      <AppButton
        variant="primary"
        onPress={() => navigation.navigate('ConnectBGG')}
        style={layout.marginBottomMd}
      >
        Connect BoardGameGeek
      </AppButton>
    </View>
  );
}
