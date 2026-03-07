import { MD3LightTheme } from 'react-native-paper';
import { tokensLight } from './tokens';

const c = tokensLight.colors;

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: c.tintMain, // Faded Jade
    onPrimary: c.onTintMain, // Almond
    background: c.backgroundMain, // Almond
    onBackground: c.textMain, // Deep Jade
    surface: c.cardMain, // Soft Almond
    onSurface: c.textMain,
    surfaceVariant: c.cardSecondary,
    onSurfaceVariant: c.textSecondary,
    outline: c.border,
    inverseSurface: c.inverseSurface,
    inverseOnSurface: c.inverseOnSurface,
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level0: c.elevation0,
      level1: c.elevation1,
      level2: c.elevation2,
    },
    shadow: c.shadow,
  },
};
