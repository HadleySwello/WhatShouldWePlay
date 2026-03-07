import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppButton({
  variant = 'primary',
  onPress,
  disabled,
  children,
  style,
  ...rest
}) {
  const { styles } = useAppTheme();

  const containerStyle = styles.button[variant] || styles.button.primary;
  const textStyle =
    styles.button[`${variant}Text`] || styles.button.primaryText;

  // Final style merges base variant style, disabled state, and manual overrides
  const combinedContainerStyle = [
    containerStyle,
    disabled && styles.button.disabled,
    style,
  ];

  // Helper to extract color from style overrides (allowing ad-hoc color changes)
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const finalTextStyle = [
    textStyle,
    flattenedStyle.color && { color: flattenedStyle.color },
  ];

  return (
    <TouchableOpacity
      style={combinedContainerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text style={finalTextStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
