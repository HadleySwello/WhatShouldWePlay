import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import RankingsScreen from './RankingsScreen';
import colors from '../helpers/colors'; // Default import for colors

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ color, size }) => {
            const iconName = route.name === 'Play A Game!' ? 'dice-five' : 'book';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.tintMain, // Gold for active tab
          tabBarInactiveTintColor: colors.textSecondary, // Black for inactive tabs
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerTintColor: colors.tintMain, // Gold for back button or icons
        })}
      >
        <Tab.Screen name="Play A Game!" component={HomeScreen} />
        <Tab.Screen name="My Games" component={RankingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundMain, // Main background color
    borderTopWidth: 1,
    borderTopColor: colors.tintMain, // Gold border for tab bar
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Arial',
    color: colors.textMain, // Default text color
  },
  headerStyle: {
    backgroundColor: colors.backgroundMain, // Main header background
    borderBottomWidth: 1,
    borderBottomColor: colors.tintMain, // Gold border for header
  },
  headerTitleStyle: {
    color: colors.textMain, // Main text color for header
    fontSize: 20,
  },
});
