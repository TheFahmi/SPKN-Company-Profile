'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function ProductIllustration() {
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
      
      {/* Books */}
      <g transform="translate(50, 100)">
        <rect x="0" y="0" width="80" height="120" fill="#1976d2" rx="5" />
        <rect x="5" y="5" width="70" height="110" fill="#ffffff" rx="3" />
        <line x1="15" y1="30" x2="65" y2="30" stroke="#1976d2" strokeWidth="2" />
        <line x1="15" y1="50" x2="65" y2="50" stroke="#1976d2" strokeWidth="2" />
        <line x1="15" y1="70" x2="65" y2="70" stroke="#1976d2" strokeWidth="2" />
        <line x1="15" y1="90" x2="40" y2="90" stroke="#1976d2" strokeWidth="2" />
      </g>
      
      <g transform="translate(150, 80)">
        <rect x="0" y="0" width="80" height="140" fill="#f50057" rx="5" />
        <rect x="5" y="5" width="70" height="130" fill="#ffffff" rx="3" />
        <circle cx="40" cy="70" r="30" fill="#f50057" opacity="0.3" />
        <line x1="15" y1="110" x2="65" y2="110" stroke="#f50057" strokeWidth="2" />
        <line x1="15" y1="120" x2="40" y2="120" stroke="#f50057" strokeWidth="2" />
      </g>
      
      <g transform="translate(250, 120)">
        <rect x="0" y="0" width="80" height="100" fill="#4caf50" rx="5" />
        <rect x="5" y="5" width="70" height="90" fill="#ffffff" rx="3" />
        <rect x="15" y="15" width="50" height="30" fill="#4caf50" opacity="0.3" />
        <line x1="15" y1="60" x2="65" y2="60" stroke="#4caf50" strokeWidth="2" />
        <line x1="15" y1="70" x2="65" y2="70" stroke="#4caf50" strokeWidth="2" />
        <line x1="15" y1="80" x2="40" y2="80" stroke="#4caf50" strokeWidth="2" />
      </g>
      
      <g transform="translate(350, 90)">
        <rect x="0" y="0" width="80" height="130" fill="#ff9800" rx="5" />
        <rect x="5" y="5" width="70" height="120" fill="#ffffff" rx="3" />
        <polygon points="40,20 20,50 60,50" fill="#ff9800" opacity="0.3" />
        <line x1="15" y1="70" x2="65" y2="70" stroke="#ff9800" strokeWidth="2" />
        <line x1="15" y1="80" x2="65" y2="80" stroke="#ff9800" strokeWidth="2" />
        <line x1="15" y1="90" x2="65" y2="90" stroke="#ff9800" strokeWidth="2" />
        <line x1="15" y1="100" x2="40" y2="100" stroke="#ff9800" strokeWidth="2" />
      </g>
      
      {/* Shelf */}
      <rect x="30" y="240" width="440" height="20" fill="#795548" rx="3" />
      <rect x="50" y="260" width="20" height="80" fill="#795548" rx="3" />
      <rect x="430" y="260" width="20" height="80" fill="#795548" rx="3" />
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="20" fill="#1976d2" opacity="0.5" />
      <circle cx="450" cy="350" r="25" fill="#f50057" opacity="0.5" />
      <circle cx="400" cy="50" r="15" fill="#4caf50" opacity="0.5" />
      
      {/* Magnifying glass */}
      <circle cx="100" cy="350" r="25" fill="none" stroke="#1976d2" strokeWidth="5" />
      <line x1="120" y1="370" x2="140" y2="390" stroke="#1976d2" strokeWidth="5" />
    </Box>
  );
} 