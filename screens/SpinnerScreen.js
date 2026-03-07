import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Spinner from '../components/Spinner';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function SpinnerScreen({ route, navigation }) {
  const {
    participants = [],
    filteredGames = [],
    filters,
    playerCount,
    autoNavigate = false,
  } = route.params || {};

  const [winner, setWinner] = useState(null);
  const [spinKey, setSpinKey] = useState(0);
  const { styles } = useAppTheme();

  const navigateToSelectedGame = (winnerName) => {
    const game = filteredGames.find((g) => g.name === winnerName);
    navigation.replace('SelectedGame', {
      game: game ?? null,
      filters,
      filteredGames,
      playerCount,
    });
  };

  const handleSpinningEnd = (w) => {
    if (autoNavigate && w) {
      navigateToSelectedGame(w);
      return;
    }
    setWinner(w);
  };

  const handleSpinAgain = () => {
    setWinner(null);
    setSpinKey((k) => k + 1);
  };

  const handleBackToList = () => {
    setWinner(null);
    navigation.goBack();
  };

  const handlePlayThis = () => {
    if (winner) {
      navigateToSelectedGame(winner);
    } else {
      handleBackToList();
    }
  };

  const slices =
    participants && participants.length > 0
      ? participants
      : [copy.spinner.noGames];

  const showCelebration = winner && !autoNavigate;

  return (
    <View style={styles.spinnerModal}>
      {showCelebration ? (
        <View style={styles.celebration}>
          <AppText variant="celebrationTitle">
            {copy.spinner.celebrationTitle}
          </AppText>
          <AppText variant="winnerValue">{winner}</AppText>
          <View style={styles.buttonRow}>
            <AppButton variant="primaryCompact" onPress={handlePlayThis}>
              {copy.spinner.ctaPlay}
            </AppButton>
            <AppButton
              variant="secondary"
              onPress={handleSpinAgain}
              style={layout.marginBottomMd}
            >
              {copy.spinner.ctaSpinAgain}
            </AppButton>
            <TouchableOpacity
              style={styles.textButton}
              onPress={handleBackToList}
            >
              <AppText variant="textButton">{copy.spinner.backToList}</AppText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <AppText variant="spinnerTitle">{copy.spinner.title}</AppText>
          <Spinner
            key={spinKey}
            slices={slices}
            onSpinningEnd={handleSpinningEnd}
          />
        </>
      )}
    </View>
  );
}
