import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import copy from '../constants/copy';
import { useAppTheme } from '../theme';

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
              <AppText variant="modalTitle">{copy.modals.votingMode.title}</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">{copy.modals.votingMode.close}</AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.votingModeInfoModalBody}>
            <AppText variant="helper" style={styles.votingModeInfoText}>
              {copy.modals.votingMode.body}
            </AppText>
          </View>
        </View>
      </View>
    </Modal>
  );
}
