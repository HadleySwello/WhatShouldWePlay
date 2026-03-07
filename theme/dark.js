import { MD3DarkTheme } from 'react-native-paper';
import { tokensDark } from './tokens';

const c = tokensDark.colors;

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: c.tintMain, // Almond
    onPrimary: c.onTintMain, // Jade
    background: c.backgroundMain, // Jade
    onBackground: c.textMain, // Almond
    surface: c.cardMain, // Light Jade for depth
    onSurface: c.textMain,
    outline: c.border,
    inverseSurface: c.inverseSurface,
    inverseOnSurface: c.inverseOnSurface,
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level0: c.elevation0,
      level1: c.elevation1,
      level2: c.elevation2,
    },
    shadow: c.shadow,
  },
};
