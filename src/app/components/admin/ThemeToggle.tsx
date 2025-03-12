'use client';

import { IconButton, Tooltip, Box, useTheme as useMuiTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Tooltip title={mode === 'dark' ? 'Mode Terang' : 'Mode Gelap'}>
      <IconButton 
        onClick={toggleTheme} 
        sx={{ 
          ml: 1,
          width: 36,
          height: 36,
          backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.04)' 
              : 'rgba(255, 255, 255, 0.04)',
          '&:hover': {
            backgroundColor: (theme) => 
              theme.palette.mode === 'light' 
                ? 'rgba(0, 0, 0, 0.08)' 
                : 'rgba(255, 255, 255, 0.08)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {mode === 'dark' ? (
          <LightModeIcon sx={{ color: '#FFC107' }} />
        ) : (
          <DarkModeIcon sx={{ color: muiTheme.palette.text.secondary }} />
        )}
      </IconButton>
    </Tooltip>
  );
}