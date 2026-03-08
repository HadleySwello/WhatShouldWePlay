export const getFormStyles = (c, s, r, t) => ({
  input: {
    default: {
      backgroundColor: c.cardMain,
      borderRadius: r.md,
      padding: s.lg - 2,
      fontSize: t.sizes.md,
      fontFamily: t.families.body,
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
      fontFamily: t.families.subheader,
      color: c.textMain,
    },
    selectedText: {
      color: c.onTintMain,
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
      fontFamily: t.families.header,
      color: c.textMain,
    },
    value: {
      fontSize: 38,
      fontFamily: t.families.header,
      color: c.textMain,
      marginHorizontal: s['2xl'],
      minWidth: 48,
      textAlign: 'center',
    },
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s.sm,
    marginBottom: s.xl - 4,
  },
  vibeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s.sm,
    marginBottom: s.md,
  },
  vibeInput: {
    flex: 1,
    backgroundColor: c.cardMain,
    borderRadius: r.md,
    padding: s.lg - 2,
    fontSize: t.sizes.md,
    fontFamily: t.families.body,
    color: c.textMain,
  },
  complexitySliderWrap: {
    marginBottom: s['2xl'] - 4,
  },
  complexityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s.md,
  },
  complexitySliderLabel: {
    fontSize: t.sizes.sm,
    fontFamily: t.families.subheader,
    color: c.textSecondary,
  },
  complexitySlider: {
    width: '100%',
    height: 40,
  },
  advancedFiltersBlock: {
    marginTop: s.xl,
  },
  advancedFiltersLabel: {
    fontSize: t.sizes.lg,
    fontFamily: t.families.subheader,
    color: c.textMain,
    marginBottom: s.md,
  },
});
