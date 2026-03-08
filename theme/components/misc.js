export const getMiscStyles = (c, s, r, t, e) => ({
  loadingGradient: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  connectBgg: {
    container: {
      flex: 1,
      paddingHorizontal: s.xl,
      paddingTop: s['4xl'],
      paddingBottom: s['4xl'],
      alignItems: 'center',
    },
    header: {
      marginBottom: s.lg,
      textAlign: 'center',
    },
    body: {
      marginBottom: s['3xl'],
      textAlign: 'center',
      opacity: 0.9,
      lineHeight: 22,
    },
    inputContainer: {
      width: '100%',
      marginBottom: s.xl,
    },
    helpButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s.xl,
      padding: s.sm,
    },
    helpText: {
      marginLeft: s.xs,
      fontSize: 14,
      color: c.tintMain,
    },
    loginLinkSection: {
      marginTop: 'auto',
      alignItems: 'center',
      width: '100%',
      paddingTop: s.xl,
      paddingBottom: s.xl,
    },
    bggLoginLogo: {
      marginBottom: s.lg,
    },
    bggLoginHelper: {
      textAlign: 'center',
      opacity: 0.7,
      paddingHorizontal: s.md,
      lineHeight: 18,
    },
  },
  ritualSaveControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s.md,
    flexWrap: 'wrap',
  },
  ritualSaveControlButton: {
    paddingVertical: s.sm,
    paddingHorizontal: s.lg,
  },
  ritualDeleteIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ritualDeleteIconAbsolute: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ritualCardRow: {
    flex: 1,
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
  stickyRitualSection: {
    marginTop: s.md,
    alignItems: 'center',
  },
  stickyRitualAction: {
    paddingVertical: s.sm,
    paddingHorizontal: s.lg,
  },
  ritualHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: s.lg,
    gap: s.sm,
  },
  ritualHeaderTitle: {
    fontSize: t.sizes.lg,
    fontFamily: t.families.header,
    color: c.textMain,
  },
  ritualSavedText: {
    fontSize: t.sizes.md,
    fontFamily: t.families.subheader,
    color: c.tintMain,
    marginBottom: s.md,
  },
  starRating: {
    container: {
      flexDirection: 'row',
      gap: 2,
    },
    icon: {
      // Opacity will be handled logically in the component
    },
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
    fontFamily: t.families.subheader,
    color: c.textMain,
  },
  collapsibleSummary: {
    fontSize: t.sizes.md - 1,
    fontFamily: t.families.body,
    color: c.textSecondary,
    paddingBottom: s.sm,
  },
  collapsibleContent: {
    paddingTop: 4,
  },
  voteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteHint: {
    fontSize: t.sizes.md,
    fontFamily: t.families.body,
    color: c.textSecondary,
    marginBottom: s.sm,
  },
  allVotesAssigned: {
    fontSize: t.sizes.md,
    fontFamily: t.families.body,
    color: c.tintMain,
    marginBottom: s.sm,
  },
  votingModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s.md,
  },
  votingModeRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  votingModeInfoIcon: {
    padding: s.sm,
    marginLeft: s.xs,
  },
  votingModeSettingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s.xl,
  },
  settingsRowInfo: {
    flex: 1,
    paddingRight: s.md,
  },
  settingsRowTitle: {
    textAlign: 'left',
    color: c.textMain,
  },
  settingsRowDesc: {
    textAlign: 'left',
    marginTop: s.xs,
  },
  settingsSectionTitle: {
    marginTop: s.xl,
  },
  confettiLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: t.sizes['2xl'],
    fontFamily: t.families.header,
    color: c.textMain,
    marginBottom: s.md,
  },
  emptyBody: {
    fontSize: t.sizes.md,
    fontFamily: t.families.body,
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
    fontFamily: t.families.subheader,
    color: c.textSecondary,
  },
  celebration: {
    alignItems: 'center',
  },
  celebrationTitle: {
    fontSize: t.sizes.lg,
    fontFamily: t.families.header,
    color: c.textSecondary,
    marginBottom: s.sm,
  },
  winnerValue: {
    fontSize: t.sizes['3xl'] - 2,
    fontFamily: t.families.header,
    color: c.tintMain,
    textAlign: 'center',
    marginBottom: s['2xl'],
  },
  buttonRow: {
    alignItems: 'center',
    width: '100%',
  },
  attributionContainer: {
    position: 'absolute',
    bottom: s['3xl'],
    alignItems: 'center',
    alignSelf: 'center',
  },
  bggLogo: {
    width: 160,
    height: 47,
  },
  footerText: {
    fontSize: t.sizes.xs,
    fontFamily: t.families.subheader,
    color: c.textSecondary,
  },
  spinnerTitle: {
    fontSize: t.sizes['2xl'],
    fontFamily: t.families.header,
    color: c.textMain,
    marginBottom: s.lg,
  },
  spinnerWheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s.xl,
  },
  spinnerWinnerText: {
    marginTop: s.xl,
    fontSize: t.sizes.lg,
    fontFamily: t.families.subheader,
    color: c.textSpecial,
  },
});
