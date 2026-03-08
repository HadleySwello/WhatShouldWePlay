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

  // Organised variant definitions for better maintainability
  const variantStyles = {
    // --- Typography & Headers ---
    header: {
      fontSize: t.sizes.xl + 4,
      fontFamily: t.families.header,
      color: c.textMain,
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: t.sizes['5xl'] || 38,
      fontFamily: t.families.header,
      fontWeight: t.weights.bold,
      color: c.textMain,
      textAlign: 'center',
      lineHeight: (t.sizes['5xl'] || 38) * 1.1,
    },
    title: {
      fontSize: t.sizes['3xl'],
      fontFamily: t.families.header,
      color: c.textMain,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: t.sizes.lg,
      fontFamily: t.families.subheader,
      color: c.textSecondary,
      textAlign: 'center',
    },
    body: {
      fontSize: t.sizes.md,
      fontFamily: t.families.body,
      color: c.textSecondary,
      textAlign: 'center',
    },
    label: styles.label || {
      fontSize: t.sizes.lg,
      fontFamily: t.families.bodyBold,
      color: c.textMain,
    },
    helper: styles.helper || {
      fontSize: t.sizes.md - 1,
      fontFamily: t.families.body,
      color: c.textSecondary,
    },
    sectionTitle: styles.sectionTitle,
    footer: styles.footerText,

    // --- Interactive & States ---
    buttonPrimary: styles.button?.primaryText,
    buttonSecondary: styles.button?.secondaryText,
    textButton: styles.textButtonText,
    useRitualButton: styles.useRitualButtonText,
    saveRitualButtonText: styles.saveRitualButtonText,
    retry: styles.retryButtonText || {
      color: c.tintMain,
      fontSize: t.sizes.md,
    },
    error: {
      fontSize: t.sizes.md - 1,
      fontFamily: t.families.body,
      color: c.textSecondary,
      textAlign: 'center',
    },

    // --- Component Specific ---
    chipDefault: styles.chip?.defaultText,
    chipSelected: styles.chip?.selectedText,
    gameName: styles.listItem?.gameName,
    gameDetails: styles.listItem?.gameDetails,
    voteSymbol: styles.voteSymbol,
    voteCount: styles.voteCount,
    stepperSymbol: { fontSize: 28, color: c.textMain },
    stepperValue: {
      fontSize: t.sizes['5xl'],
      color: c.textMain,
      marginHorizontal: s['2xl'],
      minWidth: s['3xl'],
      textAlign: 'center',
    },

    // --- Card Variations ---
    gameCardName: styles.gameCard?.name,
    gameCardStat: styles.gameCard?.statText,
    gameCardLabel: styles.gameCard?.label,
    gameCardValue: styles.gameCard?.value,
    gameCardComplexity: styles.gameCard?.complexityText,
    gameCardComplexityLabel: styles.gameCard?.complexityLabel,
    gameCardSectionTitle: styles.gameCard?.sectionTitle,
    gameCardTag: styles.gameCard?.tagText,
    gameCardDescription: styles.gameCard?.description,
    cardName: styles.cardName,
    cardDetail: styles.cardDetail,

    // --- Modal Styles ---
    modalTitle: styles.modal?.title,
    closeButtonText: styles.modal?.closeButtonText,
    headerNote: styles.modal?.headerNote,
    modalSectionTitle: styles.modal?.sectionTitle,
    ritualName: styles.modal?.ritualName,
    ritualDescription: styles.modal?.ritualDescription,
    ritualMetadata: styles.modal?.ritualMetadata,

    // --- Specific Screen Styles ---
    noMatchesTitle: styles.noMatchesTitle,
    noMatchesBody: styles.noMatchesBody,
    matchCount: styles.matchCount,
    collapsibleLabel: styles.collapsibleLabel,
    collapsibleSummary: styles.collapsibleSummary,
    complexitySliderLabel: styles.complexitySliderLabel,
    advancedFiltersLabel: styles.advancedFiltersLabel,
    voteHint: styles.voteHint,
    allVotesAssigned: styles.allVotesAssigned,
    ritualSavedText: styles.ritualSavedText,
    ritualCancelText: styles.ritualCancelText,
    celebrationTitle: styles.celebrationTitle,
    winnerValue: styles.winnerValue,
    spinnerTitle: styles.spinnerTitle,
    spinnerWinnerText: styles.spinnerWinnerText,
    ritualHeaderTitle: styles.ritualHeaderTitle,
    ritualSaveControlText: styles.ritualSaveControlText,

    // --- Empty States ---
    emptyTitle: styles.emptyTitle || {
      fontSize: t.sizes['2xl'],
      color: c.textMain,
      textAlign: 'center',
    },
    emptyBody: styles.emptyBody || {
      fontSize: t.sizes.md,
      color: c.textSecondary,
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
