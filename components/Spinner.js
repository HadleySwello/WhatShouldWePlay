import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import * as d3Shape from 'd3-shape';
import { Easing } from 'react-native';
import colors from '../helpers/colors';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;

const Spinner = ({ slices }) => {
  const [winner, setWinner] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const spinDuration = 5000;

  const NUM_SECTIONS = slices.length;
  const anglePerSection = 360 / NUM_SECTIONS;

  const spinWheel = () => {
    const winningIndex = Math.floor(Math.random() * NUM_SECTIONS);
    const extraSpins = 5; // Number of full rotations
    const finalAngle =
      360 - (winningIndex * anglePerSection + anglePerSection / 2) + extraSpins * 360;
  
    animatedValue.setValue(0);
    
    Animated.timing(animatedValue, {
      toValue: finalAngle,
      duration: spinDuration,
      useNativeDriver: true,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      setWinner(slices[winningIndex]);
    });
  };

  const renderSlices = () => {
    const pieGenerator = d3Shape.pie().value(1).sort(null);
    const arcGenerator = d3Shape.arc()
      .outerRadius(WHEEL_SIZE / 2)
      .innerRadius(0);

    const pieData = pieGenerator(slices);

    return pieData.map((slice, index) => {
      const path = arcGenerator(slice);
      const labelAngle = (slice.startAngle + slice.endAngle) / 2;
      const labelX = (WHEEL_SIZE / 2) * 0.7 * Math.cos(labelAngle - Math.PI / 2);
      const labelY = (WHEEL_SIZE / 2) * 0.7 * Math.sin(labelAngle - Math.PI / 2);

      return (
        <G key={`slice-${index}`}>
          <Path
            d={path}
            fill={index % 2 === 0 ? colors.tintSecondary : colors.tintSpecial}
          />
          <SvgText
            x={labelX}
            y={labelY}
            fill={colors.textMain}
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
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <Animated.View
          style={[
            styles.wheel,
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
        <View
          style={[
            styles.marker,
            {
              top: -10, // Raise the marker slightly
              left: WHEEL_SIZE / 2 - 10,
            },
          ]}
        />
      </View>
      <Button title="Spin!" onPress={spinWheel} color={colors.tintMain} />
      {winner && <Text style={styles.winnerText}>Winner: {winner}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundMain,
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
  },
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: colors.tintMain,
    borderRadius: 10,
    zIndex: 1,
  },
  winnerText: {
    marginTop: 20,
    fontSize: 18,
    color: colors.textSpecial,
  },
});

export default Spinner;
