import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import AppInput from './AppInput';
import copy, { t } from '../constants/copy';
import { useAppTheme } from '../theme';
import { layout } from '../theme/layout';
import {
  findPresetByName,
  getPresets,
  MAX_PRESETS,
  MAX_PRESET_NAME_LENGTH,
  normalizePresetName,
  QUICK_PRESET_NAMES,
} from '../helpers/presetsStorage';

export default function PresetNameModal({
  visible,
  onClose,
  onSave,
  excludeId,
  checkPresetCount = false,
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
    const finalName = normalizePresetName(name);
    setError(null);
    setWarning(null);

    if (!finalName) {
      setError(copy.modals.presetName.errorRequired);
      return;
    }
    if (finalName.length > MAX_PRESET_NAME_LENGTH) {
      setError(
        t(copy.modals.presetName.errorTooLong, { max: MAX_PRESET_NAME_LENGTH })
      );
      return;
    }
    if (checkPresetCount) {
      getPresets().then((presets) => {
        if (presets.length >= MAX_PRESETS) {
          setError(
            t(copy.modals.presetName.errorMaxPresets, { max: MAX_PRESETS })
          );
          return;
        }
        trySubmit(finalName);
      });
    } else {
      trySubmit(finalName);
    }
  };

  function trySubmit(finalName) {
    const matchedQuickPreset = QUICK_PRESET_NAMES.find(
      (q) => q.trim().toLowerCase() === finalName.trim().toLowerCase()
    );
    if (matchedQuickPreset) {
      const transformedName = 'My ' + matchedQuickPreset;
      setName(transformedName);
      setWarning(
        t(copy.modals.presetName.warningMatchesBuiltIn, { name: transformedName })
      );
      return;
    }
    findPresetByName(finalName, { excludeId }).then((existing) => {
      if (existing) {
        setError(copy.modals.presetName.errorExists);
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
        <View style={[m.content, styles.presetNameModalContent]}>
          <View style={m.header}>
            <View style={m.headerTop}>
              <AppText variant="modalTitle">{copy.modals.presetName.title}</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">{copy.modals.presetName.cancel}</AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.presetNameModalBody}>
            <AppText variant="helper" style={styles.presetNameRules}>
              {copy.modals.presetName.rules}
            </AppText>
            <View style={styles.presetInputRow}
            >
              <AppInput
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (error) setError(null);
                  if (warning) setWarning(null);
                }}
                placeholder={copy.modals.presetName.placeholder}
                autoFocus
                autoCapitalize="words"
                maxLength={100}
                style={[styles.presetInput, layout.flex1]}
              />
              <TouchableOpacity
                style={styles.presetSaveButton}
                onPress={handleSave}
              >
                <AppText variant="buttonPrimary">{copy.modals.presetName.save}</AppText>
              </TouchableOpacity>
            </View>
            {error ? (
              <AppText
                variant="helper"
                style={[layout.marginTopMd, styles.presetNameError]}
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
