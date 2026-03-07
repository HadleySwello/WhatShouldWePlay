import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

import Navigation from './screens/Navigation';
import { lightTheme, darkTheme, layout } from './theme';
import { ThemeModeProvider, useThemeMode } from './theme/ThemeModeContext';
import {
  useFonts,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import {
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

function AppContent() {
  const { themeMode } = useThemeMode();
  const colorScheme = useColorScheme();
  const effectiveScheme =
    themeMode === 'system' ? colorScheme || 'light' : themeMode;
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
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Montserrat_600SemiBold,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}
