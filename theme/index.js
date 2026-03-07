import { useTheme as usePaperTheme } from 'react-native-paper';
import { tokensLight, tokensDark } from './tokens';
import { getComponentVariantStyles } from './components';
import { lightTheme } from './light';
import { darkTheme } from './dark';

import { useThemeMode } from './ThemeModeContext';

export { useThemeMode };
export { tokensLight as tokens };
export { lightTheme, darkTheme };
export { layout } from './layout';
export { getNavigationScreenOptions } from './navigation';
export { getSpinnerMarkerStyle, getLoadingGradientStyle } from './components';
export { spacing } from './spacing';
export { radius } from './radius';
export { typography } from './typography';
export { durations, easing } from './animations';

let cachedStylesLight = null;
let cachedStylesDark = null;

function getStyles(isDark) {
  if (isDark) {
    if (!cachedStylesDark) {
      cachedStylesDark = getComponentVariantStyles(tokensDark);
    }
    return cachedStylesDark;
  }
  if (!cachedStylesLight) {
    cachedStylesLight = getComponentVariantStyles(tokensLight);
  }
  return cachedStylesLight;
}

export function useAppTheme() {
  const theme = usePaperTheme();
  const { reduceMovement } = useThemeMode();
  const isDark = theme.dark === true;
  const tokens = isDark ? tokensDark : tokensLight;
  const styles = getStyles(isDark);
  return {
    theme,
    tokens,
    styles,
    reduceMovement,
  };
}
