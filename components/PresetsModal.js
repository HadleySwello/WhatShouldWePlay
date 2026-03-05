import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import AppText from './AppText';
import copy, { t } from '../constants/copy';
import { formatComplexitySummary } from '../helpers/complexity';
import { useAppTheme } from '../theme';

const LENGTH_LABELS = {
  null: copy.lengthLabels.any,
  'under 30 min': copy.lengthLabels.under30min,
  'under 1 hour': copy.lengthLabels.under1hour,
  'under 2 hours': copy.lengthLabels.under2hours,
  long: copy.lengthLabels.long,
};

function formatPresetMetadata(filters) {
  const f = filters || {};
  const parts = [];
  parts.push(t(copy.presetMetadata.players, { count: f.playerCount ?? 2 }));
  parts.push(
    t(copy.presetMetadata.complexityLabel, {
      value: formatComplexitySummary(f.complexityMin, f.complexityMax),
    })
  );
  parts.push(LENGTH_LABELS[f.maxLength] ?? LENGTH_LABELS.null);
  const mechs = f.selectedMechanics ?? [];
  const cats = f.selectedCategories ?? [];
  if (mechs.length > 0) parts.push(mechs.join(', '));
  if (cats.length > 0) parts.push(cats.join(', '));
  return parts.join(' · ');
}

export default function PresetsModal({
  visible,
  onClose,
  quickPresets,
  savedPresets,
  onSelectPreset,
  onDeletePreset,
}) {
  const { styles, tokens } = useAppTheme();
  const m = styles.modal;

  const handleSelect = (preset) => {
    onSelectPreset(preset);
    onClose();
  };

  const handleDelete = (preset, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    Alert.alert(
      copy.modals.presets.deleteConfirmTitle,
      preset.name,
      [
        { text: copy.modals.presets.deleteConfirmCancel, style: 'cancel' },
        {
          text: copy.modals.presets.deleteConfirmDelete,
          style: 'destructive',
          onPress: () => onDeletePreset && onDeletePreset(preset),
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={m.overlay}>
        <View style={m.content}>
          <View style={m.header}>
            <View style={m.headerTop}>
              <AppText variant="modalTitle">{copy.modals.presets.title}</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">{copy.modals.presets.close}</AppText>
              </TouchableOpacity>
            </View>
            <AppText variant="headerNote">
              {copy.modals.presets.headerNote}
            </AppText>
          </View>

          <ScrollView
            style={m.scroll}
            contentContainerStyle={m.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {savedPresets.length > 0 && (
              <>
                <AppText variant="modalSectionTitle">{copy.modals.presets.myPresets}</AppText>
                {savedPresets.map((p) => (
                  <View key={p.id} style={m.presetCard}>
                    <TouchableOpacity
                      style={styles.presetCardRow}
                      onPress={() => handleSelect(p)}
                      activeOpacity={0.7}
                    >
                      <AppText variant="presetName">{p.name}</AppText>
                      <AppText variant="presetMetadata">
                        {formatPresetMetadata(p.filters)}
                      </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.presetDeleteIconAbsolute}
                      onPress={(e) => handleDelete(p, e)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Icon
                        name="delete-outline"
                        size={24}
                        color={tokens.colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

            <AppText
              variant="modalSectionTitle"
              style={savedPresets.length > 0 ? m.savedSectionTitle : undefined}
            >
              {copy.modals.presets.quickPresets}
            </AppText>
            {quickPresets.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={m.presetCard}
                onPress={() => handleSelect(p)}
                activeOpacity={0.7}
              >
                <AppText variant="presetName">{p.name}</AppText>
                {p.description ? (
                  <AppText variant="presetDescription">{p.description}</AppText>
                ) : null}
                <AppText variant="presetMetadata">
                  {formatPresetMetadata(p.filters)}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
