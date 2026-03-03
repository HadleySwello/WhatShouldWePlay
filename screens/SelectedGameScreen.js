import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { Confetti } from '../components/ConfettiCelebration';
import { savePreset } from '../helpers/presetsStorage';
import colors from '../helpers/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 48, 320);

export default function SelectedGameScreen({ route, navigation }) {
  const game = route.params?.game;
  const filters = route.params?.filters;
  const filteredGames = route.params?.filteredGames;
  const playerCount = route.params?.playerCount ?? 2;

  const [showPresetInput, setShowPresetInput] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [presetSaved, setPresetSaved] = useState(false);

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
            {game?.categories?.length > 0 && (
              <Text style={styles.cardDetail}>
                {game.categories.join(' · ')}
              </Text>
            )}
            {game?.mechanics?.length > 0 && (
              <Text style={styles.cardDetail}>
                {game.mechanics.join(' · ')}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.primaryButtonText}>Start New Pick</Text>
        </TouchableOpacity>

        {canPickAgain && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate('Results', {
                filteredGames,
                playerCount,
                filters,
              })
            }
          >
            <Text style={styles.secondaryButtonText}>
              Pick Again (Same Filters)
            </Text>
          </TouchableOpacity>
        )}

        {filters && (
          <>
            {presetSaved ? (
              <Text style={styles.presetSavedText}>Preset saved!</Text>
            ) : showPresetInput ? (
              <View style={styles.presetInputRow}>
                <TextInput
                  style={styles.presetInput}
                  placeholder="Preset name"
                  placeholderTextColor={colors.textSecondary}
                  value={presetName}
                  onChangeText={setPresetName}
                  autoCapitalize="words"
                />
                <TouchableOpacity
                  style={styles.presetSaveButton}
                  onPress={() => {
                    const name = presetName.trim() || 'My Preset';
                    savePreset(name, filters).then(() => {
                      setPresetSaved(true);
                      setShowPresetInput(false);
                      setPresetName('');
                    });
                  }}
                >
                  <Text style={styles.presetSaveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.textButton}
                  onPress={() => {
                    setShowPresetInput(false);
                    setPresetName('');
                  }}
                >
                  <Text style={styles.textButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.tertiaryButton}
                onPress={() => setShowPresetInput(true)}
              >
                <Text style={styles.tertiaryButtonText}>Save Preset</Text>
              </TouchableOpacity>
            )}
          </>
        )}
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
  tertiaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 12,
  },
  tertiaryButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  presetInputRow: {
    alignSelf: 'stretch',
    marginTop: 16,
  },
  presetInput: {
    backgroundColor: colors.cardMain,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: colors.textMain,
    marginBottom: 12,
  },
  presetSaveButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  presetSaveButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  presetSavedText: {
    fontSize: 16,
    color: colors.tintMain,
    marginTop: 16,
  },
  textButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  textButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
