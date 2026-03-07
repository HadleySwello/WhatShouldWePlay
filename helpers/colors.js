const colors = {
  light: {
    // Backgrounds (60%) - Warm Powder Petal base
    backgroundMain: '#ECD7C7',
    backgroundSecondary: '#E2CCBC',

    // Surfaces - Tinted to avoid "pure white" look
    cardMain: '#F4E7DD',
    cardSecondary: '#ECD7C7',

    // Text - Deep Space Blue provides high contrast (7.7:1)
    textMain: '#273043',
    textSecondary: '#2A575A', // Darker Pine Blue
    textSpecial: '#861657', // Dark Raspberry

    // Accents (10%) - Pine Blue as primary ritual anchor
    tintMain: '#2A575A',
    tintSecondary: '#AA4465', // Berry Crush
    tintSpecial: '#861657', // Dark Raspberry

    // Structure
    border: '#D1B9A8',
    divider: '#DBC3B2',

    // States
    disabled: '#B8A496',
    success: '#2A575A', // Darker Pine Blue for success
    warning: '#AA4465', // Berry Crush for warnings
    error: '#861657', // Dark Raspberry for errors
    info: '#273043',

    // Focus / overlay
    focusRing: '#2A575A',
    overlay: 'rgba(39, 48, 67, 0.5)', // Deep Space Blue with opacity

    // Ritual moments
    spinnerGlow: '#2A575A',
    confetti1: '#2A575A',
    confetti2: '#AA4465',
    confetti3: '#861657',

    // React Native Paper semantic tokens
    onTintMain: '#ECD7C7', // Powder Petal text on Pine Blue
    onTintSecondary: '#FFFFFF',
    onTintSpecial: '#FFFFFF',

    primaryContainer: '#F4E7DD',
    onPrimaryContainer: '#273043',

    secondaryContainer: '#EAD1D8', // Berry Crush tint
    onSecondaryContainer: '#273043',

    tertiaryContainer: '#D1BCC7', // Raspberry tint
    onTertiaryContainer: '#273043',

    inverseSurface: '#2A575A',
    inverseOnSurface: '#ECD7C7',
    inversePrimary: '#ECD7C7',

    // Elevation steps
    elevation0: '#ECD7C7',
    elevation1: '#F4E7DD',
    elevation2: '#E2CCBC',
    elevation3: '#DBC3B2',
    elevation4: '#D1B9A8',
    elevation5: '#C7AF9E',

    shadow: '#000000',
  },

  dark: {
    // Backgrounds (60%) - Very dark jade base (fixes accessibility)
    backgroundMain: '#163234',
    backgroundSecondary: '#102628',

    // Surfaces / Cards
    cardMain: '#1E4244', // Lighter for depth
    cardSecondary: '#163234',

    // Text - Powder Petal on Dark Jade
    textMain: '#ECD7C7',
    textSecondary: '#E2CCBC',
    textSpecial: '#AA4465',

    // Accents (10%) - Inverted Ritual Primary (Powder Petal)
    tintMain: '#ECD7C7',
    tintSecondary: '#AA4465',
    tintSpecial: '#861657',

    // Structure
    border: '#1E4244',
    divider: '#1A3A3D',

    // States
    disabled: '#2C575A',
    success: '#ECD7C7',
    warning: '#AA4465',
    error: '#FCA5A5',
    info: '#F4E7DD',

    // Focus / overlay
    focusRing: '#ECD7C7',
    overlay: 'rgba(0, 0, 0, 0.6)',

    // Ritual moments
    spinnerGlow: '#ECD7C7',
    confetti1: '#ECD7C7',
    confetti2: '#AA4465',
    confetti3: '#861657',

    // React Native Paper semantic tokens
    onTintMain: '#163234', // Dark text on Powder Petal
    onTintSecondary: '#FFFFFF', // Light text on Berry Crush (fixes 1.20:1 contrast issue)
    onTintSpecial: '#FFFFFF',

    primaryContainer: '#1E4244',
    onPrimaryContainer: '#ECD7C7',

    secondaryContainer: '#66293D', // Deep Berry
    onSecondaryContainer: '#ECD7C7',

    tertiaryContainer: '#510D35', // Deep Raspberry
    onTertiaryContainer: '#ECD7C7',

    inverseSurface: '#ECD7C7',
    inverseOnSurface: '#163234',
    inversePrimary: '#2A575A',

    // Elevation steps
    elevation0: '#163234',
    elevation1: '#1A3A3D',
    elevation2: '#1E4244',
    elevation3: '#234C4E',
    elevation4: '#275658',
    elevation5: '#2A575A',

    shadow: '#000000',
  },
};

export default colors;
