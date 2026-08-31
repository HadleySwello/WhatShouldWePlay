import React from 'react';
import { View } from 'react-native';

/**
 * Web: no confetti (avoids pulling in @shopify/react-native-skia on web).
 * Celebration screen still works; we just skip the effect.
 */
export function Confetti() {
  return <View />;
}
