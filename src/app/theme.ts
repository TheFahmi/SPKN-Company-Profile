import { createTheme, alpha } from '@mui/material/styles';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    ...(mode === 'light' ? {
      // Light mode colors - more elegant and sophisticated palette
      primary: {
        main: '#2E5077', // Deep blue
        light: '#4A78B8',
        dark: '#1A365D',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#C8553D', // Terracotta
        light: '#E87A63',
        dark: '#A33D29',
        contrastText: '#ffffff',
      },
      background: {
        default: '#F8F9FC',
        paper: '#ffffff',
      },
      text: {
        primary: '#2A2F45',
        secondary: '#5A6178',
      },
      divider: 'rgba(0, 0, 0, 0.08)',
      error: {
        main: '#D32F2F',
        light: '#EF5350',
        dark: '#C62828',
      },
      warning: {
        main: '#ED6C02',
        light: '#FF9800',
        dark: '#E65100',
      },
      info: {
        main: '#0288D1',
        light: '#03A9F4',
        dark: '#01579B',
      },
      success: {
        main: '#2E7D32',
        light: '#4CAF50',
        dark: '#1B5E20',
      },
    } : {
      // Dark mode colors - elegant dark theme
      primary: {
        main: '#6D9EEB',
        light: '#9CC2FF',
        dark: '#4A78B8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#F19E8D',
        light: '#FFBCAD',
        dark: '#C8553D',
        contrastText: '#000000',
      },
      background: {
        default: '#121826',
        paper: '#1A2235',
      },
      text: {
        primary: '#E8EAF6',
        secondary: '#B0B8D1',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    }),
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1A2235' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#2A2F45',
          boxShadow: mode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 2px 10px rgba(0, 0, 0, 0.03)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 20px',
          transition: 'all 0.2s ease-in-out',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
        containedPrimary: {
          background: mode === 'dark' 
            ? 'linear-gradient(135deg, #6D9EEB 0%, #4A78B8 100%)' 
            : 'linear-gradient(135deg, #2E5077 0%, #1A365D 100%)',
        },
        containedSecondary: {
          background: mode === 'dark' 
            ? 'linear-gradient(135deg, #F19E8D 0%, #C8553D 100%)' 
            : 'linear-gradient(135deg, #C8553D 0%, #A33D29 100%)',
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1A2235' : '#ffffff',
          boxShadow: mode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: mode === 'dark' 
              ? '0 8px 30px rgba(0, 0, 0, 0.4)' 
              : '0 8px 30px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: mode === 'dark' 
            ? '0 2px 10px rgba(0, 0, 0, 0.3)' 
            : '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: mode === 'dark' 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1A2235' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#2A2F45',
          borderRight: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.Mui-selected': {
            backgroundColor: mode === 'dark' ? 'rgba(109, 158, 235, 0.15)' : 'rgba(46, 80, 119, 0.1)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          '@media (min-width: 600px)': {
            paddingLeft: '32px',
            paddingRight: '32px',
          },
        },
      },
    },
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.05)',
    '0 4px 8px rgba(0,0,0,0.05)',
    '0 6px 12px rgba(0,0,0,0.05)',
    '0 8px 16px rgba(0,0,0,0.05)',
    '0 10px 20px rgba(0,0,0,0.05)',
    '0 12px 24px rgba(0,0,0,0.05)',
    '0 14px 28px rgba(0,0,0,0.05)',
    '0 16px 32px rgba(0,0,0,0.05)',
    '0 18px 36px rgba(0,0,0,0.05)',
    '0 20px 40px rgba(0,0,0,0.05)',
    '0 22px 44px rgba(0,0,0,0.05)',
    '0 24px 48px rgba(0,0,0,0.05)',
    '0 26px 52px rgba(0,0,0,0.05)',
    '0 28px 56px rgba(0,0,0,0.05)',
    '0 30px 60px rgba(0,0,0,0.05)',
    '0 32px 64px rgba(0,0,0,0.05)',
    '0 34px 68px rgba(0,0,0,0.05)',
    '0 36px 72px rgba(0,0,0,0.05)',
    '0 38px 76px rgba(0,0,0,0.05)',
    '0 40px 80px rgba(0,0,0,0.05)',
    '0 42px 84px rgba(0,0,0,0.05)',
    '0 44px 88px rgba(0,0,0,0.05)',
    '0 46px 92px rgba(0,0,0,0.05)',
    '0 48px 96px rgba(0,0,0,0.05)',
  ],
});

export default getTheme;