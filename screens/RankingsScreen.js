import React, { useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import useBoardGameGeekCollection from '../hooks/boardGameGeekApi';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function RankingsScreen({ navigation }) {
  const { games, error, isLoading, reload } = useBoardGameGeekCollection();
  const { tokens, styles } = useAppTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
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
  }, [navigation, reload, tokens.colors.tintMain, styles.refreshButton]);

  if (isLoading) {
    return (
      <View style={[styles.screen.container, layout.center]}>
        <ActivityIndicator color={tokens.colors.tintMain} size="large" />
        <AppText variant="helper" style={layout.marginTopMd}>
          Loading your collection...
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
          <AppText variant="retry">Try Again</AppText>
        </TouchableOpacity>
      </View>
    );
  }

  if (games.length === 0) {
    return (
      <View style={[styles.screen.container, styles.emptyContainer]}>
        <AppText variant="emptyTitle" style={layout.marginTop3xl}>
          Your collection is empty
        </AppText>
        <AppText
          variant="emptyBody"
          style={[layout.marginBottomXl, layout.textCenter, layout.marginHorizontalXl]}
        >
          No games in your collection. Add games via BoardGameGeek or change
          your username.
        </AppText>
        <AppButton
          variant="primary"
          onPress={() => navigation.navigate('ConnectBGG')}
        >
          Change Username
        </AppButton>
      </View>
    );
  }

  return (
    <View style={styles.screen.container}>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.gameItem}>
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.listItem.thumbnail}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  styles.listItem.thumbnail,
                  styles.listItem.thumbnailPlaceholder,
                ]}
              />
            )}
            <View style={layout.flex1}>
              <AppText variant="gameName">{item.name}</AppText>
              <AppText variant="gameDetails">
                {item.yearPublished} · Rating: {item.rating || '—'}
              </AppText>
            </View>
          </View>
        )}
      />
      <AppButton
        variant="primary"
        onPress={() => navigation.navigate('Setup')}
        style={[
          styles.button.primaryCompact,
          layout.marginHorizontalLg,
          layout.marginBottomXl,
        ]}
      >
        Choose a Game
      </AppButton>
    </View>
  );
}
