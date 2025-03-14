import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import getTheme from '../app/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
}

// Fallback theme jika getTheme gagal
const fallbackTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  mode = 'light' 
}) => {
  // Gunakan try-catch untuk menangani error saat mendapatkan tema
  let theme;
  try {
    theme = getTheme(mode);
  } catch (error) {
    console.error('Error loading theme, using fallback theme:', error);
    theme = fallbackTheme;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider; 