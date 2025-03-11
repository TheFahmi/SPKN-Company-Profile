'use client';

import React from 'react';
import { Box } from '@mui/material';

export default function TimelineIllustration() {
  return (
    <Box
      component="svg"
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      sx={{
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
      }}
    >
      {/* Background */}
      <rect x="0" y="0" width="800" height="200" fill="#f5f5f5" rx="10" opacity="0.5" />
      
      {/* Main Timeline Line */}
      <line x1="50" y1="100" x2="750" y2="100" stroke="#1976d2" strokeWidth="4" strokeDasharray="5,5" />
      
      {/* Timeline Points */}
      {/* 1966 */}
      <circle cx="100" cy="100" r="15" fill="#1976d2" />
      <text x="100" y="140" fontSize="14" fontWeight="bold" fill="#1976d2" textAnchor="middle">1966</text>
      <rect x="70" y="30" width="60" height="50" rx="5" fill="#bbdefb" />
      <text x="100" y="55" fontSize="12" fontWeight="bold" fill="#1976d2" textAnchor="middle">Awal Mula</text>
      <line x1="100" y1="80" x2="100" y2="85" stroke="#1976d2" strokeWidth="2" />
      
      {/* 1986 */}
      <circle cx="250" cy="100" r="15" fill="#4caf50" />
      <text x="250" y="140" fontSize="14" fontWeight="bold" fill="#4caf50" textAnchor="middle">1986</text>
      <rect x="220" y="30" width="60" height="50" rx="5" fill="#c8e6c9" />
      <text x="250" y="55" fontSize="12" fontWeight="bold" fill="#4caf50" textAnchor="middle">Pendirian</text>
      <line x1="250" y1="80" x2="250" y2="85" stroke="#4caf50" strokeWidth="2" />
      
      {/* 2000 */}
      <circle cx="400" cy="100" r="15" fill="#ff9800" />
      <text x="400" y="140" fontSize="14" fontWeight="bold" fill="#ff9800" textAnchor="middle">2000</text>
      <rect x="370" y="30" width="60" height="50" rx="5" fill="#ffe0b2" />
      <text x="400" y="55" fontSize="12" fontWeight="bold" fill="#ff9800" textAnchor="middle">Ekspansi</text>
      <line x1="400" y1="80" x2="400" y2="85" stroke="#ff9800" strokeWidth="2" />
      
      {/* 2010 */}
      <circle cx="550" cy="100" r="15" fill="#9c27b0" />
      <text x="550" y="140" fontSize="14" fontWeight="bold" fill="#9c27b0" textAnchor="middle">2010</text>
      <rect x="520" y="30" width="60" height="50" rx="5" fill="#e1bee7" />
      <text x="550" y="55" fontSize="12" fontWeight="bold" fill="#9c27b0" textAnchor="middle">Modern</text>
      <line x1="550" y1="80" x2="550" y2="85" stroke="#9c27b0" strokeWidth="2" />
      
      {/* 2023 */}
      <circle cx="700" cy="100" r="15" fill="#f50057" />
      <text x="700" y="140" fontSize="14" fontWeight="bold" fill="#f50057" textAnchor="middle">2023</text>
      <rect x="670" y="30" width="60" height="50" rx="5" fill="#ff80ab" />
      <text x="700" y="55" fontSize="12" fontWeight="bold" fill="#f50057" textAnchor="middle">Digital</text>
      <line x1="700" y1="80" x2="700" y2="85" stroke="#f50057" strokeWidth="2" />
    </Box>
  );
} 