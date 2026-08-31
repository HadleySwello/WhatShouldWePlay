import { useTheme as usePaperTheme } from 'react-native-paper';
import { tokensLight, tokensDark } from './tokens';
import { getComponentVariantStyles } from './components/index';
import { lightTheme } from './light';
import { darkTheme } from './dark';

import { useThemeMode } from './ThemeModeContext';

export { useThemeMode };
export { tokensLight as tokens };
export { lightTheme, darkTheme };
export { layout } from './layout';
export { getNavigationScreenOptions } from './navigation';
export {
  getSpinnerMarkerStyle,
  getSpinnerWheelStyle,
  getLoadingGradientStyle,
} from './components/index';
export { spacing } from './spacing';
export { radius } from './radius';
export { typography } from './typography';
export { durations, easing } from './animations';

const cachedStyles: Record<
  string,
  ReturnType<typeof getComponentVariantStyles> | null
> = {
  light: null,
  dark: null,
  lightLarge: null,
  darkLarge: null,
};

function getStyles(isDark: boolean, isLarge: boolean) {
  const key = `${isDark ? 'dark' : 'light'}${isLarge ? 'Large' : ''}`;
  if (!cachedStyles[key]) {
    const rawTokens = isDark ? tokensDark : tokensLight;
    const tokensForStyles = {
      ...rawTokens,
      typography: {
        ...rawTokens.typography,
        sizes: isLarge
          ? rawTokens.typography.sizesLargeText
          : rawTokens.typography.sizes,
      },
    };
    cachedStyles[key] = getComponentVariantStyles(tokensForStyles);
  }
  return cachedStyles[key];
}

export function useAppTheme() {
  const theme = usePaperTheme();
  const { reduceMovement, largeText } = useThemeMode();
  const isDark = theme.dark === true;
  const rawTokens = isDark ? tokensDark : tokensLight;

  const tokens = {
    ...rawTokens,
    typography: {
      ...rawTokens.typography,
      sizes: largeText
        ? rawTokens.typography.sizesLargeText
        : rawTokens.typography.sizes,
    },
  };

  const styles = getStyles(isDark, largeText);
  return {
    theme,
    tokens,
    styles,
    reduceMovement,
    largeText,
  };
}
