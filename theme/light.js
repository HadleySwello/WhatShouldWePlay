import { MD3LightTheme } from 'react-native-paper';
import { tokensLight } from './tokens';

const c = tokensLight.colors;

export const lightTheme = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,

    primary: c.tintMain,
    onPrimary: c.onTintMain,
    primaryContainer: c.primaryContainer,
    onPrimaryContainer: c.onPrimaryContainer,

    secondary: c.tintSecondary,
    onSecondary: c.onTintSecondary,
    secondaryContainer: c.secondaryContainer,
    onSecondaryContainer: c.onSecondaryContainer,

    tertiary: c.tintSpecial,
    onTertiary: c.onTintSpecial,
    tertiaryContainer: c.tertiaryContainer,
    onTertiaryContainer: c.onTertiaryContainer,

    background: c.backgroundMain,
    onBackground: c.textMain,

    surface: c.cardMain,
    onSurface: c.textMain,
    surfaceVariant: c.cardSecondary,
    onSurfaceVariant: c.textSecondary,

    outline: c.border,
    outlineVariant: c.divider,

    error: c.error,
    onError: c.onTintMain,
    errorContainer: c.secondaryContainer,
    onErrorContainer: c.textMain,

    inverseSurface: c.inverseSurface,
    inverseOnSurface: c.inverseOnSurface,
    inversePrimary: c.inversePrimary,

    elevation: {
      ...MD3LightTheme.colors.elevation,
      level0: c.elevation0,
      level1: c.elevation1,
      level2: c.elevation2,
      level3: c.elevation3,
      level4: c.elevation4,
      level5: c.elevation5,
    },
  },
};
