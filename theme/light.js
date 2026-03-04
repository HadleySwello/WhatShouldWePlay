import { MD3LightTheme } from 'react-native-paper';
import { tokens } from './tokens';

const c = tokens.colors;

export const lightTheme = {
  ...MD3LightTheme,
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    primary: c.tintMain,
    primaryContainer: c.cardMain,
    secondary: c.tintSecondary,
    secondaryContainer: c.cardSecondary,
    surface: c.backgroundMain,
    background: c.backgroundMain,
    onPrimary: c.backgroundMain,
    onSecondary: c.textMain,
    onSurface: c.textMain,
    onSurfaceVariant: c.textSecondary,
    onBackground: c.textMain,
    outline: c.tintMain,
  },
};
