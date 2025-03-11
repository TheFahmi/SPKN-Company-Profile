'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Buat tema default
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    error: {
      main: '#d32f2f',
    },
  },
});

export default function ErrorPagesLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 