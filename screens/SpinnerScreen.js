import { Button, StyleSheet, Text, View, Modal } from 'react-native';

import colors from '../helpers/colors';
import Spinner from '../components/Spinner';

export default function SpinnerScreen({showSpinner, closeSpinner, winner, participants}) {
  const handleWinner = (winner) => {
    console.log('The winner is:', winner);
  };

  const slices = [
    { text: 'Wingspan', color: '#FFD700' },
    { text: 'King of Tokyo', color: '#3E1F47' },
    { text: 'Ascension', color: '#144552' },
    { text: 'Sparkle Kitty', color: '#4D194D' },
  ];
  

  return (
    <Modal visible={showSpinner} animationType="slide" transparent={true}>
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Spin the Wheel!</Text>

      <Spinner slices={participants} onSpinningEnd={handleWinner} />

      <Button title="Close" onPress={closeSpinner} color={colors.tintMain} />
      {winner && (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>Winner:</Text>
          <Text style={styles.winnerValue}>{winner}</Text>
        </View>
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
    winnerContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    winnerText: {
      fontSize: 18,
      color: colors.textMain,
    },
    winnerValue: {
      fontSize: 20,
      color: colors.tintMain,
      fontWeight: 'bold',
    },
});