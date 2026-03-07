import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppCard({
  variant = 'default',
  style,
  children,
  ...rest
}) {
  const { styles } = useAppTheme();
  const cardStyle =
    variant === 'default' ? styles.card.default : styles.card.default;
  return (
    <View style={[cardStyle, style]} {...rest}>
      {children}
    </View>
  );
}
