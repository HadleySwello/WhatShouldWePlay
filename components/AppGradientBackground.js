import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient, Defs, Stop, Svg, Rect } from 'react-native-svg';
import { useAppTheme } from '../theme';

export default function AppGradientBackground() {
  const { tokens } = useAppTheme();

  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={tokens.colors.tintMain} stopOpacity="1" />
          <Stop
            offset="0.5"
            stopColor={tokens.colors.backgroundMain}
            stopOpacity="0.15"
          />
          <Stop
            offset="1.5"
            stopColor={tokens.colors.tintSecondary}
            stopOpacity="0.25"
          />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#appGrad)" />
    </Svg>
  );
}
