import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

import Navigation from './screens/Navigation';
import { lightTheme, darkTheme, layout } from './theme';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(
    () => (colorScheme === 'light' ? lightTheme : darkTheme),
    [colorScheme]
  );

  return (
    <PaperProvider theme={theme}>
      <View style={layout.fill}>
        <Navigation />
      </View>
    </PaperProvider>
  );
}
