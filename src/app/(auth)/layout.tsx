'use client';

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Buat tema default
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      dark: '#115293',
    },
  },
});

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </SessionProvider>
  );
} 