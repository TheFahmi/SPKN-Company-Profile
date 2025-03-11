'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function HeroIllustration() {
  return (
    <Box
      component="svg"
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="500" height="400" fill="#f5f5f5" rx="10" />
      
      {/* Printer */}
      <rect x="100" y="200" width="300" height="120" fill="#1976d2" rx="10" />
      <rect x="120" y="220" width="260" height="60" fill="#ffffff" rx="5" />
      <rect x="150" y="180" width="200" height="20" fill="#1976d2" rx="5" />
      <circle cx="400" cy="230" r="10" fill="#f50057" />
      <circle cx="370" cy="230" r="10" fill="#4caf50" />
      
      {/* Books */}
      <rect x="150" y="100" width="40" height="60" fill="#ff9800" rx="2" />
      <rect x="200" y="80" width="40" height="80" fill="#f50057" rx="2" />
      <rect x="250" y="90" width="40" height="70" fill="#4caf50" rx="2" />
      <rect x="300" y="110" width="40" height="50" fill="#9c27b0" rx="2" />
      
      {/* Paper coming out of printer */}
      <rect x="150" y="290" width="200" height="30" fill="#ffffff" rx="2" />
      <line x1="170" y1="300" x2="330" y2="300" stroke="#cccccc" strokeWidth="2" />
      <line x1="170" y1="310" x2="330" y2="310" stroke="#cccccc" strokeWidth="2" />
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="20" fill="#1976d2" opacity="0.5" />
      <circle cx="450" cy="350" r="25" fill="#f50057" opacity="0.5" />
      <circle cx="400" cy="80" r="15" fill="#4caf50" opacity="0.5" />
    </Box>
  );
} 