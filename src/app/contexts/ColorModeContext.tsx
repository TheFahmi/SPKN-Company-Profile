'use client';

import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Tipe untuk konteks mode warna
interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

// Membuat konteks dengan nilai default
const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

// Hook untuk menggunakan konteks mode warna
export const useColorMode = () => useContext(ColorModeContext);

// Provider untuk konteks mode warna
export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  // Menggunakan localStorage untuk menyimpan preferensi tema pengguna
  const [mode, setMode] = useState<PaletteMode>('light');

  // Memuat preferensi tema dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // Menggunakan preferensi sistem jika tidak ada preferensi tersimpan
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  // Fungsi untuk mengganti mode tema
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Membuat tema berdasarkan mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Konfigurasi tema terang
                primary: {
                  main: '#1976d2',
                },
                secondary: {
                  main: '#f50057',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                // Konfigurasi tema gelap
                primary: {
                  main: '#90caf9',
                },
                secondary: {
                  main: '#f48fb1',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                color: mode === 'light' ? '#333333' : '#ffffff',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
                borderRight: `1px solid ${
                  mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'
                }`,
              },
            },
          },
        },
      }),
    [mode]
  );

  // Nilai konteks
  const colorModeContextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorModeContextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext; 