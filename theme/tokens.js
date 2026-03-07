import colors from '../helpers/colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { elevation } from './elevation';
import { typography } from './typography';

const makeTokens = (palette) => ({
  colors: {
    backgroundMain: palette.backgroundMain,
    backgroundSecondary: palette.backgroundSecondary,

    cardMain: palette.cardMain,
    cardSecondary: palette.cardSecondary,

    textMain: palette.textMain,
    textSecondary: palette.textSecondary,
    textSpecial: palette.textSpecial,

    tintMain: palette.tintMain,
    tintSecondary: palette.tintSecondary,
    tintSpecial: palette.tintSpecial,

    border: palette.border,
    divider: palette.divider,

    disabled: palette.disabled,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
    info: palette.info,

    focusRing: palette.focusRing,
    overlay: palette.overlay,

    spinnerGlow: palette.spinnerGlow,
    confetti1: palette.confetti1,
    confetti2: palette.confetti2,
    confetti3: palette.confetti3,

    onTintMain: palette.onTintMain,
    onTintSecondary: palette.onTintSecondary,
    onTintSpecial: palette.onTintSpecial,

    primaryContainer: palette.primaryContainer,
    onPrimaryContainer: palette.onPrimaryContainer,

    secondaryContainer: palette.secondaryContainer,
    onSecondaryContainer: palette.onSecondaryContainer,

    tertiaryContainer: palette.tertiaryContainer,
    onTertiaryContainer: palette.onTertiaryContainer,

    inverseSurface: palette.inverseSurface,
    inverseOnSurface: palette.inverseOnSurface,
    inversePrimary: palette.inversePrimary,

    elevation0: palette.elevation0,
    elevation1: palette.elevation1,
    elevation2: palette.elevation2,
    elevation3: palette.elevation3,
    elevation4: palette.elevation4,
    elevation5: palette.elevation5,

    shadow: palette.shadow,
    ritual: palette.ritual,
  },

  spacing,
  radius,
  elevation,
  typography,
});

export const tokensLight = makeTokens(colors.light);
export const tokensDark = makeTokens(colors.dark);

// Keep a default export compatible with existing imports
export const tokens = tokensLight;
