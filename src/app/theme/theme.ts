import { createTheme } from '@mui/material/styles';

// Tambahkan utilitas text ellipsis ke dalam theme
declare module '@mui/material/styles' {
  interface TypographyVariants {
    ellipsis: React.CSSProperties;
    ellipsis2: React.CSSProperties;
    ellipsis3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    ellipsis?: React.CSSProperties;
    ellipsis2?: React.CSSProperties;
    ellipsis3?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    ellipsis: true;
    ellipsis2: true;
    ellipsis3: true;
  }
}

const theme = createTheme({
  // ... existing code ...
  
  typography: {
    // ... existing code ...
    
    // Tambahkan variant ellipsis
    ellipsis: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    },
    ellipsis2: {
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    ellipsis3: {
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  
  // ... existing code ...
}); 