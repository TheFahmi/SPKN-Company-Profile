'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function AboutIllustration() {
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
      
      {/* Building */}
      <rect x="100" y="100" width="300" height="200" fill="#1976d2" rx="5" />
      <rect x="120" y="120" width="80" height="80" fill="#ffffff" rx="3" />
      <rect x="220" y="120" width="80" height="80" fill="#ffffff" rx="3" />
      <rect x="320" y="120" width="60" height="80" fill="#ffffff" rx="3" />
      <rect x="120" y="220" width="80" height="60" fill="#ffffff" rx="3" />
      <rect x="220" y="220" width="160" height="60" fill="#ffffff" rx="3" />
      
      {/* Door */}
      <rect x="220" y="220" width="40" height="80" fill="#ff9800" rx="3" />
      
      {/* Sign */}
      <rect x="150" y="60" width="200" height="40" fill="#f50057" rx="5" />
      <text x="250" y="85" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">CETAK BUKU</text>
      
      {/* People */}
      <circle cx="150" cy="350" r="20" fill="#4caf50" />
      <rect x="145" y="370" width="10" height="20" fill="#4caf50" />
      <line x1="150" y1="390" x2="140" y2="410" stroke="#4caf50" strokeWidth="5" />
      <line x1="150" y1="390" x2="160" y2="410" stroke="#4caf50" strokeWidth="5" />
      <line x1="150" y1="370" x2="130" y2="380" stroke="#4caf50" strokeWidth="5" />
      <line x1="150" y1="370" x2="170" y2="380" stroke="#4caf50" strokeWidth="5" />
      
      <circle cx="200" cy="350" r="20" fill="#9c27b0" />
      <rect x="195" y="370" width="10" height="20" fill="#9c27b0" />
      <line x1="200" y1="390" x2="190" y2="410" stroke="#9c27b0" strokeWidth="5" />
      <line x1="200" y1="390" x2="210" y2="410" stroke="#9c27b0" strokeWidth="5" />
      <line x1="200" y1="370" x2="180" y2="380" stroke="#9c27b0" strokeWidth="5" />
      <line x1="200" y1="370" x2="220" y2="380" stroke="#9c27b0" strokeWidth="5" />
      
      <circle cx="250" cy="350" r="20" fill="#ff9800" />
      <rect x="245" y="370" width="10" height="20" fill="#ff9800" />
      <line x1="250" y1="390" x2="240" y2="410" stroke="#ff9800" strokeWidth="5" />
      <line x1="250" y1="390" x2="260" y2="410" stroke="#ff9800" strokeWidth="5" />
      <line x1="250" y1="370" x2="230" y2="380" stroke="#ff9800" strokeWidth="5" />
      <line x1="250" y1="370" x2="270" y2="380" stroke="#ff9800" strokeWidth="5" />
      
      {/* Decorative elements */}
      <circle cx="50" cy="50" r="20" fill="#1976d2" opacity="0.5" />
      <circle cx="450" cy="350" r="25" fill="#f50057" opacity="0.5" />
      <circle cx="400" cy="80" r="15" fill="#4caf50" opacity="0.5" />
      
      {/* Trees */}
      <rect x="50" y="320" width="10" height="80" fill="#795548" />
      <circle cx="55" cy="300" r="30" fill="#4caf50" />
      
      <rect x="400" y="320" width="10" height="80" fill="#795548" />
      <circle cx="405" cy="300" r="30" fill="#4caf50" />
    </Box>
  );
} 