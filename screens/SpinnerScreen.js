import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import Spinner from '../components/Spinner';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme';

export default function SpinnerScreen({
  showSpinner,
  closeSpinner,
  participants,
  onBackToList,
  onPlayThis,
  autoNavigate = false,
}) {
  const [winner, setWinner] = useState(null);
  const [spinKey, setSpinKey] = useState(0);
  const { tokens, styles } = useAppTheme();

  useEffect(() => {
    if (showSpinner) {
      setWinner(null);
      setSpinKey((k) => k + 1);
    }
  }, [showSpinner]);

  const handleSpinningEnd = (w) => {
    if (autoNavigate && onPlayThis && w) {
      onPlayThis(w);
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
    (onBackToList || closeSpinner)();
  };

  const handlePlayThis = () => {
    if (onPlayThis && winner) {
      onPlayThis(winner);
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
    <Modal visible={showSpinner} animationType="slide" transparent={true}>
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
                <AppText variant="textButton">
                  {copy.spinner.backToList}
                </AppText>
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
              colors={tokens.colors}
            />
          </>
        )}
      </View>
    </Modal>
  );
}
