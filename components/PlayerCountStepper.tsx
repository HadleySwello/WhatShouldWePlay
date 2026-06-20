import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import { useAppTheme } from '../theme';
import {
  PLAYER_COUNT_MIN,
  PLAYER_COUNT_MAX,
} from '../helpers/defaultPlayerCountStorage';

export default function PlayerCountStepper({ value, onValueChange }) {
  const { styles } = useAppTheme();

  const decrement = () => {
    onValueChange(Math.max(PLAYER_COUNT_MIN, value - 1));
  };

  const increment = () => {
    onValueChange(Math.min(PLAYER_COUNT_MAX, value + 1));
  };

  return (
    <View style={styles.stepper.row}>
      <TouchableOpacity style={styles.stepper.button} onPress={decrement}>
        <AppText variant="stepperSymbol">−</AppText>
      </TouchableOpacity>
      <AppText variant="stepperValue">{value}</AppText>
      <TouchableOpacity style={styles.stepper.button} onPress={increment}>
        <AppText variant="stepperSymbol">+</AppText>
      </TouchableOpacity>
    </View>
  );
}
