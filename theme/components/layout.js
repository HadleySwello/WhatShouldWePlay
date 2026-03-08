export const getLayoutStyles = (c, s, r, t, e) => ({
  screen: {
    container: {
      flex: 1,
      backgroundColor: c.backgroundMain,
    },
    wrapper: {
      flex: 1,
    },
    splashCard: {
      paddingVertical: s['3xl'],
      paddingHorizontal: s.xl,
      alignItems: 'center',
      width: '100%',
      maxWidth: 400,
      elevation: e.high,
      shadowOpacity: 0.15,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
    settingsIcon: {
      position: 'absolute',
      top: s['3xl'],
      right: s.xl,
      zIndex: 10,
      padding: s.sm,
    },
    homeFooterContainer: {
      position: 'absolute',
      bottom: s['2xl'],
      width: '100%',
      alignItems: 'center',
    },
  },
  splash: {
    logoContainer: {
      marginBottom: s.lg,
    },
    loadingContainer: {
      marginBottom: s['2xl'],
      alignItems: 'center',
    },
    tagline: {
      marginTop: s.md,
      opacity: 0.8,
      fontSize: 14,
    },
  },
  welcome: {
    logoContainer: {
      marginBottom: s.lg,
    },
    subtitle: {
      marginBottom: s['3xl'],
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
      fontFamily: t.families.header,
      color: c.textMain,
    },
    gameDetails: {
      fontSize: t.sizes.sm,
      fontFamily: t.families.body,
      color: c.textSecondary,
      marginTop: 2,
    },
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
  homeButtonContainer: {
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: t.sizes['2xl'],
    fontFamily: t.families.header,
    color: c.textMain,
    marginBottom: s.xl,
  },
  label: {
    fontSize: t.sizes.lg,
    fontFamily: t.families.subheader,
    color: c.textMain,
    marginTop: s.xl,
    marginBottom: 6,
  },
  helper: {
    fontSize: t.sizes.md - 1,
    fontFamily: t.families.body,
    color: c.textSecondary,
    marginBottom: s.md,
  },
});
