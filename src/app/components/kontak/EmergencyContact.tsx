'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button 
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

interface EmergencyContactProps {}

const EmergencyContact: React.FC<EmergencyContactProps> = () => {
  return (
    <Card 
      sx={{ 
        borderRadius: 4, 
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        mt: 'auto'
      }}
    >
      <Box sx={{ height: 8, bgcolor: 'secondary.main' }} />
      <CardContent sx={{ p: 4 }}>
        <Typography 
          variant="h5" 
          component="h3" 
          fontWeight="bold" 
          gutterBottom
          sx={{ color: 'text.primary', mb: 2 }}
        >
          Butuh Bantuan Segera?
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Untuk kebutuhan mendesak atau konsultasi langsung, Anda dapat menghubungi tim layanan pelanggan kami.
        </Typography>
        
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<PhoneIcon />}
          fullWidth
          sx={{ 
            py: 1.5,
            fontWeight: 'bold',
            borderRadius: 2,
            mt: 2
          }}
          href="tel:+6221460081"
        >
          Hubungi Sekarang
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyContact; 