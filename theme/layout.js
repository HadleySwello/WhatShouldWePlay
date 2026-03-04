import { StyleSheet } from 'react-native';
import { tokens } from './tokens';

const s = tokens.spacing;
const r = tokens.radius;
const e = tokens.elevation;

// Layout helpers - token-based only, no colors/fonts
// Screen/component files may import layout for composition
export const layout = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  fill: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  stretch: {
    alignSelf: 'stretch',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paddingXl: {
    padding: s.xl,
  },
  paddingLg: {
    padding: s.lg,
  },
  paddingMd: {
    padding: s.md,
  },
  paddingBottomLg: {
    paddingBottom: s.lg,
  },
  paddingBottom2xl: {
    paddingBottom: s['2xl'],
  },
  marginBottomXs: {
    marginBottom: s.xs,
  },
  marginBottomMd: {
    marginBottom: s.md,
  },
  marginBottomLg: {
    marginBottom: s.lg,
  },
  marginBottomXl: {
    marginBottom: s.xl,
  },
  marginBottom3xl: {
    marginBottom: s['3xl'],
  },
  marginTopMd: {
    marginTop: s.md,
  },
  marginHorizontalLg: {
    marginHorizontal: s.lg,
  },
  marginHorizontalXl: {
    marginHorizontal: s.xl,
  },
  marginTop3xl: {
    marginTop: s['3xl'],
  },
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: s.xl,
    paddingTop: s.lg,
    paddingBottom: s['2xl'],
  },
  gapSm: {
    gap: s.sm,
  },
  gapMd: {
    gap: s.md,
  },
  textCenter: {
    textAlign: 'center',
  },
  radiusMd: {
    borderRadius: r.md,
  },
  elevationMedium: {
    elevation: e.medium,
  },
});
