import * as React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../theme';

import * as LogoLight from '../assets/WhatShouldWePlayLogo-Light.svg';
import * as LogoDark from '../assets/WhatShouldWePlayLogo-Dark.svg';

export type AppLogoProps = {
  width: number;
  height: number;
  style: any;
};

export default function AppLogo({
  width = 280,
  height = 280,
  style,
}: AppLogoProps) {
  const { theme } = useAppTheme();
  const isDark = theme.dark === true;
  const Logo = isDark ? LogoDark : LogoLight;

  return (
    <View style={style}>
      <Logo width={width} height={height} />
    </View>
  );
}
