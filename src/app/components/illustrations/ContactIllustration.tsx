'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function ContactIllustration() {
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
      
      {/* Envelope */}
      <rect x="100" y="100" width="300" height="200" fill="#ffffff" stroke="#1976d2" strokeWidth="5" rx="10" />
      <path d="M100,100 L250,200 L400,100" fill="none" stroke="#1976d2" strokeWidth="5" />
      <path d="M100,300 L200,200" fill="none" stroke="#1976d2" strokeWidth="5" />
      <path d="M400,300 L300,200" fill="none" stroke="#1976d2" strokeWidth="5" />
      
      {/* Phone */}
      <rect x="150" y="150" width="80" height="140" fill="#f50057" rx="10" />
      <rect x="160" y="160" width="60" height="100" fill="#ffffff" rx="5" />
      <circle cx="190" cy="280" r="10" fill="#ffffff" />
      
      {/* Chat bubbles */}
      <rect x="250" y="150" width="120" height="60" fill="#4caf50" rx="10" />
      <polygon points="250,210 260,190 270,210" fill="#4caf50" />
      <rect x="270" y="220" width="120" height="60" fill="#ff9800" rx="10" />
      <polygon points="390,280 380,260 370,280" fill="#ff9800" />
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="20" fill="#1976d2" opacity="0.5" />
      <circle cx="450" cy="350" r="25" fill="#f50057" opacity="0.5" />
      <circle cx="400" cy="80" r="15" fill="#4caf50" opacity="0.5" />
      
      {/* Email icon */}
      <circle cx="80" cy="350" r="30" fill="#1976d2" />
      <path d="M60,350 L80,365 L100,350" fill="none" stroke="#ffffff" strokeWidth="3" />
      <rect x="60" y="335" width="40" height="30" fill="none" stroke="#ffffff" strokeWidth="3" rx="3" />
    </Box>
  );
} 