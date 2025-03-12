'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

const HeroIllustration = memo(function HeroIllustration() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Image
        src="/images/hero-illustration.svg"
        alt="Illustration of printing equipment and books"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: 'contain',
        }}
      />
    </Box>
  );
});

export default HeroIllustration;