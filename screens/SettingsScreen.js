import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../helpers/colors';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('ConnectBGG')}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>Change Username</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
    padding: 24,
  },
  primaryButton: {
    backgroundColor: colors.tintMain,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  primaryButtonText: {
    fontSize: 18,
    color: colors.backgroundMain,
    fontWeight: '600',
  },
});
