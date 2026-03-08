import { StyleSheet } from 'react-native';
import { tokensLight } from '../tokens';
import { getButtonStyles } from './buttons';
import { getCardStyles } from './cards';
import { getFormStyles } from './forms';
import { getLayoutStyles } from './layout';
import { getModalStyles } from './modals';
import { getMiscStyles } from './misc';

export function getComponentVariantStyles(tokens = tokensLight) {
  const c = tokens.colors;
  const s = tokens.spacing;
  const r = tokens.radius;
  const t = tokens.typography;
  const e = tokens.elevation;

  const buttonStyles = getButtonStyles(c, s, r, t);
  const cardStyles = getCardStyles(c, s, r, t, e);
  const formStyles = getFormStyles(c, s, r, t);
  const layoutStyles = getLayoutStyles(c, s, r, t, e);
  const modalStyles = getModalStyles(c, s, r, t, e);
  const miscStyles = getMiscStyles(c, s, r, t, e);

  return StyleSheet.create({
    ...buttonStyles,
    ...cardStyles,
    ...formStyles,
    ...layoutStyles,
    ...modalStyles,
    ...miscStyles,

    // Any remaining legacy or very specific styles that don't fit elsewhere
    loadingGradient: {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    spinnerGlow: {
      // Logic handled in component
    },
    confetti1: { color: c.confetti1 },
    confetti2: { color: c.confetti2 },
    confetti3: { color: c.confetti3 },

    spinnerSliceText: {
      fill: '#FFFFFF',
      fontSize: 11,
      fontFamily: t.families.body,
      fontWeight: '700',
    },
  });
}

export function getSpinnerWheelStyle(wheelSize) {
  return {
    width: wheelSize,
    height: wheelSize,
  };
}

export function getSpinnerMarkerStyle(wheelSize, tokens = tokensLight) {
  const s = tokens.spacing;
  const c = tokens.colors;
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

export function getLoadingGradientStyle(tokens = tokensLight) {
  const c = tokens.colors;
  return {
    colors: [c.backgroundMain, c.cardMain, c.backgroundMain],
  };
}
