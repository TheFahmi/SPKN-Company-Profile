'use client';

import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import Image from 'next/image';

interface LoadingScreenProps {
  minDisplayTime?: number; // Waktu minimum tampilan loading dalam ms
}

export default function LoadingScreen({ minDisplayTime = 1500 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  if (!isVisible) return null;

  return (
    <Fade in={isVisible} timeout={800}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 180,
              height: 180,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                },
                '50%': {
                  transform: 'scale(1.05)',
                },
                '100%': {
                  transform: 'scale(1)',
                },
              },
            }}
          >
            <Image
              src="https://spkn.co.id/wp-content/uploads/elementor/thumbs/LOGO-SPKN-NEW-300x274-removebg-preview-1-qfqh90c9we3vc1w52kgko3f13r707nf8egy7ksj0fc.png"
              alt="PT SPKN Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </Box>
          
          <CircularProgress 
            size={40} 
            thickness={4} 
            color="primary" 
            sx={{ mt: 2 }} 
          />
          
          <Typography 
            variant="h6" 
            color="text.primary" 
            sx={{ 
              fontWeight: 500,
              opacity: 0.9,
              mt: 1,
              textAlign: 'center',
              animation: 'fadeInOut 2s infinite',
              '@keyframes fadeInOut': {
                '0%': {
                  opacity: 0.6,
                },
                '50%': {
                  opacity: 1,
                },
                '100%': {
                  opacity: 0.6,
                },
              },
            }}
          >
            Memuat Konten...
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
} 