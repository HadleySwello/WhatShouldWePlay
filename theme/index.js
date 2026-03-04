import { useTheme as usePaperTheme } from 'react-native-paper';
import { tokens } from './tokens';
import { getComponentVariantStyles } from './components';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export { tokens };
export { lightTheme, darkTheme };
export { layout } from './layout';
export { getNavigationScreenOptions } from './navigation';
export { getSpinnerMarkerStyle } from './components';
export { spacing } from './spacing';
export { radius } from './radius';
export { typography } from './typography';
export { durations, easing } from './animations';

let cachedStyles = null;

function getStyles() {
  if (!cachedStyles) {
    cachedStyles = getComponentVariantStyles();
  }
  return cachedStyles;
}

export function useAppTheme() {
  const theme = usePaperTheme();
  return {
    theme,
    tokens,
    styles: getStyles(),
  };
}
