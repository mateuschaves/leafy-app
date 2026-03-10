export const theme = {
  colors: {
    primary: '#1B4332',
    primaryLight: '#40916C',
    primaryDark: '#081C15',
    secondary: '#52B788',
    accent: '#95D5B2',
    background: '#F8FAF9',
    surface: '#FFFFFF',
    text: {
      primary: '#1B4332',
      secondary: '#52B788',
      muted: '#95A09B',
      inverse: '#FFFFFF',
    },
    error: '#E63946',
    warning: '#F4A261',
    success: '#52B788',
    border: '#D8E8E1',
    card: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export type Theme = typeof theme;
