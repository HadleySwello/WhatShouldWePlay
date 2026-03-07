import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppScreen({
  variant = 'default',
  style,
  children,
  ...rest
}) {
  const { styles } = useAppTheme();
  const containerStyle =
    variant === 'default' ? styles.screen.container : styles.screen.container;
  return (
    <View style={[containerStyle, style]} {...rest}>
      {children}
    </View>
  );
}
