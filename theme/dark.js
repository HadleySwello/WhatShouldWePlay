import { MD3DarkTheme } from 'react-native-paper';
import { tokens } from './tokens';

const c = tokens.colors;

export const darkTheme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
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
