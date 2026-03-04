import React from 'react';
import { TextInput } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppInput({
  variant = 'default',
  placeholderTextColor,
  style,
  ...rest
}) {
  const { tokens, styles } = useAppTheme();
  const c = tokens.colors;
  const inputStyle = variant === 'default' ? styles.input.default : styles.input.default;
  return (
    <TextInput
      style={[inputStyle, style]}
      placeholderTextColor={placeholderTextColor ?? c.textSecondary}
      {...rest}
    />
  );
}
