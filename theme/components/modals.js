export const getModalStyles = (c, s, r, t, e) => ({
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
      fontFamily: t.families.body,
      color: c.textSecondary,
      marginTop: s.md,
      lineHeight: 20,
    },
    title: {
      fontSize: t.sizes['2xl'],
      fontFamily: t.families.header,
      color: c.textMain,
    },
    closeButton: {
      paddingVertical: s.sm,
      paddingHorizontal: s.md,
    },
    closeButtonText: {
      fontSize: t.sizes.md,
      fontFamily: t.families.subheader,
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
      fontFamily: t.families.header,
      color: c.textSecondary,
      marginBottom: s.md,
    },
    vibeName: {
      fontSize: t.sizes.lg,
      fontFamily: t.families.header,
      color: c.textMain,
      marginBottom: 4,
    },
    vibeDescription: {
      fontSize: t.sizes.md - 1,
      fontFamily: t.families.body,
      color: c.textSecondary,
      marginBottom: s.sm,
    },
    vibeMetadata: {
      fontSize: t.sizes.sm,
      fontFamily: t.families.body,
      color: c.textSecondary,
    },
  },
  helpModal: {
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: s.xl,
    },
    content: {
      backgroundColor: c.backgroundMain,
      borderRadius: r.lg,
      padding: s.xl,
      width: '100%',
      maxWidth: 500,
      elevation: e.high,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
    },
    title: {
      marginBottom: s.lg,
      color: c.textMain,
    },
    faqItem: {
      marginBottom: s.xl,
    },
    question: {
      fontFamily: t.families.subheader,
      color: c.textMain,
      marginBottom: s.xs,
      fontSize: 16,
    },
    answer: {
      color: c.textSecondary,
      fontSize: 14,
      lineHeight: 20,
    },
    demoLink: {
      color: c.tintMain,
      fontFamily: t.families.bodyBold,
      textDecorationLine: 'underline',
    },
    closeButton: {
      marginTop: s.lg,
      alignSelf: 'center',
    },
    closeIcon: {
      position: 'absolute',
      top: s.lg,
      right: s.lg,
      zIndex: 10,
      padding: s.xs,
    },
  },
  vibeNameModalContent: {
    minHeight: 340,
    paddingBottom: s['3xl'],
  },
  votingModeInfoModalContent: {
    paddingBottom: s['3xl'],
  },
  votingModeInfoModalBody: {
    paddingHorizontal: s.xl,
    paddingTop: s.lg,
  },
  votingModeInfoText: {
    lineHeight: 22,
  },
  vibeNameModalBody: {
    paddingHorizontal: s.xl,
    paddingTop: s.lg,
  },
  vibeNameRules: {
    fontSize: t.sizes.sm,
    fontFamily: t.families.header,
    color: c.textSecondary,
    marginBottom: s.md,
    lineHeight: 20,
  },
  vibeNameError: {
    color: c.textSecondary,
  },
  spinnerModal: {
    flex: 1,
    backgroundColor: c.backgroundMain,
    justifyContent: 'center',
    alignItems: 'center',
    padding: s.xl,
  },
});
