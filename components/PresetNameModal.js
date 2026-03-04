import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import AppInput from './AppInput';
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

const PRESET_NAME_RULES =
  'Required. Max 64 characters. Multiple spaces are collapsed. Newlines and control characters are removed.';

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
      setError('Please enter a preset name.');
      return;
    }
    if (finalName.length > MAX_PRESET_NAME_LENGTH) {
      setError(
        `Preset name must be ${MAX_PRESET_NAME_LENGTH} characters or less.`
      );
      return;
    }
    if (checkPresetCount) {
      getPresets().then((presets) => {
        if (presets.length >= MAX_PRESETS) {
          setError(
            `Maximum number of presets (${MAX_PRESETS}) reached. Delete one to save a new preset.`
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
        `Name matches built-in preset. Will save as "${transformedName}".`
      );
      return;
    }
    findPresetByName(finalName, { excludeId }).then((existing) => {
      if (existing) {
        setError('Preset name already exists.');
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
              <AppText variant="modalTitle">Preset name</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">Cancel</AppText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.presetNameModalBody}>
            <AppText variant="helper" style={styles.presetNameRules}>
              {PRESET_NAME_RULES}
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
                placeholder="e.g. 2-Player Night"
                autoFocus
                autoCapitalize="words"
                maxLength={100}
                style={[styles.presetInput, layout.flex1]}
              />
              <TouchableOpacity
                style={styles.presetSaveButton}
                onPress={handleSave}
              >
                <AppText variant="buttonPrimary">Save</AppText>
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
