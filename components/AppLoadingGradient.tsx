import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Svg, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { useAppTheme } from '../theme';

export default function AppLoadingGradient({ size = 48 }) {
  const { tokens, styles, reduceMovement } = useAppTheme();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduceMovement) {
      spinValue.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000, // Slow, ceremonial rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [spinValue, reduceMovement]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const containerStyle = [
    styles.loadingGradient.container,
    {
      width: size,
      height: size,
      transform: [{ rotate: spin }],
    },
  ];

  return (
    <>
      <Animated.View style={containerStyle}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <LinearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop
                offset="0"
                stopColor={tokens.colors.tintMain}
                stopOpacity="1"
              />
              <Stop
                offset="0.7"
                stopColor={tokens.colors.tintSecondary}
                stopOpacity="0.5"
              />
              <Stop
                offset="1"
                stopColor={tokens.colors.backgroundMain}
                stopOpacity="0"
              />
            </LinearGradient>
          </Defs>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            stroke="url(#spinGrad)"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${size * 2} ${size * 2}`}
            strokeDashoffset={size * 0.5}
          />
        </Svg>
      </Animated.View>
    </>
  );
}
