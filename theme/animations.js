import { Easing } from 'react-native';

export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
};

export const easing = {
  easeIn: Easing.in(Easing.ease),
  easeOut: Easing.out(Easing.ease),
  easeInOut: Easing.inOut(Easing.ease),
  cubicOut: Easing.out(Easing.cubic),
};
