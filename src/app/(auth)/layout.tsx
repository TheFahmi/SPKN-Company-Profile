'use client';

import { Box } from '@mui/material';
import { ThemeProvider } from '@/app/contexts/ThemeContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Box>
        {children}
      </Box>
    </ThemeProvider>
  );
} 