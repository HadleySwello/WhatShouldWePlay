import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppChip({
  selected,
  onPress,
  children,
  style,
  ...rest
}) {
  const { styles } = useAppTheme();
  const containerStyle = selected
    ? [styles.chip.default, styles.chip.selected]
    : styles.chip.default;
  const textStyle = selected
    ? styles.chip.selectedText
    : styles.chip.defaultText;

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      activeOpacity={0.7}
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
