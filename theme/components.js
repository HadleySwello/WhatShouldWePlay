import { StyleSheet } from 'react-native';
import { tokens } from './tokens';

const c = tokens.colors;
const s = tokens.spacing;
const r = tokens.radius;
const t = tokens.typography;
const e = tokens.elevation;

// Component variant definitions - used by App* components and useAppTheme
export function getComponentVariantStyles() {
  return StyleSheet.create({
    button: {
      primary: {
        backgroundColor: c.tintMain,
        paddingVertical: s.lg,
        paddingHorizontal: s['3xl'],
        borderRadius: r.md,
        alignItems: 'center',
        alignSelf: 'stretch',
        marginHorizontal: s.xl,
        marginBottom: s.lg,
      },
      primaryCompact: {
        backgroundColor: c.tintMain,
        paddingVertical: s.lg,
        borderRadius: r.md,
        alignItems: 'center',
      },
      primaryText: {
        fontSize: t.sizes.lg,
        color: c.backgroundMain,
        fontWeight: t.weights.semibold,
      },
      secondary: {
        paddingVertical: s.lg - 2,
        paddingHorizontal: s['2xl'] - 4,
        borderRadius: r.md,
        borderWidth: 1,
        borderColor: c.tintMain,
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: s.md,
      },
      secondaryText: {
        fontSize: t.sizes.md,
        color: c.tintMain,
      },
      tertiary: {
        paddingVertical: s.md,
      },
      tertiaryText: {
        fontSize: t.sizes.md,
        color: c.textSecondary,
      },
      disabled: {
        opacity: 0.5,
      },
    },
    card: {
      default: {
        backgroundColor: c.cardSecondary,
        borderRadius: r.md,
        overflow: 'hidden',
      },
      body: {
        padding: s.lg,
      },
    },
    input: {
      default: {
        backgroundColor: c.cardMain,
        borderRadius: r.md,
        padding: s.lg - 2,
        fontSize: t.sizes.md,
        color: c.textMain,
      },
    },
    chip: {
      default: {
        paddingVertical: s.md + 2,
        paddingHorizontal: s.lg - 2,
        borderRadius: r.xl,
        backgroundColor: c.cardMain,
      },
      selected: {
        backgroundColor: c.tintMain,
      },
      defaultText: {
        fontSize: t.sizes.md - 1,
        color: c.textMain,
      },
      selectedText: {
        color: c.backgroundMain,
      },
    },
    screen: {
      container: {
        flex: 1,
        backgroundColor: c.backgroundMain,
      },
    },
    listItem: {
      default: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: c.cardSecondary,
        borderRadius: r.md,
        padding: s.md + 2,
        marginBottom: s.sm,
      },
      thumbnail: {
        width: 48,
        height: 48,
        borderRadius: r.sm + 2,
        marginRight: s.md,
      },
      thumbnailPlaceholder: {
        backgroundColor: c.cardMain,
      },
      gameName: {
        fontSize: t.sizes.lg,
        color: c.textMain,
      },
      gameDetails: {
        fontSize: t.sizes.sm,
        color: c.textSecondary,
        marginTop: 2,
      },
    },
    stepper: {
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: s.xl,
      },
      button: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: c.cardMain,
        justifyContent: 'center',
        alignItems: 'center',
      },
      symbol: {
        fontSize: 28,
        color: c.textMain,
      },
      value: {
        fontSize: 38,
        color: c.textMain,
        marginHorizontal: s['2xl'],
        minWidth: 48,
        textAlign: 'center',
      },
    },
    noMatchesCard: {
      backgroundColor: c.cardSecondary,
      borderRadius: r.md,
      padding: s.lg,
      marginBottom: s.xl,
      borderLeftWidth: 4,
      borderLeftColor: c.tintMain,
    },
    noMatchesTitle: {
      fontSize: t.sizes.lg,
      color: c.textMain,
      fontWeight: t.weights.semibold,
      marginBottom: s.sm,
    },
    noMatchesBody: {
      fontSize: t.sizes.md - 1,
      color: c.textSecondary,
    },
    matchCount: {
      fontSize: t.sizes.md,
      color: c.tintMain,
      marginBottom: s.lg,
    },
    chipWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: s.sm,
      marginBottom: s.xl - 4,
    },
    stickyButtonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingHorizontal: s.xl,
      paddingTop: s.lg,
      paddingBottom: s['2xl'],
      backgroundColor: c.backgroundMain,
      borderTopWidth: 1,
      borderTopColor: c.cardMain,
      shadowColor: c.shadow,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: e.high,
    },
    stickyPresetSection: {
      marginTop: s.md,
      alignItems: 'center',
    },
    stickyPresetAction: {
      paddingVertical: s.sm,
      paddingHorizontal: s.lg,
    },
    usePresetButton: {
      paddingVertical: s.lg - 2,
      paddingHorizontal: s.xl - 4,
      borderRadius: r.md,
      borderWidth: 2,
      borderColor: c.tintMain,
      alignSelf: 'center',
      marginBottom: s.xl,
    },
    usePresetButtonText: {
      fontSize: t.sizes.md,
      color: c.tintMain,
      fontWeight: t.weights.semibold,
    },
    presetHeaderRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: s.lg,
      gap: s.sm,
    },
    presetHeaderTitle: {
      fontSize: t.sizes.lg,
      color: c.textMain,
      fontWeight: t.weights.semibold,
    },
    presetSaveControls: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s.md,
      flexWrap: 'wrap',
    },
    presetSaveControlButton: {
      paddingVertical: s.sm,
      paddingHorizontal: s.lg,
    },
    presetSaveControlText: {
      fontSize: t.sizes.md,
      color: c.tintMain,
      fontWeight: t.weights.semibold,
    },
    presetDeleteIcon: {
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    presetCardRow: {
      flex: 1,
    },
    presetDeleteIconAbsolute: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 44,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: t.sizes['2xl'],
      color: c.textMain,
      marginBottom: s.xl,
    },
    label: {
      fontSize: t.sizes.lg,
      color: c.textMain,
      marginTop: s.xl,
      marginBottom: 6,
    },
    helper: {
      fontSize: t.sizes.md - 1,
      color: c.textSecondary,
      marginBottom: s.md,
    },
    collapsibleSection: {
      marginBottom: s.lg,
    },
    collapsibleHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: s.md,
    },
    collapsibleLabel: {
      fontSize: t.sizes.lg,
      color: c.textMain,
    },
    collapsibleSummary: {
      fontSize: t.sizes.md - 1,
      color: c.textSecondary,
      paddingBottom: s.sm,
    },
    collapsibleContent: {
      paddingTop: 4,
    },
    modal: {
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
      },
      content: {
        backgroundColor: c.backgroundMain,
        borderTopLeftRadius: s.lg,
        borderTopRightRadius: s.lg,
        maxHeight: '80%',
      },
      header: {
        paddingHorizontal: s.xl,
        paddingTop: s.xl - 4,
        paddingBottom: s.lg,
        borderBottomWidth: 1,
        borderBottomColor: c.cardMain,
      },
      headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerNote: {
        fontSize: t.sizes.sm,
        color: c.textSecondary,
        marginTop: s.md,
        lineHeight: 20,
      },
      title: {
        fontSize: t.sizes['2xl'],
        color: c.textMain,
        fontWeight: t.weights.semibold,
      },
      closeButton: {
        paddingVertical: s.sm,
        paddingHorizontal: s.md,
      },
      closeButtonText: {
        fontSize: t.sizes.md,
        color: c.tintMain,
      },
      scroll: {
        maxHeight: 400,
      },
      scrollContent: {
        padding: s.xl,
        paddingBottom: s['3xl'] - 8,
      },
      sectionTitle: {
        fontSize: t.sizes.lg,
        color: c.textSecondary,
        marginBottom: s.md,
      },
      savedSectionTitle: {
        marginTop: s.xl,
      },
      presetCard: {
        backgroundColor: c.cardSecondary,
        borderRadius: r.lg - 2,
        padding: s.lg,
        marginBottom: s.md + 2,
      },
      presetName: {
        fontSize: t.sizes.lg,
        color: c.textMain,
        fontWeight: t.weights.semibold,
        marginBottom: 4,
      },
      presetDescription: {
        fontSize: t.sizes.md - 1,
        color: c.textSecondary,
        marginBottom: s.sm,
      },
      presetMetadata: {
        fontSize: t.sizes.sm,
        color: c.textSecondary,
      },
    },
    voteButton: {
      width: 40,
      height: 40,
      borderRadius: r.md,
      backgroundColor: c.cardMain,
      justifyContent: 'center',
      alignItems: 'center',
    },
    voteSymbol: {
      fontSize: 20,
      color: c.textMain,
    },
    voteCount: {
      fontSize: t.sizes.lg,
      color: c.textMain,
      minWidth: 32,
      textAlign: 'center',
    },
    voteRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    voteHint: {
      fontSize: t.sizes.md,
      color: c.textSecondary,
      marginBottom: s.sm,
    },
    allVotesAssigned: {
      fontSize: t.sizes.md,
      color: c.tintMain,
      marginBottom: s.sm,
    },
    presetSavedText: {
      fontSize: t.sizes.md,
      color: c.tintMain,
      marginBottom: s.md,
    },
    presetNameModalContent: {
      minHeight: 340,
      paddingBottom: s['3xl'],
    },
    presetNameModalBody: {
      paddingHorizontal: s.xl,
      paddingTop: s.lg,
    },
    presetNameRules: {
      fontSize: t.sizes.sm,
      color: c.textSecondary,
      marginBottom: s.md,
      lineHeight: 20,
    },
    presetNameError: {
      color: c.textSecondary,
    },
    presetInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: s.sm,
      marginBottom: s.md,
    },
    presetInput: {
      flex: 1,
      backgroundColor: c.cardMain,
      borderRadius: r.md,
      padding: s.lg - 2,
      fontSize: t.sizes.md,
      color: c.textMain,
    },
    presetSaveButton: {
      backgroundColor: c.tintMain,
      paddingVertical: s.lg - 2,
      paddingHorizontal: s.xl,
      borderRadius: r.md,
    },
    presetCancelButton: {
      paddingVertical: s.lg - 2,
      paddingHorizontal: s.xl,
    },
    presetCancelText: {
      color: c.textSecondary,
      fontSize: t.sizes.md,
    },
    savePresetButton: {
      paddingVertical: s.lg - 2,
      paddingHorizontal: s.xl,
      borderRadius: r.md,
      borderWidth: 2,
      borderColor: c.tintMain,
      alignSelf: 'flex-start',
    },
    savePresetButtonText: {
      fontSize: t.sizes.md,
      color: c.tintMain,
      fontWeight: t.weights.semibold,
    },
    gameItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.cardSecondary,
      borderRadius: r.md,
      padding: s.md + 2,
      marginBottom: s.sm,
    },
    bottomBar: {
      paddingHorizontal: s.lg,
      paddingBottom: s.xl,
      backgroundColor: c.backgroundMain,
      borderTopWidth: 1,
      borderTopColor: c.cardMain,
    },
    cardImage: {
      width: '100%',
      height: 180,
      borderRadius: r.md,
      backgroundColor: c.cardMain,
    },
    selectedGameCard: {
      width: '100%',
      maxWidth: 320,
      backgroundColor: c.cardSecondary,
      borderRadius: r.lg - 2,
      overflow: 'hidden',
      marginBottom: s['2xl'],
      shadowColor: c.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: e.high,
    },
    selectedGameContent: {
      flex: 1,
      zIndex: 2,
      paddingHorizontal: s.xl,
      paddingTop: s.xl,
      paddingBottom: s['2xl'],
      alignItems: 'center',
    },
    cardImagePlaceholder: {
      backgroundColor: c.cardMain,
    },
    cardBody: {
      padding: s.lg,
    },
    cardName: {
      fontSize: t.sizes.xl,
      color: c.textMain,
      fontWeight: t.weights.semibold,
    },
    cardDetail: {
      fontSize: t.sizes.md - 1,
      color: c.textSecondary,
      marginTop: s.xs,
    },
    confettiLayer: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyTitle: {
      fontSize: t.sizes['2xl'],
      color: c.textMain,
      marginBottom: s.md,
    },
    emptyBody: {
      fontSize: t.sizes.md,
      color: c.textSecondary,
      marginBottom: s['2xl'],
    },
    loadingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.md + 2,
    },
    loadingText: {
      fontSize: t.sizes.md,
      color: c.textSecondary,
    },
    retryButton: {
      paddingVertical: s.md,
      paddingHorizontal: s.xl,
      alignSelf: 'center',
    },
    retryButtonText: {
      color: c.tintMain,
      fontSize: t.sizes.md,
    },
    spinnerModal: {
      flex: 1,
      backgroundColor: c.backgroundMain,
      justifyContent: 'center',
      alignItems: 'center',
      padding: s.xl,
    },
    spinnerTitle: {
      fontSize: t.sizes['2xl'],
      color: c.textMain,
      marginBottom: s.lg,
    },
    celebration: {
      alignItems: 'center',
    },
    celebrationTitle: {
      fontSize: t.sizes.lg,
      color: c.textSecondary,
      marginBottom: s.sm,
    },
    winnerValue: {
      fontSize: t.sizes['3xl'] - 2,
      color: c.tintMain,
      fontWeight: t.weights.bold,
      textAlign: 'center',
      marginBottom: s['2xl'],
    },
    buttonRow: {
      alignItems: 'center',
      width: '100%',
    },
    textButton: {
      paddingVertical: s.md,
    },
    textButtonText: {
      fontSize: t.sizes.md,
      color: c.textSecondary,
    },
    footer: {
      position: 'absolute',
      bottom: s['3xl'],
      alignItems: 'center',
    },
    bggLogo: {
      marginBottom: 4,
      width: '100%',
    },
    footerText: {
      fontSize: t.sizes.xs,
      color: c.textSecondary,
    },
    listContent: {
      padding: s.lg,
      paddingBottom: s.xl,
    },
    listSection: {
      flex: 1,
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: s.xl,
    },
    refreshButton: {
      padding: s.sm,
      marginRight: s.sm,
    },
    complexityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: s.md,
    },
    complexitySliderWrap: {
      marginBottom: s['2xl'] - 4,
    },
    complexityReadout: {
      marginTop: s.sm,
    },
    complexitySliderLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 4,
      marginTop: s.sm,
    },
    complexitySliderLabel: {
      fontSize: t.sizes.sm,
      color: c.textSecondary,
    },
    advancedFiltersBlock: {
      marginTop: s.xl,
    },
    advancedFiltersLabel: {
      fontSize: t.sizes.lg,
      color: c.textMain,
      marginBottom: s.md,
      fontWeight: t.weights.semibold,
    },
    filtersContainer: {
      flex: 1,
      backgroundColor: c.backgroundMain,
    },
    filtersScroll: {
      flex: 1,
    },
    filtersScrollContent: {
      flexGrow: 1,
      paddingBottom: s['3xl'] + s['3xl'] + s['3xl'] + s['2xl'] + s['2xl'],
    },
    filtersContent: {
      paddingHorizontal: s.xl,
      paddingTop: s.xl,
    },
    complexitySlider: {
      width: '100%',
      height: 40,
    },
    spinnerWheelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: s.xl,
    },
    spinnerWinnerText: {
      marginTop: s.xl,
      fontSize: t.sizes.lg,
      color: c.textSpecial,
    },
  });
}

export function getSpinnerMarkerStyle(wheelSize) {
  const s = tokens.spacing;
  return {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: c.tintMain,
    borderRadius: 10,
    zIndex: 1,
    top: -s.md - 2,
    left: wheelSize / 2 - s.md - 2,
  };
}
