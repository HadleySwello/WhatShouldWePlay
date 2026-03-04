import React, { useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Confetti } from '../components/ConfettiCelebration';
import { clearVoteCache } from '../helpers/voteCache';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SelectedGameScreen({ route, navigation }) {
  const game = route.params?.game;
  const filters = route.params?.filters;
  const filteredGames = route.params?.filteredGames;
  const playerCount = route.params?.playerCount ?? 2;
  const { styles } = useAppTheme();

  const canPickAgain = filters && filteredGames && filteredGames.length > 0;

  useEffect(() => {
    navigation.setOptions({ gestureEnabled: false });
    const t = setTimeout(() => {
      navigation.setOptions({ gestureEnabled: true });
    }, 5000);
    return () => clearTimeout(t);
  }, [navigation]);

  const displayComplexity =
    game?.complexityWeight != null
      ? game.complexityWeight.toFixed(1)
      : (game?.complexity ?? '—');

  return (
    <View style={styles.screen.container}>
      <View style={styles.confettiLayer} pointerEvents="none">
        <Confetti
          count={200}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fallDuration={12000}
        />
      </View>

      <View style={styles.selectedGameContent}>
        <AppText variant="title" style={layout.marginBottomXl}>
          You're playing
        </AppText>

        <View style={styles.selectedGameCard}>
          {game?.thumbnail ? (
            <Image
              source={{ uri: game.thumbnail }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.cardImage, styles.cardImagePlaceholder]} />
          )}
          <View style={styles.cardBody}>
            <AppText variant="cardName" numberOfLines={2} style={[layout.textCenter, layout.marginBottomMd]}>
              {game?.name ?? 'Selected game'}
            </AppText>
            <AppText variant="cardDetail" style={layout.textCenter}>{game?.yearPublished ?? '—'}</AppText>
            <AppText variant="cardDetail" style={layout.textCenter}>
              {game?.playersMin != null && game?.playersMax != null
                ? `${game.playersMin}–${game.playersMax} players`
                : '—'}
            </AppText>
            <AppText variant="cardDetail" style={layout.textCenter}>{game?.length ?? '—'}</AppText>
            <AppText variant="cardDetail" style={layout.textCenter}>
              Complexity: {displayComplexity}
            </AppText>
            {game?.categories?.length > 0 && (
              <AppText variant="cardDetail" style={layout.textCenter}>
                {game.categories.join(' · ')}
              </AppText>
            )}
            {game?.mechanics?.length > 0 && (
              <AppText variant="cardDetail" style={layout.textCenter}>
                {game.mechanics.join(' · ')}
              </AppText>
            )}
          </View>
        </View>

        <AppButton
          variant="primary"
          onPress={() => {
            clearVoteCache();
            navigation.navigate('Home');
          }}
          style={layout.stretch}
        >
          Start New Pick
        </AppButton>

        {canPickAgain && (
          <AppButton
            variant="secondary"
            onPress={() =>
              navigation.navigate('Results', {
                filteredGames,
                playerCount,
                filters,
              })
            }
          >
            Pick Again (Same Filters)
          </AppButton>
        )}
      </View>
    </View>
  );
}
