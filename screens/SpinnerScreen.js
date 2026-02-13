import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from '../components/Spinner';
import colors from '../helpers/colors';

export default function SpinnerScreen({
  showSpinner,
  closeSpinner,
  participants,
  onBackToList,
  onPlayThis,
}) {
  const [winner, setWinner] = useState(null);
  const [spinKey, setSpinKey] = useState(0);

  const handleSpinningEnd = (w) => {
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

  const slices = participants && participants.length > 0 ? participants : ['No games'];

  return (
    <Modal visible={showSpinner} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        {winner ? (
          <View style={styles.celebration}>
            <Text style={styles.celebrationTitle}>You're playing</Text>
            <Text style={styles.winnerValue}>{winner}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handlePlayThis}
              >
                <Text style={styles.primaryButtonText}>Play This</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleSpinAgain}
              >
                <Text style={styles.secondaryButtonText}>Spin Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textButton}
                onPress={handleBackToList}
              >
                <Text style={styles.textButtonText}>Back to List</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Spin the Wheel!</Text>
            <Spinner
              key={spinKey}
              slices={slices}
              onSpinningEnd={handleSpinningEnd}
            />
          </>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: colors.textMain,
    marginBottom: 16,
  },
  celebration: {
    alignItems: 'center',
  },
  celebrationTitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  winnerValue: {
    fontSize: 26,
    color: colors.tintMain,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonRow: {
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.tintMain,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: colors.tintMain,
  },
  textButton: {
    paddingVertical: 12,
  },
  textButtonText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
