import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../theme';
import AppText from './AppText';

export default function VoteControl({ value, onIncrement, onDecrement, style }) {
  const { styles } = useAppTheme();

  return (
    <View style={[styles.voteRow, style]}>
      <TouchableOpacity
        style={styles.voteButton}
        onPress={onDecrement}
        activeOpacity={0.7}
      >
        <AppText variant="voteSymbol">−</AppText>
      </TouchableOpacity>
      
      <AppText variant="voteCount">
        {value || 0}
      </AppText>
      
      <TouchableOpacity
        style={styles.voteButton}
        onPress={onIncrement}
        activeOpacity={0.7}
      >
        <AppText variant="voteSymbol">+</AppText>
      </TouchableOpacity>
    </View>
  );
}
