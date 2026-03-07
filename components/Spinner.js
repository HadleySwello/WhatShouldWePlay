import React, { useRef, useState } from 'react';
import { View, Text, Button, Animated, Dimensions } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import { Easing } from 'react-native';

import copy, { t } from '../constants/copy';
import { useAppTheme } from '../theme';
import { getSpinnerMarkerStyle } from '../theme';
import { layout } from '../theme';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;

export default function Spinner({ slices, onSpinningEnd, colors }) {
  const c = colors || {};
  const [winner, setWinner] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const spinDuration = 5000;
  const { styles, tokens } = useAppTheme();
  const markerStyle = getSpinnerMarkerStyle(WHEEL_SIZE, tokens);

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

    return pieData.map((slice, index) => {
      const path = arcGenerator(slice);
      const labelAngle = (slice.startAngle + slice.endAngle) / 2;
      const labelX =
        (WHEEL_SIZE / 2) * 0.7 * Math.cos(labelAngle - Math.PI / 2);
      const labelY =
        (WHEEL_SIZE / 2) * 0.7 * Math.sin(labelAngle - Math.PI / 2);

      return (
        <G key={`slice-${index}`}>
          <Path
            d={path}
            fill={index % 2 === 0 ? c.tintSecondary : c.tintSpecial}
          />
          <SvgText
            x={labelX}
            y={labelY}
            fill={c.textMain}
            fontSize="14"
            textAnchor="middle"
          >
            {slices[index]}
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
            { width: WHEEL_SIZE, height: WHEEL_SIZE },
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
        <Button
          title={copy.spinner.spinButton}
          onPress={spinWheel}
          color={c.tintMain}
        />
      )}
      {winner && (
        <Text style={styles.spinnerWinnerText}>
          {t(copy.spinner.winnerLabel, { name: winner })}
        </Text>
      )}
    </View>
  );
}
