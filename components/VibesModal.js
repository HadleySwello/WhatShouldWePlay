import React from 'react';
import { Modal, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
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

function formatVibeMetadata(filters) {
  const f = filters || {};
  const parts = [];
  parts.push(t(copy.vibeMetadata.players, { count: f.playerCount ?? 2 }));
  parts.push(
    t(copy.vibeMetadata.complexityLabel, {
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

export default function VibesModal({
  visible,
  onClose,
  quickVibes,
  savedVibes,
  onSelectVibe,
  onDeleteVibe,
}) {
  const { styles, tokens } = useAppTheme();
  const m = styles.modal;

  const handleSelect = (vibe) => {
    onSelectVibe(vibe);
    onClose();
  };

  const handleDelete = (vibe, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    Alert.alert(copy.modals.vibes.deleteConfirmTitle, vibe.name, [
      { text: copy.modals.vibes.deleteConfirmCancel, style: 'cancel' },
      {
        text: copy.modals.vibes.deleteConfirmDelete,
        style: 'destructive',
        onPress: () => onDeleteVibe && onDeleteVibe(vibe),
      },
    ]);
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
              <AppText variant="modalTitle">
                {copy.modals.vibes.title}
              </AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">
                  {copy.modals.vibes.close}
                </AppText>
              </TouchableOpacity>
            </View>
            <AppText variant="headerNote">
              {copy.modals.vibes.headerNote}
            </AppText>
          </View>

          <ScrollView
            style={m.scroll}
            contentContainerStyle={m.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {savedVibes.length > 0 && (
              <>
                <AppText variant="modalSectionTitle">
                  {copy.modals.vibes.myVibes}
                </AppText>
                {savedVibes.map((p) => (
                  <View key={p.id} style={m.vibeCard}>
                    <TouchableOpacity
                      style={styles.vibeCardRow}
                      onPress={() => handleSelect(p)}
                      activeOpacity={0.7}
                    >
                      <AppText variant="vibeName">{p.name}</AppText>
                      <AppText variant="vibeMetadata">
                        {formatVibeMetadata(p.filters)}
                      </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.vibeDeleteIconAbsolute}
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
              style={savedVibes.length > 0 ? m.savedSectionTitle : undefined}
            >
              {copy.modals.vibes.quickVibes}
            </AppText>
            {quickVibes.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={m.vibeCard}
                onPress={() => handleSelect(p)}
                activeOpacity={0.7}
              >
                <AppText variant="vibeName">{p.name}</AppText>
                {p.description ? (
                  <AppText variant="vibeDescription">{p.description}</AppText>
                ) : null}
                <AppText variant="vibeMetadata">
                  {formatVibeMetadata(p.filters)}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
