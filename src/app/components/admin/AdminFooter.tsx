'use client';

import { Box, Typography, Divider, useTheme, alpha, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import { AccessTime as AccessTimeIcon, Copyright as CopyrightIcon } from '@mui/icons-material';

export default function AdminFooter() {
  const [pageLoadTime, setPageLoadTime] = useState<string>('');
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  
  // Mengukur waktu pemuatan halaman
  useEffect(() => {
    const loadTime = 
      window.performance && 
      window.performance.timing && 
      window.performance.timing.domContentLoadedEventEnd && 
      window.performance.timing.navigationStart
        ? (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000
        : 0;
    
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    setPageLoadTime(`${hours}:${minutes}:${seconds} (${loadTime.toFixed(2)}s)`);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        py: 3, 
        px: 3,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.default, 0.8),
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.06)',
        borderRadius: '16px 16px 0 0',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CopyrightIcon 
            sx={{ 
              fontSize: 16, 
              mr: 1, 
              color: theme.palette.text.secondary 
            }} 
          />
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}
          >
            {currentYear} PT. Sarana Pancakarya Nusa
          </Typography>
        </Box>
        
        <Chip
          icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
          label={`Loaded: ${pageLoadTime}`}
          size="small"
          sx={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontSize: '0.75rem',
            height: 28,
            '& .MuiChip-icon': {
              color: theme.palette.primary.main,
            },
          }}
        />
      </Box>
    </Box>
  );
}