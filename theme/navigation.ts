type NavigationTokens = {
  colors: {
    backgroundMain: string;
    tintMain: string;
    textMain: string;
  };
  typography: {
    sizes: {
      '3xl': number;
    };
    families: {
      header: string;
    };
  };
};

export function getNavigationScreenOptions(tokens: NavigationTokens) {
  const c = tokens.colors;
  const t = tokens.typography;
  return {
    headerStyle: {
      backgroundColor: c.backgroundMain,
      borderBottomWidth: 1,
      borderBottomColor: c.tintMain,
    },
    headerTitleStyle: {
      color: c.textMain,
      fontSize: t.sizes['3xl'],
      fontFamily: t.families.header,
    },
    headerTitleAlign: 'center',
    headerTintColor: c.tintMain,
    contentStyle: {
      backgroundColor: c.backgroundMain,
    },
  };
}
