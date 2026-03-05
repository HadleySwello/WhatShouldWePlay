import React from 'react';
import { View } from 'react-native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy, { t } from '../constants/copy';
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
        {t(copy.collectionImported.title, { count: gameCount })}
      </AppText>
      <AppText variant="body" style={layout.marginBottom3xl}>
        {gameCount === 1
          ? t(copy.collectionImported.bodyOne, { count: gameCount })
          : t(copy.collectionImported.bodyMany, { count: gameCount })}
      </AppText>
      <AppButton
        variant="primary"
        onPress={() => navigation.replace('Home')}
      >
        {copy.collectionImported.cta}
      </AppButton>
    </View>
  );
}
