import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useAppTheme } from '../theme';
import { layout } from '../theme';
import AppText from './AppText';
import StarRating from './StarRating';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function GameCard({ game }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { styles, tokens, reduceMovement } = useAppTheme();
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isExpanded ? 1 : 0,
      duration: reduceMovement ? 0 : 400,
      useNativeDriver: false,
    }).start();
  }, [isExpanded, reduceMovement]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const {
    name,
    thumbnail,
    complexityWeight,
    length,
    rating,
    yearPublished,
    playersMin,
    playersMax,
    categories,
    mechanics,
    description,
  } = game;

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2000],
  });

  const opacity = animationValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const cleanDescription = description
    ? description
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#10;/g, '\n')
        .replace(/&#13;/g, '\r')
    : '';

  const starRating = rating ? parseFloat(rating) / 2 : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpand}
      style={styles.gameCard.container}
    >
      <View style={styles.gameCard.content}>
        {thumbnail ? (
          <Image
            source={{ uri: thumbnail }}
            style={styles.gameCard.image}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.gameCard.image,
              { backgroundColor: tokens.colors.cardSecondary },
            ]}
          />
        )}

        <View style={styles.gameCard.info}>
          <AppText variant="gameCardName" numberOfLines={2}>
            {String(name)}
          </AppText>
          {starRating > 0 ? (
            <View style={styles.gameCard.ratingRow}>
              <StarRating rating={starRating} maxIcons={5} size={14} />
            </View>
          ) : null}
          <View style={styles.gameCard.statsRow}>
            <View style={styles.gameCard.statItem}>
              <Feather
                name="clock"
                size={12}
                color={tokens.colors.textSecondary}
              />
              <AppText variant="gameCardStat">{String(length)}</AppText>
            </View>
            <View style={styles.gameCard.statItem}>
              <Feather
                name="users"
                size={12}
                color={tokens.colors.textSecondary}
              />
              <AppText variant="gameCardStat">
                {playersMin === playersMax
                  ? String(playersMin)
                  : `${playersMin}-${playersMax}`}
              </AppText>
            </View>
            {typeof complexityWeight === 'number' && complexityWeight > 0 ? (
              <View style={styles.gameCard.statItem}>
                <FontAwesome5
                  name="glasses"
                  size={12}
                  color={tokens.colors.textSecondary}
                />
                <AppText variant="gameCardStat">
                  {complexityWeight.toFixed(1)} / 5
                </AppText>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <Animated.View style={[styles.gameCard.expanded, { maxHeight, opacity }]}>
        <View style={styles.gameCard.expandedDataGrid}>
          <View style={styles.gameCard.expandedDataItem}>
            <AppText variant="gameCardLabel">Year</AppText>
            <AppText variant="gameCardValue">{String(yearPublished)}</AppText>
          </View>
          {game.bggRank ? (
            <View style={styles.gameCard.expandedDataItem}>
              <AppText variant="gameCardLabel">Rank</AppText>
              <AppText variant="gameCardValue">#{String(game.bggRank)}</AppText>
            </View>
          ) : null}
          {game.minAge ? (
            <View style={styles.gameCard.expandedDataItem}>
              <AppText variant="gameCardLabel">Age</AppText>
              <AppText variant="gameCardValue">{String(game.minAge)}+</AppText>
            </View>
          ) : null}
          {typeof complexityWeight === 'number' && complexityWeight > 0 ? (
            <View style={styles.gameCard.expandedDataItem}>
              <AppText variant="gameCardLabel">Weight</AppText>
              <AppText variant="gameCardValue">
                {complexityWeight.toFixed(2)} / 5
              </AppText>
            </View>
          ) : null}
        </View>
        {cleanDescription ? (
          <AppText variant="gameCardDescription" numberOfLines={10}>
            {String(cleanDescription)}
          </AppText>
        ) : null}
        {mechanics && mechanics.length > 0 ? (
          <View style={layout.marginBottomSm}>
            <AppText variant="gameCardSectionTitle">Mechanics</AppText>
            <View style={styles.gameCard.tagCloud}>
              {mechanics.map((m, i) => (
                <View key={i} style={styles.gameCard.tag}>
                  <AppText variant="gameCardTag">{String(m)}</AppText>
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {categories && categories.length > 0 ? (
          <View>
            <AppText variant="gameCardSectionTitle">Categories</AppText>
            <View style={styles.gameCard.tagCloud}>
              {categories.map((c, i) => (
                <View key={i} style={styles.gameCard.tag}>
                  <AppText variant="gameCardTag">{String(c)}</AppText>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </Animated.View>
    </TouchableOpacity>
  );
}
