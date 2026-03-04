import colors from '../helpers/colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { elevation } from './elevation';
import { typography } from './typography';

export const tokens = {
  colors: {
    backgroundMain: colors.backgroundMain,
    backgroundSecondary: colors.backgroundSecondary,
    cardMain: colors.cardMain,
    cardSecondary: colors.cardSecondary,
    textMain: colors.textMain,
    textSecondary: colors.textSecondary,
    textSpecial: colors.textSpecial,
    tintMain: colors.tintMain,
    tintSecondary: colors.tintSecondary,
    tintSpecial: colors.tintSpecial,
    shadow: colors.shadow,
  },
  spacing,
  radius,
  elevation,
  typography,
};
