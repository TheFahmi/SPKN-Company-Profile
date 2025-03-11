'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function TeamIllustration({ index = 0 }: { index?: number }) {
  // Array of colors for different team members
  const colors = [
    { primary: '#1976d2', secondary: '#bbdefb' },
    { primary: '#f50057', secondary: '#fce4ec' },
    { primary: '#4caf50', secondary: '#e8f5e9' },
    { primary: '#ff9800', secondary: '#fff3e0' },
  ];
  
  // Use the index to select a color, or default to the first one
  const color = colors[index % colors.length];

  return (
    <Box
      component="svg"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="200" height="200" fill={color.secondary} rx="10" />
      
      {/* Person */}
      <circle cx="100" cy="70" r="40" fill={color.primary} />
      
      {/* Face */}
      <circle cx="85" cy="60" r="5" fill="white" />
      <circle cx="115" cy="60" r="5" fill="white" />
      <path d="M85,85 Q100,100 115,85" fill="none" stroke="white" strokeWidth="3" />
      
      {/* Body */}
      <rect x="70" y="110" width="60" height="80" fill={color.primary} rx="10" />
      
      {/* Arms */}
      <rect x="40" y="120" width="30" height="15" fill={color.primary} rx="5" />
      <rect x="130" y="120" width="30" height="15" fill={color.primary} rx="5" />
      
      {/* Decorative elements */}
      <circle cx="30" cy="30" r="10" fill={color.primary} opacity="0.5" />
      <circle cx="170" cy="170" r="15" fill={color.primary} opacity="0.5" />
      
      {/* Name tag */}
      <rect x="50" y="150" width="100" height="25" fill="white" rx="5" />
      <line x1="60" y1="162.5" x2="140" y2="162.5" stroke={color.primary} strokeWidth="2" />
    </Box>
  );
} 