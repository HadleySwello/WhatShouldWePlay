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
import { useAppTheme } from '../theme';

const LENGTH_LABELS = {
  null: 'Any length',
  'under 30 min': '≤30m',
  'under 1 hour': '≤1h',
  'under 2 hours': '≤2h',
  long: '3h+',
};

function formatComplexity(maxStars) {
  if (maxStars == null || maxStars >= 6) return 'Any complexity';
  if (maxStars <= 2) return 'Light';
  if (maxStars <= 4) return 'Medium';
  return 'Heavy';
}

function formatPresetMetadata(filters) {
  const f = filters || {};
  const parts = [];
  parts.push(`${f.playerCount ?? 2} players`);
  parts.push(formatComplexity(f.maxComplexityStars));
  parts.push(LENGTH_LABELS[f.maxLength] ?? LENGTH_LABELS.null);
  const mechs = f.selectedMechanics ?? [];
  const cats = f.selectedCategories ?? [];
  if (mechs.length === 1) parts.push(mechs[0]);
  else if (mechs.length > 1) parts.push(`${mechs.length} mechanics`);
  if (cats.length === 1) parts.push(cats[0]);
  else if (cats.length > 1) parts.push(`${cats.length} categories`);
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
      'Delete preset?',
      preset.name,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
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
              <AppText variant="modalTitle">Choose a Preset</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">Close</AppText>
              </TouchableOpacity>
            </View>
            <AppText variant="headerNote">
              You can save your own presets from the game list after filtering.
            </AppText>
          </View>

          <ScrollView
            style={m.scroll}
            contentContainerStyle={m.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {savedPresets.length > 0 && (
              <>
                <AppText variant="modalSectionTitle">My Presets</AppText>
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
              Quick Presets
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
