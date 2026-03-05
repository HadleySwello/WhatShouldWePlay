import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import { useAppTheme } from '../theme';

const TOOLTIP_CONTENT = `Each player gets one vote.

Votes are added to the games you want to play.

When you spin the wheel, each vote becomes an extra slice of that game.

Example:
Catan — 2 votes
Monopoly — 1 vote
Hive — 1 vote

The spinner will contain:
Catan
Catan
Monopoly
Hive

Games with more votes are more likely to be chosen.`;

export default function VotingModeInfoModal({ visible, onClose }) {
  const { styles } = useAppTheme();
  const m = styles.modal;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={m.overlay}>
        <View style={[m.content, styles.votingModeInfoModalContent]}>
          <View style={m.header}>
            <View style={m.headerTop}>
              <AppText variant="modalTitle">Voting Mode</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">Close</AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.votingModeInfoModalBody}>
            <AppText variant="helper" style={styles.votingModeInfoText}>
              {TOOLTIP_CONTENT}
            </AppText>
          </View>
        </View>
      </View>
    </Modal>
  );
}
