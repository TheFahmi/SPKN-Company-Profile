'use client';

import React from 'react';
import { Box } from '@mui/material';

interface TeamIllustrationProps {
  index: number;
}

const TeamIllustration: React.FC<TeamIllustrationProps> = ({ index }) => {
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
    <Box sx={{ width: "100%", height: "100%" }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Shape */}
        <circle cx="100" cy="100" r="100" fill={color.secondary} />

        {/* Head */}
        <circle cx="100" cy="70" r="40" fill={color.primary} opacity="0.9" />

        {/* Body */}
        <path
          d="M60 180C60 146.863 77.9086 120 100 120C122.091 120 140 146.863 140 180H60Z"
          fill={color.primary}
          opacity="0.8"
        />

        {/* Decorative Elements */}
        <circle cx="85" cy="65" r="5" fill="white" opacity="0.7" />
        <circle cx="115" cy="65" r="5" fill="white" opacity="0.7" />
        
        {/* Different patterns based on index */}
        {index === 0 && (
          <>
            <rect x="90" y="80" width="20" height="5" rx="2.5" fill="white" opacity="0.7" />
            <path d="M70 50 L80 40 L90 50" stroke="white" strokeWidth="3" opacity="0.5" />
            <path d="M130 50 L120 40 L110 50" stroke="white" strokeWidth="3" opacity="0.5" />
          </>
        )}
        
        {index === 1 && (
          <>
            <path d="M90 80 Q100 90 110 80" stroke="white" strokeWidth="3" opacity="0.7" />
            <circle cx="80" cy="50" r="5" fill="white" opacity="0.5" />
            <circle cx="120" cy="50" r="5" fill="white" opacity="0.5" />
          </>
        )}
        
        {index === 2 && (
          <>
            <rect x="90" y="80" width="20" height="5" rx="2.5" fill="white" opacity="0.7" />
            <rect x="75" y="50" width="10" height="10" fill="white" opacity="0.5" />
            <rect x="115" y="50" width="10" height="10" fill="white" opacity="0.5" />
          </>
        )}
        
        {index === 3 && (
          <>
            <path d="M90 85 Q100 75 110 85" stroke="white" strokeWidth="3" opacity="0.7" />
            <path d="M75 55 L85 45 L95 55" stroke="white" strokeWidth="3" opacity="0.5" />
            <path d="M125 55 L115 45 L105 55" stroke="white" strokeWidth="3" opacity="0.5" />
          </>
        )}
      </svg>
    </Box>
  );
};

export default TeamIllustration; 