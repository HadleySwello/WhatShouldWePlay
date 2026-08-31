import * as React from 'react';
import { View } from 'react-native';
import { useAppTheme } from '../theme';

export type AppCardProps = {
  variant: string;
  style: any;
  children: any;
};

export default function AppCard({
  variant = 'default',
  style,
  children,
  ...rest
}: AppCardProps) {
  const { styles } = useAppTheme();
  const cardStyle =
    variant === 'default' ? styles.card.default : styles.card.default;
  return (
    <View style={[cardStyle, style]} {...rest}>
      {children}
    </View>
  );
}
