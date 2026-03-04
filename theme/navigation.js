import { tokens } from './tokens';

const c = tokens.colors;
const t = tokens.typography;

export function getNavigationScreenOptions() {
  return {
    headerStyle: {
      backgroundColor: c.backgroundMain,
      borderBottomWidth: 1,
      borderBottomColor: c.tintMain,
    },
    headerTitleStyle: {
      color: c.textMain,
      fontSize: t.sizes.xl,
    },
    headerTitleAlign: 'center',
    headerTintColor: c.tintMain,
    contentStyle: {
      backgroundColor: c.backgroundMain,
    },
  };
}
