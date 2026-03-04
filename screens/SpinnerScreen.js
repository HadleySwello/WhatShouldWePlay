import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import Spinner from '../components/Spinner';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
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
    participants && participants.length > 0 ? participants : ['No games'];

  const showCelebration = winner && !autoNavigate;

  return (
    <Modal visible={showSpinner} animationType="slide" transparent={true}>
      <View style={styles.spinnerModal}>
        {showCelebration ? (
          <View style={styles.celebration}>
            <AppText variant="celebrationTitle">You're playing</AppText>
            <AppText variant="winnerValue">{winner}</AppText>
            <View style={styles.buttonRow}>
              <AppButton
                variant="primary"
                onPress={handlePlayThis}
                style={styles.button.primaryCompact}
              >
                Play This
              </AppButton>
              <AppButton
                variant="secondary"
                onPress={handleSpinAgain}
                style={layout.marginBottomMd}
              >
                Spin Again
              </AppButton>
              <TouchableOpacity
                style={styles.textButton}
                onPress={handleBackToList}
              >
                <AppText variant="textButton">Back to List</AppText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <AppText variant="spinnerTitle">Spin the Wheel!</AppText>
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
