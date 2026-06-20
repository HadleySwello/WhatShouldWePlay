import React from 'react';
import { ContinuousConfetti } from 'react-native-fast-confetti';

/**
 * Native (iOS/Android): confetti falling from the top, runs indefinitely.
 * Uses ContinuousConfetti (autoplay, isInfinite).
 */
export function Confetti(props: any) {
  return <ContinuousConfetti {...props} />;
}
