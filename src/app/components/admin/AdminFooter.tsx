'use client';

import { Box, Typography, Divider, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';

export default function AdminFooter() {
  const [pageLoadTime, setPageLoadTime] = useState<string>('');
  const currentYear = new Date().getFullYear();
  
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
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'light' 
            ? theme.palette.grey[100] 
            : theme.palette.grey[900],
      }}
    >
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {currentYear} PT. Sarana Pancakarya Nusa. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Loaded: {pageLoadTime}
        </Typography>
      </Box>
    </Box>
  );
} 