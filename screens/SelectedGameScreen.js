import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Confetti } from '../components/ConfettiCelebration';
import colors from '../helpers/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 48, 320);

export default function SelectedGameScreen({ route, navigation }) {
  const game = route.params?.game;

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
      : game?.complexity ?? '—';

  return (
    <View style={styles.container}>
      <View style={styles.confettiLayer} pointerEvents="none">
        <Confetti
          count={200}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fallDuration={12000}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>You're playing</Text>

        <View style={styles.card}>
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
            <Text style={styles.cardName} numberOfLines={2}>
              {game?.name ?? 'Selected game'}
            </Text>
            <Text style={styles.cardDetail}>
              {game?.yearPublished ?? '—'}
            </Text>
            <Text style={styles.cardDetail}>
              {game?.playersMin != null && game?.playersMax != null
                ? `${game.playersMin}–${game.playersMax} players`
                : '—'}
            </Text>
            <Text style={styles.cardDetail}>
              {game?.length ?? '—'}
            </Text>
            <Text style={styles.cardDetail}>
              Complexity: {displayComplexity}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>Start Over</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Pick Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  confettiLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  content: {
    flex: 1,
    zIndex: 2,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.textMain,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.cardSecondary,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: colors.cardMain,
  },
  cardImagePlaceholder: {
    backgroundColor: colors.cardMain,
  },
  cardBody: {
    padding: 16,
  },
  cardName: {
    fontSize: 22,
    color: colors.textMain,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDetail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 20,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.tintMain,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  secondaryButtonText: {
    fontSize: 18,
    color: colors.tintMain,
  },
});
