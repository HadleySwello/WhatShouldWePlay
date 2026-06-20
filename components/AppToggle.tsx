import React from 'react';
import { Switch, Platform } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppToggle({ value, onValueChange, disabled, ...rest }) {
  const { tokens } = useAppTheme();

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: tokens.colors.cardMain,
        true: tokens.colors.tintMain,
      }}
      thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
      ios_backgroundColor={tokens.colors.cardMain}
      {...rest}
    />
  );
}
