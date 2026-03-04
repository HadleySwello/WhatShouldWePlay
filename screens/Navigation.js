import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import ConnectBGGScreen from './ConnectBGGScreen';
import CollectionImportedScreen from './CollectionImportedScreen';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import RankingsScreen from './RankingsScreen';
import SetupScreen from './SetupScreen';
import ResultsScreen from './ResultsScreen';
import SelectedGameScreen from './SelectedGameScreen';
import { getNavigationScreenOptions } from '../theme';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const screenOptions = getNavigationScreenOptions();

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
          options={{ title: 'Connect Your Collection' }}
        />
        <Stack.Screen
          name="CollectionImported"
          component={CollectionImportedScreen}
          options={{ title: 'Success' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="MyGames"
          component={RankingsScreen}
          options={{ title: 'Browse Collection' }}
        />
        <Stack.Screen
          name="Setup"
          component={SetupScreen}
          options={{ title: 'Choose a Game' }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Your Options' }}
        />
        <Stack.Screen
          name="SelectedGame"
          component={SelectedGameScreen}
          options={{ title: 'Selected Game' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
