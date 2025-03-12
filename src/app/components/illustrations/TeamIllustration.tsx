'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function TeamIllustration({ index = 0 }: { index?: number }) {
  // Array of colors for different team members
  const colors = [
    { primary: '#1976d2', secondary: '#bbdefb', accent: '#2196f3' },
    { primary: '#f50057', secondary: '#fce4ec', accent: '#ff4081' },
    { primary: '#4caf50', secondary: '#e8f5e9', accent: '#66bb6a' },
    { primary: '#ff9800', secondary: '#fff3e0', accent: '#ffa726' },
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
      {/* Background pattern */}
      <defs>
        <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color.primary} strokeWidth="0.5" strokeOpacity="0.2" />
        </pattern>
      </defs>
      
      {/* Background with pattern */}
      <rect x="0" y="0" width="200" height="200" fill={color.secondary} />
      <rect x="0" y="0" width="200" height="200" fill={`url(#grid-${index})`} />
      
      {/* Decorative elements */}
      <circle cx="25" cy="25" r="8" fill={color.primary} opacity="0.3" />
      <circle cx="175" cy="175" r="12" fill={color.primary} opacity="0.3" />
      <circle cx="175" cy="25" r="5" fill={color.primary} opacity="0.3" />
      <circle cx="25" cy="175" r="7" fill={color.primary} opacity="0.3" />
      
      {/* Person silhouette - more modern and abstract */}
      <g transform="translate(100, 85) scale(0.85)">
        {/* Head */}
        <circle cx="0" cy="-25" r="25" fill={color.primary} />
        
        {/* Body */}
        <path 
          d="M -20,0 Q 0,10 20,0 L 15,60 Q 0,70 -15,60 Z" 
          fill={color.primary} 
        />
        
        {/* Arms */}
        <path 
          d="M -18,5 C -35,15 -40,35 -30,40" 
          fill="none" 
          stroke={color.primary} 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <path 
          d="M 18,5 C 35,15 40,35 30,40" 
          fill="none" 
          stroke={color.primary} 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        
        {/* Face elements */}
        <circle cx="-8" cy="-30" r="3" fill="white" />
        <circle cx="8" cy="-30" r="3" fill="white" />
        
        {/* Smile - different for each team member */}
        {index === 0 && (
          <path d="M -10,-20 Q 0,-10 10,-20" fill="none" stroke="white" strokeWidth="2" />
        )}
        {index === 1 && (
          <path d="M -10,-15 Q 0,-5 10,-15" fill="none" stroke="white" strokeWidth="2" />
        )}
        {index === 2 && (
          <path d="M -8,-18 Q 0,-8 8,-18" fill="none" stroke="white" strokeWidth="2" />
        )}
        {index === 3 && (
          <path d="M -12,-17 Q 0,-7 12,-17" fill="none" stroke="white" strokeWidth="2" />
        )}
        
        {/* Accent details - different for each team member */}
        {index === 0 && (
          <path d="M -15,-45 L 15,-45" stroke={color.accent} strokeWidth="5" strokeLinecap="round" />
        )}
        {index === 1 && (
          <circle cx="0" cy="-50" r="5" fill={color.accent} />
        )}
        {index === 2 && (
          <path d="M -15,-45 L 0,-55 L 15,-45" fill="none" stroke={color.accent} strokeWidth="3" />
        )}
        {index === 3 && (
          <rect x="-10" y="-55" width="20" height="7" rx="3.5" fill={color.accent} />
        )}
      </g>
      
      {/* Badge/name tag */}
      <rect x="50" y="150" width="100" height="25" rx="12.5" fill="white" stroke={color.primary} strokeWidth="1" />
      <line x1="60" y1="162.5" x2="140" y2="162.5" stroke={color.primary} strokeWidth="2" strokeDasharray={index === 1 || index === 3 ? "2,2" : "none"} />
    </Box>
  );
} 