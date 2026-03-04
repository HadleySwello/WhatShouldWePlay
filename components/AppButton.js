import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
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

  const containerStyle =
    variant === 'primary'
      ? styles.button.primary
      : variant === 'secondary'
        ? styles.button.secondary
        : styles.button.tertiary;
  const textStyle =
    variant === 'primary'
      ? styles.button.primaryText
      : variant === 'secondary'
        ? styles.button.secondaryText
        : styles.button.tertiaryText;

  return (
    <TouchableOpacity
      style={[containerStyle, disabled && styles.button.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}
