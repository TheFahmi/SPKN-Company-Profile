'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function ProductCard({ index = 0 }: { index?: number }) {
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
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="300" height="200" fill={color.secondary} rx="10" />
      
      {/* Book or Product */}
      <rect x="50" y="30" width="200" height="140" fill={color.primary} rx="5" />
      <rect x="60" y="40" width="180" height="120" fill="white" rx="3" />
      
      {/* Content based on index */}
      {index % 4 === 0 && (
        // Book with lines
        <>
          <line x1="80" y1="70" x2="220" y2="70" stroke={color.primary} strokeWidth="2" />
          <line x1="80" y1="90" x2="220" y2="90" stroke={color.primary} strokeWidth="2" />
          <line x1="80" y1="110" x2="220" y2="110" stroke={color.primary} strokeWidth="2" />
          <line x1="80" y1="130" x2="150" y2="130" stroke={color.primary} strokeWidth="2" />
        </>
      )}
      
      {index % 4 === 1 && (
        // Magazine with image
        <>
          <rect x="80" y="60" width="140" height="70" fill={color.accent} opacity="0.3" rx="3" />
          <line x1="80" y1="140" x2="220" y2="140" stroke={color.primary} strokeWidth="2" />
        </>
      )}
      
      {index % 4 === 2 && (
        // Catalog with grid
        <>
          <rect x="80" y="60" width="60" height="60" fill={color.accent} opacity="0.3" rx="3" />
          <rect x="150" y="60" width="60" height="60" fill={color.primary} opacity="0.3" rx="3" />
          <line x1="80" y1="130" x2="220" y2="130" stroke={color.primary} strokeWidth="2" />
          <line x1="80" y1="140" x2="150" y2="140" stroke={color.primary} strokeWidth="2" />
        </>
      )}
      
      {index % 4 === 3 && (
        // Calendar
        <>
          <rect x="80" y="60" width="140" height="20" fill={color.accent} opacity="0.5" rx="3" />
          <line x1="100" y1="90" x2="100" y2="140" stroke={color.primary} strokeWidth="1" />
          <line x1="140" y1="90" x2="140" y2="140" stroke={color.primary} strokeWidth="1" />
          <line x1="180" y1="90" x2="180" y2="140" stroke={color.primary} strokeWidth="1" />
          <line x1="80" y1="100" x2="220" y2="100" stroke={color.primary} strokeWidth="1" />
          <line x1="80" y1="120" x2="220" y2="120" stroke={color.primary} strokeWidth="1" />
        </>
      )}
      
      {/* Decorative elements */}
      <circle cx="30" cy="30" r="10" fill={color.primary} opacity="0.5" />
      <circle cx="270" cy="170" r="15" fill={color.accent} opacity="0.5" />
    </Box>
  );
} 