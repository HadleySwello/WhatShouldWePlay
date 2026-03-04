import React from 'react';
import { View, Image } from 'react-native';
import { useAppTheme } from '../theme';
import { layout } from '../theme';
import AppText from './AppText';

export default function AppListItem({
  thumbnail,
  name,
  details,
  children,
  style,
  ...rest
}) {
  const { styles } = useAppTheme();

  return (
    <View style={[styles.listItem.default, style]} {...rest}>
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.listItem.thumbnail} resizeMode="cover" />
      ) : (
        <View style={[styles.listItem.thumbnail, styles.listItem.thumbnailPlaceholder]} />
      )}
      <View style={layout.flex1}>
        <AppText variant="gameName" numberOfLines={1}>
          {name}
        </AppText>
        {details != null && (
          <AppText variant="gameDetails">
            {details}
          </AppText>
        )}
      </View>
      {children}
    </View>
  );
}
