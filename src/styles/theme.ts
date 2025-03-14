import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// Definisi font
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Definisi warna
const colors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#0d47a1',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#f50057',
    light: '#ff4081',
    dark: '#c51162',
    contrastText: '#ffffff',
  },
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: '#ffffff',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    light: '#f5f5f5',
    dark: '#f0f0f0',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Definisi spasi
const spacing = 8;

// Definisi breakpoints
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

// Definisi radius
const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  extraLarge: 16,
  round: '50%',
};

// Definisi shadows
const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.05)',
  '0px 3px 1px -2px rgba(0,0,0,0.05),0px 2px 2px 0px rgba(0,0,0,0.03),0px 1px 5px 0px rgba(0,0,0,0.05)',
  '0px 3px 3px -2px rgba(0,0,0,0.05),0px 3px 4px 0px rgba(0,0,0,0.03),0px 1px 8px 0px rgba(0,0,0,0.05)',
  '0px 2px 4px -1px rgba(0,0,0,0.05),0px 4px 5px 0px rgba(0,0,0,0.03),0px 1px 10px 0px rgba(0,0,0,0.05)',
  '0px 3px 5px -1px rgba(0,0,0,0.05),0px 5px 8px 0px rgba(0,0,0,0.03),0px 1px 14px 0px rgba(0,0,0,0.05)',
  '0px 3px 5px -1px rgba(0,0,0,0.05),0px 6px 10px 0px rgba(0,0,0,0.03),0px 1px 18px 0px rgba(0,0,0,0.05)',
  '0px 4px 5px -2px rgba(0,0,0,0.05),0px 7px 10px 1px rgba(0,0,0,0.03),0px 2px 16px 1px rgba(0,0,0,0.05)',
  '0px 5px 5px -3px rgba(0,0,0,0.05),0px 8px 10px 1px rgba(0,0,0,0.03),0px 3px 14px 2px rgba(0,0,0,0.05)',
  '0px 5px 6px -3px rgba(0,0,0,0.05),0px 9px 12px 1px rgba(0,0,0,0.03),0px 3px 16px 2px rgba(0,0,0,0.05)',
  '0px 6px 6px -3px rgba(0,0,0,0.05),0px 10px 14px 1px rgba(0,0,0,0.03),0px 4px 18px 3px rgba(0,0,0,0.05)',
  '0px 6px 7px -4px rgba(0,0,0,0.05),0px 11px 15px 1px rgba(0,0,0,0.03),0px 4px 20px 3px rgba(0,0,0,0.05)',
  '0px 7px 8px -4px rgba(0,0,0,0.05),0px 12px 17px 2px rgba(0,0,0,0.03),0px 5px 22px 4px rgba(0,0,0,0.05)',
  '0px 7px 8px -4px rgba(0,0,0,0.05),0px 13px 19px 2px rgba(0,0,0,0.03),0px 5px 24px 4px rgba(0,0,0,0.05)',
  '0px 7px 9px -4px rgba(0,0,0,0.05),0px 14px 21px 2px rgba(0,0,0,0.03),0px 5px 26px 4px rgba(0,0,0,0.05)',
  '0px 8px 9px -5px rgba(0,0,0,0.05),0px 15px 22px 2px rgba(0,0,0,0.03),0px 6px 28px 5px rgba(0,0,0,0.05)',
  '0px 8px 10px -5px rgba(0,0,0,0.05),0px 16px 24px 2px rgba(0,0,0,0.03),0px 6px 30px 5px rgba(0,0,0,0.05)',
  '0px 8px 11px -5px rgba(0,0,0,0.05),0px 17px 26px 2px rgba(0,0,0,0.03),0px 6px 32px 5px rgba(0,0,0,0.05)',
  '0px 9px 11px -5px rgba(0,0,0,0.05),0px 18px 28px 2px rgba(0,0,0,0.03),0px 7px 34px 6px rgba(0,0,0,0.05)',
  '0px 9px 12px -6px rgba(0,0,0,0.05),0px 19px 29px 2px rgba(0,0,0,0.03),0px 7px 36px 6px rgba(0,0,0,0.05)',
  '0px 10px 13px -6px rgba(0,0,0,0.05),0px 20px 31px 3px rgba(0,0,0,0.03),0px 8px 38px 7px rgba(0,0,0,0.05)',
  '0px 10px 13px -6px rgba(0,0,0,0.05),0px 21px 33px 3px rgba(0,0,0,0.03),0px 8px 40px 7px rgba(0,0,0,0.05)',
  '0px 10px 14px -6px rgba(0,0,0,0.05),0px 22px 35px 3px rgba(0,0,0,0.03),0px 8px 42px 7px rgba(0,0,0,0.05)',
  '0px 11px 14px -7px rgba(0,0,0,0.05),0px 23px 36px 3px rgba(0,0,0,0.03),0px 9px 44px 8px rgba(0,0,0,0.05)',
  '0px 11px 15px -7px rgba(0,0,0,0.05),0px 24px 38px 3px rgba(0,0,0,0.03),0px 9px 46px 8px rgba(0,0,0,0.05)',
];

// Definisi transisi
const transitions = {
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};

// Membuat tema dasar
let theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    grey: colors.grey,
    text: colors.text,
    background: colors.background,
    divider: colors.divider,
  },
  spacing,
  breakpoints: {
    values: breakpoints.values,
  },
  shape: {
    borderRadius: borderRadius.medium,
  },
  shadows,
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  transitions,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: shadows[2],
          '&:hover': {
            boxShadow: shadows[4],
          },
        },
        sizeLarge: {
          padding: '10px 22px',
          fontSize: '1rem',
        },
        containedPrimary: {
          background: `linear-gradient(45deg, ${colors.primary.main}, ${colors.primary.light})`,
        },
        containedSecondary: {
          background: `linear-gradient(45deg, ${colors.secondary.main}, ${colors.secondary.light})`,
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.large,
          boxShadow: shadows[2],
          overflow: 'hidden',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: spacing * 3,
          '&:last-child': {
            paddingBottom: spacing * 3,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.medium,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.large,
        },
        elevation1: {
          boxShadow: shadows[1],
        },
        elevation2: {
          boxShadow: shadows[2],
        },
        elevation3: {
          boxShadow: shadows[3],
        },
        elevation4: {
          boxShadow: shadows[4],
        },
        elevation5: {
          boxShadow: shadows[5],
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: shadows[3],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minWidth: 100,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.medium,
        },
        standardSuccess: {
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          color: colors.success.dark,
        },
        standardError: {
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          color: colors.error.dark,
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          color: colors.warning.dark,
        },
        standardInfo: {
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          color: colors.info.dark,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: spacing * 1.5,
        },
        head: {
          fontWeight: 600,
          backgroundColor: colors.background.light,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: `${spacing * 2}px 0`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(33, 33, 33, 0.9)',
          borderRadius: borderRadius.small,
          padding: `${spacing}px ${spacing * 1.5}px`,
          fontSize: '0.75rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.large,
          boxShadow: shadows[10],
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: spacing * 3,
          paddingBottom: spacing,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: spacing * 3,
          paddingTop: spacing * 2,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: spacing * 3,
          paddingTop: spacing,
        },
      },
    },
  },
});

// Membuat tema responsif
theme = responsiveFontSizes(theme);

export default theme; 