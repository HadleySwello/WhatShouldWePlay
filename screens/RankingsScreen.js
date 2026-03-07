import React, { useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';

import AppText from '../components/AppText';
import copy, { t } from '../constants/copy';
import AppButton from '../components/AppButton';
import GameCard from '../components/GameCard';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function RankingsScreen({ navigation }) {
  const { games, username, error, isLoading, reload } =
    useBoardGameGeekCollection();
  const { tokens, styles } = useAppTheme();

  useLayoutEffect(() => {
    const title = username
      ? t(copy.rankings.navTitleTemplate, { username })
      : copy.navigation.browseCollection;
    navigation.setOptions({
      title,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => reload()}
          style={styles.refreshButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <FontAwesome5
            name="sync-alt"
            size={20}
            color={tokens.colors.tintMain}
          />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    reload,
    tokens.colors.tintMain,
    styles.refreshButton,
    username,
  ]);

  if (isLoading) {
    return (
      <View style={[styles.screen.container, layout.center]}>
        <ActivityIndicator color={tokens.colors.tintMain} size="large" />
        <AppText variant="helper" style={layout.marginTopMd}>
          {copy.rankings.loading}
        </AppText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.screen.container, layout.center]}>
        <AppText variant="error" style={layout.marginTopMd}>
          {error}
        </AppText>
        <TouchableOpacity style={styles.retryButton} onPress={reload}>
          <AppText variant="retry">{copy.rankings.retry}</AppText>
        </TouchableOpacity>
      </View>
    );
  }

  if (games.length === 0) {
    const bggUrl = username
      ? `${copy.rankings.bggCollectionUrl}${encodeURIComponent(username)}`
      : 'https://boardgamegeek.com';
    return (
      <View style={[styles.screen.container, styles.emptyContainer]}>
        <AppText variant="emptyTitle" style={layout.marginTop3xl}>
          {copy.rankings.emptyTitle}
        </AppText>
        <AppText
          variant="emptyBody"
          style={[
            layout.marginBottomMd,
            layout.textCenter,
            layout.marginHorizontalXl,
          ]}
        >
          {copy.rankings.emptyBody}
        </AppText>
        <TouchableOpacity
          onPress={() => Linking.openURL(bggUrl)}
          style={layout.marginBottomXl}
        >
          <AppText variant="retry" style={styles.retryButtonText}>
            {copy.rankings.emptyBodyLink}
          </AppText>
        </TouchableOpacity>
        <AppButton
          variant="primary"
          onPress={() => navigation.navigate('ConnectBGG')}
        >
          {copy.rankings.ctaChangeUsername}
        </AppButton>
      </View>
    );
  }

  return (
    <View style={styles.screen.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: tokens.spacing.lg },
        ]}
        renderItem={({ item }) => <GameCard game={item} />}
      />
      <AppButton
        variant="primaryCompact"
        onPress={() => navigation.navigate('Setup')}
        style={[layout.marginHorizontalLg, layout.marginBottomXl]}
      >
        {copy.rankings.ctaChooseGame}
      </AppButton>
    </View>
  );
}
