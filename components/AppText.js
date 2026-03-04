import React from 'react';
import { Text as RNText } from 'react-native';
import { useAppTheme } from '../theme';

export default function AppText({
  variant = 'body',
  style,
  children,
  ...rest
}) {
  const { tokens, styles } = useAppTheme();
  const c = tokens.colors;
  const t = tokens.typography;
  const s = tokens.spacing;

  const variantStyles = {
    footer: styles.footerText,
    header: {
      fontSize: t.sizes.xl + 4,
      color: c.textMain,
      textAlign: 'center',
    },
    title: {
      fontSize: t.sizes['3xl'],
      color: c.textMain,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: t.sizes.lg,
      color: c.textSecondary,
      textAlign: 'center',
    },
    body: {
      fontSize: t.sizes.md,
      color: c.textSecondary,
      textAlign: 'center',
    },
    label: {
      fontSize: t.sizes.lg,
      color: c.textMain,
    },
    helper: {
      fontSize: t.sizes.md - 1,
      color: c.textSecondary,
    },
    buttonPrimary: styles.button.primaryText,
    buttonSecondary: styles.button.secondaryText,
    chipDefault: styles.chip.defaultText,
    chipSelected: styles.chip.selectedText,
    gameName: styles.listItem.gameName,
    gameDetails: styles.listItem.gameDetails,
    sectionTitle: {
      fontSize: t.sizes.lg,
      color: c.textMain,
      fontWeight: t.weights.semibold,
    },
    error: {
      fontSize: t.sizes.md - 1,
      color: c.textSecondary,
      textAlign: 'center',
    },
    retry: {
      color: c.tintMain,
      fontSize: t.sizes.md,
    },
    emptyTitle: {
      fontSize: t.sizes['2xl'],
      color: c.textMain,
      textAlign: 'center',
    },
    emptyBody: {
      fontSize: t.sizes.md,
      color: c.textSecondary,
      textAlign: 'center',
    },
    stepperSymbol: { fontSize: 28, color: c.textMain },
    usePresetButton: styles.usePresetButtonText,
    noMatchesTitle: styles.noMatchesTitle,
    noMatchesBody: styles.noMatchesBody,
    collapsibleLabel: styles.collapsibleLabel,
    collapsibleSummary: styles.collapsibleSummary,
    complexitySliderLabel: styles.complexitySliderLabel,
    advancedFiltersLabel: styles.advancedFiltersLabel,
    sectionTitle: styles.sectionTitle,
    voteHint: styles.voteHint,
    allVotesAssigned: styles.allVotesAssigned,
    presetSavedText: styles.presetSavedText,
    presetCancelText: styles.presetCancelText,
    savePresetButtonText: styles.savePresetButtonText,
    voteSymbol: styles.voteSymbol,
    voteCount: styles.voteCount,
    cardName: styles.cardName,
    cardDetail: styles.cardDetail,
    celebrationTitle: styles.celebrationTitle,
    winnerValue: styles.winnerValue,
    textButton: styles.textButtonText,
    spinnerTitle: styles.spinnerTitle,
    modalTitle: styles.modal?.title,
    closeButtonText: styles.modal?.closeButtonText,
    headerNote: styles.modal?.headerNote,
    modalSectionTitle: styles.modal?.sectionTitle,
    presetName: styles.modal?.presetName,
    presetDescription: styles.modal?.presetDescription,
    presetMetadata: styles.modal?.presetMetadata,
    presetHeaderTitle: styles.presetHeaderTitle,
    presetSaveControlText: styles.presetSaveControlText,
    cardName: styles.cardName || { fontSize: t.sizes['2xl'], color: c.textMain },
    cardDetail: styles.cardDetail || { fontSize: t.sizes.md, color: c.textSecondary },
    stepperValue: {
      fontSize: t.sizes['5xl'],
      color: c.textMain,
      marginHorizontal: s['2xl'],
      minWidth: s['3xl'],
      textAlign: 'center',
    },
  };

  const baseStyle = variantStyles[variant] || variantStyles.body;
  return (
    <RNText style={[baseStyle, style]} {...rest}>
      {children}
    </RNText>
  );
}
