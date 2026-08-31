import { Easing, type EasingFunction } from 'react-native';

export const durations: Record<string, number> = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const easing: Record<string, EasingFunction> = {
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  cubicOut: Easing.out(Easing.cubic),
};
