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

function formatRitualMetadata(filters) {
  const f = filters || {};
  const parts = [];
  parts.push(t(copy.ritualMetadata.players, { count: f.playerCount ?? 2 }));
  parts.push(
    t(copy.ritualMetadata.complexityLabel, {
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

export default function RitualsModal({
  visible,
  onClose,
  quickRituals,
  savedRituals,
  onSelectRitual,
  onDeleteRitual,
}) {
  const { styles, tokens } = useAppTheme();
  const m = styles.modal;

  const handleSelect = (ritual) => {
    onSelectRitual(ritual);
    onClose();
  };

  const handleDelete = (ritual, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    Alert.alert(
      copy.modals.rituals.deleteConfirmTitle,
      ritual.name,
      [
        { text: copy.modals.rituals.deleteConfirmCancel, style: 'cancel' },
        {
          text: copy.modals.rituals.deleteConfirmDelete,
          style: 'destructive',
          onPress: () => onDeleteRitual && onDeleteRitual(ritual),
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
              <AppText variant="modalTitle">{copy.modals.rituals.title}</AppText>
              <TouchableOpacity onPress={onClose} style={m.closeButton}>
                <AppText variant="closeButtonText">{copy.modals.rituals.close}</AppText>
              </TouchableOpacity>
            </View>
            <AppText variant="headerNote">
              {copy.modals.rituals.headerNote}
            </AppText>
          </View>

          <ScrollView
            style={m.scroll}
            contentContainerStyle={m.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {savedRituals.length > 0 && (
              <>
                <AppText variant="modalSectionTitle">{copy.modals.rituals.myRituals}</AppText>
                {savedRituals.map((p) => (
                  <View key={p.id} style={m.ritualCard}>
                    <TouchableOpacity
                      style={styles.ritualCardRow}
                      onPress={() => handleSelect(p)}
                      activeOpacity={0.7}
                    >
                      <AppText variant="ritualName">{p.name}</AppText>
                      <AppText variant="ritualMetadata">
                        {formatRitualMetadata(p.filters)}
                      </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.ritualDeleteIconAbsolute}
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
              style={savedRituals.length > 0 ? m.savedSectionTitle : undefined}
            >
              {copy.modals.rituals.quickRituals}
            </AppText>
            {quickRituals.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={m.ritualCard}
                onPress={() => handleSelect(p)}
                activeOpacity={0.7}
              >
                <AppText variant="ritualName">{p.name}</AppText>
                {p.description ? (
                  <AppText variant="ritualDescription">{p.description}</AppText>
                ) : null}
                <AppText variant="ritualMetadata">
                  {formatRitualMetadata(p.filters)}
                </AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
