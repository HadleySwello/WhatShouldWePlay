import { Image, TouchableOpacity, Linking } from 'react-native';
import { useAppTheme } from '../theme';
import copy from '../constants/copy';

const BGG_URL = 'https://boardgamegeek.com';

export default function PoweredByBGG({ style, pressable = true }) {
  const { styles } = useAppTheme();

  const logo = (
    <Image
      source={require('../assets/powered-by-bgg.jpg')}
      style={[styles.bggLogo, style]}
      resizeMode="contain"
      accessible
      accessibilityLabel={copy.splash.a11y}
    />
  );

  if (!pressable) {
    return logo;
  }

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(BGG_URL)}
      activeOpacity={0.7}
      style={styles.attributionContainer}
    >
      {logo}
    </TouchableOpacity>
  );
}
