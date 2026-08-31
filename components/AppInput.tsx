import React from 'react';
import { TextInput } from 'react-native';
import { useAppTheme } from '../theme';

export type AppInputProps = {
  variant?: string;
  autoFocus?: boolean;
  autoCapitalize?: any;
  maxLength?: any;
  onChangeText?: any;
  placeholder?: any;
  placeholderTextColor?: any;
  style?: any;
  value?: any;
};

export default function AppInput({
  variant = 'default',
  placeholderTextColor,
  style,
  ...rest
}: AppInputProps) {
  const { tokens, styles } = useAppTheme();
  const c = tokens.colors;
  const inputStyle =
    variant === 'default' ? styles.input.default : styles.input.default;
  return (
    <TextInput
      style={[inputStyle, style]}
      placeholderTextColor={placeholderTextColor ?? c.textSecondary}
      {...rest}
    />
  );
}
