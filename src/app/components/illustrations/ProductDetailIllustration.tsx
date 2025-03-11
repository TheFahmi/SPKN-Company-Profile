'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function ProductDetailIllustration({ index = 0 }: { index?: number }) {
  // Array of colors for different products
  const colors = [
    { primary: '#1976d2', secondary: '#bbdefb', accent: '#ff9800' },
    { primary: '#f50057', secondary: '#fce4ec', accent: '#4caf50' },
    { primary: '#4caf50', secondary: '#e8f5e9', accent: '#f50057' },
    { primary: '#ff9800', secondary: '#fff3e0', accent: '#1976d2' },
  ];
  
  // Use the index to select a color, or default to the first one
  const color = colors[index % colors.length];

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
      <rect x="0" y="0" width="500" height="400" fill={color.secondary} rx="10" />
      
      {/* Book or Product */}
      <g transform="translate(150, 50)">
        <rect x="0" y="0" width="200" height="300" fill={color.primary} rx="10" />
        <rect x="10" y="10" width="180" height="280" fill="white" rx="5" />
        
        {/* Content based on index */}
        {index % 4 === 0 && (
          // Book with lines
          <>
            <line x1="30" y1="50" x2="170" y2="50" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="80" x2="170" y2="80" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="110" x2="170" y2="110" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="140" x2="170" y2="140" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="170" x2="170" y2="170" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="200" x2="100" y2="200" stroke={color.primary} strokeWidth="3" />
            
            <rect x="30" y="230" width="140" height="40" fill={color.accent} rx="5" />
          </>
        )}
        
        {index % 4 === 1 && (
          // Magazine with image
          <>
            <rect x="30" y="30" width="140" height="100" fill={color.accent} opacity="0.5" rx="5" />
            <line x1="30" y1="150" x2="170" y2="150" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="170" x2="170" y2="170" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="190" x2="170" y2="190" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="210" x2="100" y2="210" stroke={color.primary} strokeWidth="3" />
            
            <rect x="30" y="230" width="140" height="40" fill={color.accent} rx="5" />
          </>
        )}
        
        {index % 4 === 2 && (
          // Catalog with grid
          <>
            <rect x="30" y="30" width="60" height="60" fill={color.accent} opacity="0.5" rx="5" />
            <rect x="100" y="30" width="60" height="60" fill={color.primary} opacity="0.3" rx="5" />
            <rect x="30" y="100" width="60" height="60" fill={color.primary} opacity="0.3" rx="5" />
            <rect x="100" y="100" width="60" height="60" fill={color.accent} opacity="0.5" rx="5" />
            
            <line x1="30" y1="180" x2="170" y2="180" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="200" x2="170" y2="200" stroke={color.primary} strokeWidth="3" />
            <line x1="30" y1="220" x2="100" y2="220" stroke={color.primary} strokeWidth="3" />
            
            <rect x="30" y="240" width="140" height="30" fill={color.accent} rx="5" />
          </>
        )}
        
        {index % 4 === 3 && (
          // Calendar
          <>
            <rect x="30" y="30" width="140" height="30" fill={color.accent} opacity="0.7" rx="5" />
            
            <line x1="50" y1="70" x2="50" y2="200" stroke={color.primary} strokeWidth="1" />
            <line x1="90" y1="70" x2="90" y2="200" stroke={color.primary} strokeWidth="1" />
            <line x1="130" y1="70" x2="130" y2="200" stroke={color.primary} strokeWidth="1" />
            <line x1="170" y1="70" x2="170" y2="200" stroke={color.primary} strokeWidth="1" />
            
            <line x1="30" y1="90" x2="170" y2="90" stroke={color.primary} strokeWidth="1" />
            <line x1="30" y1="120" x2="170" y2="120" stroke={color.primary} strokeWidth="1" />
            <line x1="30" y1="150" x2="170" y2="150" stroke={color.primary} strokeWidth="1" />
            <line x1="30" y1="180" x2="170" y2="180" stroke={color.primary} strokeWidth="1" />
            
            <rect x="30" y="220" width="140" height="40" fill={color.accent} rx="5" />
          </>
        )}
      </g>
      
      {/* Magnifying glass */}
      <circle cx="80" cy="100" r="40" fill="none" stroke={color.primary} strokeWidth="8" />
      <line x1="110" y1="130" x2="140" y2="160" stroke={color.primary} strokeWidth="8" />
      
      {/* Specifications */}
      <rect x="50" y="200" width="80" height="15" fill={color.primary} rx="3" />
      <rect x="50" y="225" width="60" height="15" fill={color.primary} rx="3" />
      <rect x="50" y="250" width="70" height="15" fill={color.primary} rx="3" />
      <rect x="50" y="275" width="50" height="15" fill={color.primary} rx="3" />
      <rect x="50" y="300" width="65" height="15" fill={color.primary} rx="3" />
      
      {/* Decorative elements */}
      <circle cx="400" cy="80" r="20" fill={color.primary} opacity="0.5" />
      <circle cx="420" cy="320" r="25" fill={color.accent} opacity="0.5" />
      <circle cx="50" cy="350" r="15" fill={color.primary} opacity="0.5" />
    </Box>
  );
} 