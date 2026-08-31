// Typography scale - font sizes, weights, line heights
type TypographyScale = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
};

type TypographyFamilies = {
  header: string;
  subheader: string;
  body: string;
  bodyMedium: string;
  bodyBold: string;
};

type TypographyWeights = {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
};

type TypographyLineHeights = {
  tight: number;
  normal: number;
  relaxed: number;
};

export const typography: {
  sizes: TypographyScale;
  sizesLargeText: TypographyScale;
  families: TypographyFamilies;
  weights: TypographyWeights;
  lineHeights: TypographyLineHeights;
} = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 26,
    '4xl': 28,
    '5xl': 38,
  },
  sizesLargeText: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 42,
  },
  families: {
    header: 'PlayfairDisplay_700Bold',
    subheader: 'Montserrat_600SemiBold',
    body: 'OpenSans_400Regular',
    bodyMedium: 'OpenSans_500Medium',
    bodyBold: 'OpenSans_700Bold',
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};
