import React, { useRef, useState } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import { Easing } from 'react-native';

import copy, { t } from '../constants/copy';
import { useAppTheme } from '../theme';
import { getSpinnerMarkerStyle, getSpinnerWheelStyle } from '../theme';
import { layout } from '../theme';
import AppButton from './AppButton';
import AppText from './AppText';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;

export default function Spinner({ slices, onSpinningEnd }) {
  const [winner, setWinner] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const spinDuration = 5000;
  const { styles, tokens } = useAppTheme();
  const markerStyle = getSpinnerMarkerStyle(WHEEL_SIZE, tokens);
  const wheelStyle = getSpinnerWheelStyle(WHEEL_SIZE);

  const NUM_SECTIONS = slices.length;
  const anglePerSection = NUM_SECTIONS > 0 ? 360 / NUM_SECTIONS : 360;

  const spinWheel = () => {
    if (NUM_SECTIONS === 0) return;
    const winningIndex = Math.floor(Math.random() * NUM_SECTIONS);
    const extraSpins = 5;
    const finalAngle =
      360 -
      (winningIndex * anglePerSection + anglePerSection / 2) +
      extraSpins * 360;

    animatedValue.setValue(0);
    setWinner(null);

    Animated.timing(animatedValue, {
      toValue: finalAngle,
      duration: spinDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      const w = slices[winningIndex];
      setWinner(w);
      if (onSpinningEnd) onSpinningEnd(w);
    });
  };

  const renderSlices = () => {
    const pieGenerator = d3Shape.pie().value(1).sort(null);
    const arcGenerator = d3Shape
      .arc()
      .outerRadius(WHEEL_SIZE / 2)
      .innerRadius(0);

    const pieData = pieGenerator(slices);

    // Use the Gemstone Ritual Palette from tokens
    const WHEEL_PALETTE = [
      tokens.colors.ritual.wheel1,
      tokens.colors.ritual.wheel2,
      tokens.colors.ritual.wheel3,
      tokens.colors.ritual.wheel4,
      tokens.colors.ritual.wheel5,
    ];

    return pieData.map((slice, index) => {
      const path = arcGenerator(slice);
      const labelAngle = (slice.startAngle + slice.endAngle) / 2;

      // Spoke-style rotation: the text points outward from the center.
      // We align the text along the radius.
      const labelX =
        (WHEEL_SIZE / 2) * 0.9 * Math.cos(labelAngle - Math.PI / 2);
      const labelY =
        (WHEEL_SIZE / 2) * 0.9 * Math.sin(labelAngle - Math.PI / 2);

      // Determine color with adjacency logic
      let colorIndex = index % WHEEL_PALETTE.length;

      // Ensure the last slice never matches the first slice (index 0)
      if (index === slices.length - 1 && index > 0 && colorIndex === 0) {
        colorIndex = 1;
      }

      const sliceColor = WHEEL_PALETTE[colorIndex];

      // Point from center outwards like a spoke:
      // We subtract 90 degrees because SVG text starts horizontal (3 o'clock)
      // and our angle starts at the top (12 o'clock).
      const rotationDegrees = (labelAngle * 180) / Math.PI - 90;

      return (
        <G key={`slice-${index}`}>
          <Path d={path} fill={sliceColor} />
          <SvgText
            x={labelX}
            y={labelY}
            textAnchor="end" // Text ends at the outer radius, pointing outwards
            alignmentBaseline="middle"
            transform={`rotate(${rotationDegrees}, ${labelX}, ${labelY})`}
            style={styles.spinnerSliceText}
          >
            {slices[index].length > 18
              ? `${slices[index].substring(0, 15)}...`
              : slices[index]}
          </SvgText>
        </G>
      );
    });
  };

  return (
    <View style={[layout.fill, layout.center]}>
      <View style={styles.spinnerWheelContainer}>
        <Animated.View
          style={[
            wheelStyle,
            {
              transform: [
                {
                  rotate: animatedValue.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Svg
            width={WHEEL_SIZE}
            height={WHEEL_SIZE}
            viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
          >
            <G x={WHEEL_SIZE / 2} y={WHEEL_SIZE / 2}>
              {renderSlices()}
            </G>
          </Svg>
        </Animated.View>
        <View style={markerStyle} />
      </View>
      {NUM_SECTIONS > 0 && (
        <AppButton
          variant="primary"
          onPress={spinWheel}
          style={layout.marginTopLg}
        >
          {copy.spinner.spinButton}
        </AppButton>
      )}
      {winner && (
        <AppText variant="spinnerWinnerText" style={styles.spinnerWinnerText}>
          {t(copy.spinner.winnerLabel, { name: winner })}
        </AppText>
      )}
    </View>
  );
}
