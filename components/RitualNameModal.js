import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import AppInput from './AppInput';
import copy, { t } from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme/layout';
import {
  findRitualByName,
  getRituals,
  MAX_RITUALS,
  MAX_RITUAL_NAME_LENGTH,
  normalizeRitualName,
  QUICK_RITUAL_NAMES,
} from '../helpers/ritualsStorage';

export default function RitualNameModal({
  visible,
  onClose,
  onSave,
  excludeId,
  checkRitualCount = false,
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
    const finalName = normalizeRitualName(name);
    setError(null);
    setWarning(null);

    if (!finalName) {
      setError(copy.modals.ritualName.errorRequired);
      return;
    }
    if (finalName.length > MAX_RITUAL_NAME_LENGTH) {
      setError(
        t(copy.modals.ritualName.errorTooLong, { max: MAX_RITUAL_NAME_LENGTH })
      );
      return;
    }
    if (checkRitualCount) {
      getRituals().then((rituals) => {
        if (rituals.length >= MAX_RITUALS) {
          setError(
            t(copy.modals.ritualName.errorMaxRituals, { max: MAX_RITUALS })
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
    const matchedQuickRitual = QUICK_RITUAL_NAMES.find(
      (q) => q.trim().toLowerCase() === finalName.trim().toLowerCase()
    );
    if (matchedQuickRitual) {
      const transformedName = 'My ' + matchedQuickRitual;
      setName(transformedName);
      setWarning(
        t(copy.modals.ritualName.warningMatchesBuiltIn, {
          name: transformedName,
        })
      );
      return;
    }
    findRitualByName(finalName, { excludeId }).then((existing) => {
      if (existing) {
        setError(copy.modals.ritualName.errorExists);
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
        <View style={[m.content, styles.ritualNameModalContent]}>
          <View style={m.header}>
            <View style={m.headerTop}>
              <AppText variant="modalTitle">
                {copy.modals.ritualName.title}
              </AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">
                  {copy.modals.ritualName.cancel}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ritualNameModalBody}>
            <AppText variant="helper" style={styles.ritualNameRules}>
              {copy.modals.ritualName.rules}
            </AppText>
            <View style={styles.ritualInputRow}>
              <AppInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (error) setError(null);
                  if (warning) setWarning(null);
                }}
                placeholder={copy.modals.ritualName.placeholder}
                autoFocus
                autoCapitalize="words"
                maxLength={100}
                style={[styles.ritualInput, layout.flex1]}
              />
              <TouchableOpacity
                style={styles.ritualSaveButton}
                onPress={handleSave}
              >
                <AppText variant="buttonPrimary">
                  {copy.modals.ritualName.save}
                </AppText>
              </TouchableOpacity>
            </View>
            {error ? (
              <AppText
                variant="helper"
                style={[layout.marginTopMd, styles.ritualNameError]}
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
