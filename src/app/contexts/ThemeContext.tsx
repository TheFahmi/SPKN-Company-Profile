'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Cek localStorage saat inisialisasi
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    // Ambil preferensi tema dari localStorage atau settings API
    const fetchThemePreference = async () => {
      try {
        // Cek localStorage dulu
        const localTheme = localStorage.getItem('darkMode');
        if (localTheme !== null) {
          setDarkMode(JSON.parse(localTheme));
          return;
        }

        // Jika tidak ada di localStorage, ambil dari API
        const response = await fetch('/api/admin/settings');
        const data = await response.json();
        const newDarkMode = Boolean(data.darkMode);
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      } catch (error) {
        console.error('Error fetching theme preference:', error);
      }
    };

    fetchThemePreference();
  }, []);

  // Update localStorage setiap kali darkMode berubah
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = async () => {
    try {
      const newDarkMode = !darkMode;
      
      // Update di localStorage
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      
      // Update di server
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          darkMode: newDarkMode,
        }),
      });

      setDarkMode(newDarkMode);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
        dark: darkMode ? '#42a5f5' : '#1565c0',
        light: darkMode ? '#e3f2fd' : '#42a5f5',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#dc004e',
        dark: darkMode ? '#ed4b82' : '#9a0036',
        light: darkMode ? '#fce4ec' : '#e33371',
      },
      background: {
        default: darkMode ? '#0a0a0a' : '#f5f5f5',
        paper: darkMode ? '#121212' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
        secondary: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      },
      divider: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      action: {
        active: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.54)',
        hover: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        selected: darkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
        disabled: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.26)',
        disabledBackground: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            backgroundColor: darkMode ? '#0a0a0a' : '#f5f5f5',
            color: darkMode ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
            margin: 0,
            padding: 0,
            minHeight: '100vh',
          },
          '*': {
            boxSizing: 'border-box',
          },
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: darkMode ? '#1e1e1e' : '#f1f1f1',
          },
          '*::-webkit-scrollbar-thumb': {
            background: darkMode ? '#333' : '#888',
            borderRadius: '4px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: darkMode ? '#444' : '#555',
          },
        },
      },
      MuiBox: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            '&.MuiBox-root': {
              backgroundColor: darkMode ? '#0a0a0a' : '#f5f5f5',
            },
          },
        },
        defaultProps: {
          sx: {
            backgroundColor: darkMode ? '#0a0a0a' : '#f5f5f5',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: darkMode ? '#ffffff' : 'inherit',
          },
          h4: {
            color: darkMode ? '#ffffff' : 'inherit',
          },
          h6: {
            color: darkMode ? '#ffffff' : 'inherit',
          },
          subtitle1: {
            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&.MuiButton-contained': {
              backgroundColor: darkMode ? '#1e1e1e' : undefined,
              color: darkMode ? '#ffffff' : undefined,
              '&:hover': {
                backgroundColor: darkMode ? '#2c2c2c' : undefined,
              },
            },
            '&.MuiButton-outlined': {
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.23)' : undefined,
              color: darkMode ? '#ffffff' : undefined,
            },
            '&.MuiButton-text': {
              color: darkMode ? '#90caf9' : undefined,
            },
          },
        },
        defaultProps: {
          disableElevation: darkMode,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: darkMode ? '#ffffff' : undefined,
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : undefined,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: darkMode ? '#121212' : '#ffffff',
            '&.MuiPaper-elevation1': {
              boxShadow: darkMode ? '0px 2px 1px -1px rgba(255,255,255,0.1),0px 1px 1px 0px rgba(255,255,255,0.07),0px 1px 3px 0px rgba(255,255,255,0.06)' : undefined,
            },
          },
        },
        defaultProps: {
          elevation: darkMode ? 2 : 1,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: darkMode ? '#121212' : '#ffffff',
            '& .MuiCardHeader-root': {
              backgroundColor: darkMode ? '#121212' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
            },
            '& .MuiCardContent-root': {
              backgroundColor: darkMode ? '#121212' : '#ffffff',
              color: darkMode ? '#ffffff' : '#000000',
            },
            '& .MuiTypography-root': {
              color: darkMode ? '#ffffff' : 'inherit',
            },
            '& .MuiSvgIcon-root': {
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined,
            },
            '& .stat-card': {
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
              '& .MuiTypography-root': {
                color: darkMode ? '#ffffff' : 'inherit',
              },
              '& .MuiSvgIcon-root': {
                color: (theme: any) => theme.palette.primary.main,
              },
            },
            '& .stat-value': {
              color: darkMode ? '#90caf9' : '#1976d2',
            },
            '& .stat-label': {
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
            },
            '& .stat-icon': {
              backgroundColor: darkMode ? 'rgba(144, 202, 249, 0.2)' : 'rgba(25, 118, 210, 0.1)',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
            backgroundColor: darkMode ? '#121212' : '#ffffff',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#121212' : '#ffffff',
            '&.Mui-selected': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
            },
            '&:hover': {
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            },
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? 'rgba(144, 202, 249, 0.2)' : 'rgba(25, 118, 210, 0.1)',
            color: darkMode ? '#90caf9' : '#1976d2',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: darkMode ? '#ffffff' : 'inherit',
          },
          secondary: {
            color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
} 