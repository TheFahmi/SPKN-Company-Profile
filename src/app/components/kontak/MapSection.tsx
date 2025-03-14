'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper 
} from '@mui/material';

interface MapSectionProps {}

const MapSection: React.FC<MapSectionProps> = () => {
  return (
    <Box sx={{ mt: 4, mb: 10 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            borderRadius: 4,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          <Typography 
            variant="h5" 
            component="h3" 
            fontWeight="bold" 
            sx={{ 
              p: 3, 
              pb: 0,
              color: 'text.primary'
            }}
          >
            Lokasi Kami
          </Typography>
          <Box sx={{ width: '100%', height: 450, p: 2 }}>
            <Box 
              component="iframe" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2834792233553!2d106.93946611476908!3d-6.2209209954975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c71588a98d1%3A0xd716d225651ffa3f!2sJl.%20Raya%20Bekasi%20KM.27%2C%20RT.1%2FRW.8%2C%20Ujung%20Menteng%2C%20Kec.%20Cakung%2C%20Kota%20Jakarta%20Timur%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2013960!5e0!3m2!1sen!2sid!4v1651234567890!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: 16 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MapSection; 