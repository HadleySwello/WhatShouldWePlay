import React from 'react';
import { View } from 'react-native';

import AppButton from '../components/AppButton';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function SettingsScreen({ navigation }) {
  const { styles } = useAppTheme();

  return (
    <View style={[styles.screen.container, layout.paddingXl]}>
      <AppButton
        variant="primary"
        onPress={() => navigation.navigate('ConnectBGG')}
      >
        Change Username
      </AppButton>
    </View>
  );
}
