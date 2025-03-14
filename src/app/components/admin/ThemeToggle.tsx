'use client';

import { IconButton, Tooltip, Box, useTheme as useMuiTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@/app/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Tooltip title={mode === 'dark' ? 'Mode Terang' : 'Mode Gelap'}>
      <IconButton 
        onClick={toggleTheme} 
        sx={{ 
          ml: 1,
          width: 40,
          height: 40,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: (theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.05)' 
              : 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            backgroundColor: (theme) => 
              theme.palette.mode === 'light' 
                ? 'rgba(0, 0, 0, 0.1)' 
                : 'rgba(255, 255, 255, 0.1)',
          },
          transition: 'all 0.3s ease-in-out',
          border: '1px solid',
          borderColor: (theme) => 
            theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.08)' 
              : 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <Box
          component={motion.div}
          animate={{
            rotate: mode === 'dark' ? [0, 360] : [0, 360],
            scale: [0.8, 1],
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {mode === 'dark' ? (
            <LightModeIcon sx={{ 
              color: '#FFC107',
              filter: 'drop-shadow(0 0 2px rgba(255, 193, 7, 0.5))',
            }} />
          ) : (
            <DarkModeIcon sx={{ 
              color: muiTheme.palette.text.secondary,
              filter: 'drop-shadow(0 0 1px rgba(0, 0, 0, 0.2))',
            }} />
          )}
        </Box>
      </IconButton>
    </Tooltip>
  );
}