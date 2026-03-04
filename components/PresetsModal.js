import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../helpers/colors';

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
}) {
  const handleSelect = (preset) => {
    onSelectPreset(preset);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>Choose a Preset</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headerNote}>
              You can save your own presets from the game list after filtering.
            </Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {savedPresets.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>My Presets</Text>
                {savedPresets.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.presetCard}
                    onPress={() => handleSelect(p)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.presetName}>{p.name}</Text>
                    <Text style={styles.presetMetadata}>
                      {formatPresetMetadata(p.filters)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            <Text
              style={[
                styles.sectionTitle,
                savedPresets.length > 0 && styles.savedSectionTitle,
              ]}
            >
              Quick Presets
            </Text>
            {quickPresets.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.presetCard}
                onPress={() => handleSelect(p)}
                activeOpacity={0.7}
              >
                <Text style={styles.presetName}>{p.name}</Text>
                {p.description ? (
                  <Text style={styles.presetDescription}>{p.description}</Text>
                ) : null}
                <Text style={styles.presetMetadata}>
                  {formatPresetMetadata(p.filters)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.backgroundMain,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardMain,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerNote: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 12,
    lineHeight: 20,
  },
  title: {
    fontSize: 22,
    color: colors.textMain,
    fontWeight: '600',
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.tintMain,
  },
  scroll: {
    maxHeight: 400,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  savedSectionTitle: {
    marginTop: 24,
  },
  presetCard: {
    backgroundColor: colors.cardSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  presetName: {
    fontSize: 18,
    color: colors.textMain,
    fontWeight: '600',
    marginBottom: 4,
  },
  presetDescription: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  presetMetadata: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
