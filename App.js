import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

import Navigation from './screens/Navigation';
import { lightTheme, darkTheme, layout } from './theme';
import { ThemeModeProvider, useThemeMode } from './theme/ThemeModeContext';

function AppContent() {
  const { themeMode } = useThemeMode();
  const colorScheme = useColorScheme();
  const effectiveScheme =
    themeMode === 'system' ? (colorScheme || 'light') : themeMode;
  const theme = useMemo(
    () => (effectiveScheme === 'light' ? lightTheme : darkTheme),
    [effectiveScheme]
  );

  return (
    <PaperProvider theme={theme}>
      <View style={layout.fill}>
        <Navigation />
      </View>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}
