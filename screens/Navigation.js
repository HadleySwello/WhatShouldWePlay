import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import copy from '../constants/copy';
import { useAppTheme } from '../theme';
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import ConnectBGGScreen from './ConnectBGGScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import RankingsScreen from './RankingsScreen';
import SetupScreen from './SetupScreen';
import ResultsScreen from './ResultsScreen';
import SelectedGameScreen from './SelectedGameScreen';
import SpinnerScreen from './SpinnerScreen';
import { getNavigationScreenOptions } from '../theme';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { tokens } = useAppTheme();
  const screenOptions = getNavigationScreenOptions(tokens);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConnectBGG"
          component={ConnectBGGScreen}
          options={{ title: copy.navigation.connectCollection }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: copy.navigation.settings }}
        />
        <Stack.Screen
          name="MyGames"
          component={RankingsScreen}
          options={{ title: copy.navigation.browseCollection }}
        />
        <Stack.Screen
          name="Setup"
          component={SetupScreen}
          options={{ title: copy.navigation.chooseGame }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: copy.navigation.yourOptions }}
        />
        <Stack.Screen
          name="SelectedGame"
          component={SelectedGameScreen}
          options={{ title: copy.navigation.selectedGame }}
        />
        <Stack.Screen
          name="Spinner"
          component={SpinnerScreen}
          options={{ title: copy.navigation.spinnerScreen }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
