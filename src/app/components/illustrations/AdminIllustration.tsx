'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function AdminIllustration() {
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
      
      {/* Computer/Dashboard */}
      <rect x="100" y="100" width="300" height="200" fill="#1976d2" rx="10" />
      <rect x="110" y="110" width="280" height="160" fill="#ffffff" rx="5" />
      
      {/* Screen Content - Dashboard */}
      <rect x="130" y="130" width="100" height="60" fill="#bbdefb" rx="5" />
      <rect x="140" y="150" width="80" height="10" fill="#1976d2" />
      <rect x="140" y="170" width="40" height="10" fill="#1976d2" />
      
      <rect x="240" y="130" width="100" height="60" fill="#e8f5e9" rx="5" />
      <rect x="250" y="150" width="80" height="10" fill="#4caf50" />
      <rect x="250" y="170" width="40" height="10" fill="#4caf50" />
      
      <rect x="130" y="200" width="210" height="50" fill="#fce4ec" rx="5" />
      <rect x="140" y="210" width="190" height="10" fill="#f50057" />
      <rect x="140" y="230" width="100" height="10" fill="#f50057" />
      
      {/* Computer Stand */}
      <rect x="230" y="300" width="40" height="20" fill="#1976d2" />
      <rect x="220" y="320" width="60" height="10" fill="#1976d2" rx="3" />
      
      {/* Person */}
      <circle cx="400" cy="150" r="30" fill="#f50057" />
      <rect x="385" y="180" width="30" height="60" fill="#f50057" rx="5" />
      <rect x="370" y="200" width="20" height="10" fill="#f50057" rx="5" />
      <rect x="410" y="200" width="20" height="10" fill="#f50057" rx="5" />
      <rect x="385" y="240" width="15" height="30" fill="#f50057" rx="3" />
      <rect x="400" y="240" width="15" height="30" fill="#f50057" rx="3" />
      
      {/* Admin Badge */}
      <rect x="50" y="150" width="80" height="30" fill="#ff9800" rx="15" />
      <text x="90" y="170" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">ADMIN</text>
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="20" fill="#1976d2" opacity="0.5" />
      <circle cx="450" cy="350" r="25" fill="#f50057" opacity="0.5" />
      <circle cx="400" cy="50" r="15" fill="#4caf50" opacity="0.5" />
    </Box>
  );
} 