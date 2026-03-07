import React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../theme';

import LogoLight from '../assets/WhatShouldWePlayLogo-Light.svg';
import LogoDark from '../assets/WhatShouldWePlayLogo-Dark.svg';

export default function AppLogo({ width = 280, height = 280, style }) {
  const { theme } = useAppTheme();
  const isDark = theme.dark === true;
  const Logo = isDark ? LogoDark : LogoLight;

  return (
    <View style={style}>
      <Logo width={width} height={height} />
    </View>
  );
}
