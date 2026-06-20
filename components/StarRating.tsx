import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAppTheme } from '../theme';

/**
 * Displays a 5-star rating.
 */
export default function StarRating({
  rating = 0,
  maxIcons = 5,
  size = 14,
  color,
}) {
  const { tokens, styles } = useAppTheme();
  const iconColor = color || tokens.colors.tintMain;

  return (
    <View style={styles.starRating.container}>
      {[...Array(maxIcons)].map((_, i) => {
        const starIndex = i + 1;
        let iconName = 'star-o'; // empty

        if (rating >= starIndex) {
          iconName = 'star'; // full
        } else if (rating > i) {
          iconName = 'star-half-o'; // half
        }

        return (
          <FontAwesome
            key={i}
            name={iconName}
            size={size}
            color={iconColor}
            style={styles.starRating.icon}
          />
        );
      })}
    </View>
  );
}
