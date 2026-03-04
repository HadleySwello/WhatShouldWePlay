import React from 'react';
import { View } from 'react-native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function CollectionImportedScreen({ route, navigation }) {
  const gameCount = route.params?.gameCount ?? 0;
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
        Collection Imported
      </AppText>
      <AppText variant="body" style={layout.marginBottom3xl}>
        {gameCount} {gameCount === 1 ? 'game' : 'games'} added to your
        collection.
      </AppText>
      <AppButton
        variant="primary"
        onPress={() => navigation.replace('Home')}
      >
        Start Picking
      </AppButton>
    </View>
  );
}
