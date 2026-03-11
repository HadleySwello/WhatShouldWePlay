import React from 'react';
import { Modal, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';

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
              <AppText variant="modalTitle">{copy.modals.vibes.title}</AppText>
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
                {savedVibes.map((p) => {
                  const f = p.filters || {};
                  const complexityLabel = formatComplexitySummary(
                    f.complexityMin,
                    f.complexityMax
                  );
                  const lengthLabel =
                    LENGTH_LABELS[f.maxLength] ?? LENGTH_LABELS.null;

                  return (
                    <TouchableOpacity
                      key={p.id}
                      style={styles.vibeCard}
                      onPress={() => handleSelect(p)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.vibeCardHeader}>
                        <AppText variant="vibeName">{p.name}</AppText>
                        <TouchableOpacity
                          style={styles.vibeDeleteIconAbsolute}
                          onPress={(e) => handleDelete(p, e)}
                          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                          <Icon
                            name="delete-outline"
                            size={22}
                            color={tokens.colors.textSecondary}
                          />
                        </TouchableOpacity>
                      </View>

                      {p.description ? (
                        <AppText variant="vibeDescription">
                          {p.description}
                        </AppText>
                      ) : null}

                      <View style={styles.vibeCardStatsRow}>
                        <View style={styles.vibeCardStatItem}>
                          <Feather
                            name="users"
                            size={14}
                            color={tokens.colors.textSecondary}
                          />
                          <AppText variant="vibeMetadata">
                            {t(copy.vibeMetadata.players, {
                              count: f.playerCount ?? 2,
                            })}
                          </AppText>
                        </View>
                        <View style={styles.vibeCardStatItem}>
                          <Feather
                            name="target"
                            size={14}
                            color={tokens.colors.textSecondary}
                          />
                          <AppText variant="vibeMetadata">
                            {complexityLabel}
                          </AppText>
                        </View>
                        <View style={styles.vibeCardStatItem}>
                          <Feather
                            name="clock"
                            size={14}
                            color={tokens.colors.textSecondary}
                          />
                          <AppText variant="vibeMetadata">
                            {lengthLabel}
                          </AppText>
                        </View>
                      </View>

                      {(f.selectedMechanics?.length > 0 ||
                        f.selectedCategories?.length > 0) && (
                        <View style={styles.vibeCardTags}>
                          {[
                            ...(f.selectedMechanics || []),
                            ...(f.selectedCategories || []),
                          ].map((tag, i) => (
                            <View key={i} style={styles.vibeCardTag}>
                              <AppText variant="gameCardTag">{tag}</AppText>
                            </View>
                          ))}
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </>
            )}

            <AppText
              variant="modalSectionTitle"
              style={savedVibes.length > 0 ? m.savedSectionTitle : undefined}
            >
              {copy.modals.vibes.quickVibes}
            </AppText>
            {quickVibes.map((p) => {
              const f = p.filters || {};
              const complexityLabel = formatComplexitySummary(
                f.complexityMin,
                f.complexityMax
              );
              const lengthLabel =
                LENGTH_LABELS[f.maxLength] ?? LENGTH_LABELS.null;

              return (
                <TouchableOpacity
                  key={p.id}
                  style={styles.vibeCard}
                  onPress={() => handleSelect(p)}
                  activeOpacity={0.8}
                >
                  <View style={styles.vibeCardHeader}>
                    <AppText variant="vibeName">{p.name}</AppText>
                  </View>

                  {p.description ? (
                    <AppText variant="vibeDescription">{p.description}</AppText>
                  ) : null}

                  <View style={styles.vibeCardStatsRow}>
                    <View style={styles.vibeCardStatItem}>
                      <Feather
                        name="users"
                        size={14}
                        color={tokens.colors.textSecondary}
                      />
                      <AppText variant="vibeMetadata">
                        {t(copy.vibeMetadata.players, {
                          count: f.playerCount ?? 2,
                        })}
                      </AppText>
                    </View>
                    <View style={styles.vibeCardStatItem}>
                      <Feather
                        name="target"
                        size={14}
                        color={tokens.colors.textSecondary}
                      />
                      <AppText variant="vibeMetadata">
                        {complexityLabel}
                      </AppText>
                    </View>
                    <View style={styles.vibeCardStatItem}>
                      <Feather
                        name="clock"
                        size={14}
                        color={tokens.colors.textSecondary}
                      />
                      <AppText variant="vibeMetadata">{lengthLabel}</AppText>
                    </View>
                  </View>

                  {(f.selectedMechanics?.length > 0 ||
                    f.selectedCategories?.length > 0) && (
                    <View style={styles.vibeCardTags}>
                      {[
                        ...(f.selectedMechanics || []),
                        ...(f.selectedCategories || []),
                      ].map((tag, i) => (
                        <View key={i} style={styles.vibeCardTag}>
                          <AppText variant="gameCardTag">{tag}</AppText>
                        </View>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
