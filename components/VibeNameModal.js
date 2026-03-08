import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import AppInput from './AppInput';
import copy, { t } from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme/layout';
import {
  findVibeByName,
  getVibes,
  MAX_VIBES,
  MAX_VIBE_NAME_LENGTH,
  normalizeVibeName,
  QUICK_VIBE_NAMES,
} from '../helpers/vibesStorage';

export default function VibeNameModal({
  visible,
  onClose,
  onSave,
  excludeId,
  checkVibeCount = false,
}) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const { styles, tokens } = useAppTheme();
  const m = styles.modal;

  useEffect(() => {
    if (visible) {
      setName('');
      setError(null);
      setWarning(null);
    }
  }, [visible]);

  const handleSave = () => {
    const finalName = normalizeVibeName(name);
    setError(null);
    setWarning(null);

    if (!finalName) {
      setError(copy.modals.vibeName.errorRequired);
      return;
    }
    if (finalName.length > MAX_VIBE_NAME_LENGTH) {
      setError(
        t(copy.modals.vibeName.errorTooLong, { max: MAX_VIBE_NAME_LENGTH })
      );
      return;
    }
    if (checkVibeCount) {
      getVibes().then((vibes) => {
        if (vibes.length >= MAX_VIBES) {
          setError(
            t(copy.modals.vibeName.errorMaxVibes, { max: MAX_VIBES })
          );
          return;
        }
        trySubmit(finalName);
      });
      return;
    }
    trySubmit(finalName);
  };

  function trySubmit(finalName) {
    const matchedQuickVibe = QUICK_VIBE_NAMES.find(
      (q) => q.trim().toLowerCase() === finalName.trim().toLowerCase()
    );
    if (matchedQuickVibe) {
      const transformedName = 'My ' + matchedQuickVibe;
      setName(transformedName);
      setWarning(
        t(copy.modals.vibeName.warningMatchesBuiltIn, {
          name: transformedName,
        })
      );
      return;
    }
    findVibeByName(finalName, { excludeId }).then((existing) => {
      if (existing) {
        setError(copy.modals.vibeName.errorExists);
        return;
      }
      onSave(finalName);
      onClose();
    });
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={m.overlay}>
        <View style={[m.content, styles.vibeNameModalContent]}>
          <View style={m.header}>
            <View style={m.headerTop}>
              <AppText variant="modalTitle">
                {copy.modals.vibeName.title}
              </AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">
                  {copy.modals.vibeName.cancel}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.vibeNameModalBody}>
            <AppText variant="helper" style={styles.vibeNameRules}>
              {copy.modals.vibeName.rules}
            </AppText>
            <View style={styles.vibeInputRow}>
              <AppInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (error) setError(null);
                  if (warning) setWarning(null);
                }}
                placeholder={copy.modals.vibeName.placeholder}
                autoFocus
                autoCapitalize="words"
                maxLength={100}
                style={[styles.vibeInput, layout.flex1]}
              />
              <TouchableOpacity
                style={styles.vibeSaveButton}
                onPress={handleSave}
              >
                <AppText variant="buttonPrimary">
                  {copy.modals.vibeName.save}
                </AppText>
              </TouchableOpacity>
            </View>
            {error ? (
              <AppText
                variant="helper"
                style={[layout.marginTopMd, styles.vibeNameError]}
              >
                {error}
              </AppText>
            ) : null}
            {warning && !error ? (
              <AppText
                variant="helper"
                style={[
                  layout.marginTopMd,
                  { color: tokens.colors.textSecondary },
                ]}
              >
                {warning}
              </AppText>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
