'use client';

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Divider 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ContactInfoProps {}

const ContactInfo: React.FC<ContactInfoProps> = () => {
  return (
    <Card 
      sx={{ 
        borderRadius: 4, 
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        mb: 4,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ height: 8, bgcolor: 'primary.main' }} />
      <CardContent sx={{ p: 4 }}>
        <Typography 
          variant="h5" 
          component="h3" 
          fontWeight="bold" 
          gutterBottom
          sx={{ color: 'text.primary', mb: 3 }}
        >
          Informasi Kontak
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
          <LocationOnIcon sx={{ color: 'primary.main', mr: 2, fontSize: 24, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Alamat
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Jl. Raya Bekasi Km. 27, Ujung Menteng<br />
              Cakung, Jakarta Timur 13960<br />
              Indonesia
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
          <PhoneIcon sx={{ color: 'primary.main', mr: 2, fontSize: 24, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Telepon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +62 21 4600081<br />
              +62 21 4600082
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
          <EmailIcon sx={{ color: 'primary.main', mr: 2, fontSize: 24, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Email
            </Typography>
            <Typography variant="body2" color="text.secondary">
              info@pancakarya.co.id<br />
              marketing@pancakarya.co.id
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <AccessTimeIcon sx={{ color: 'primary.main', mr: 2, fontSize: 24, mt: 0.5 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Jam Operasional
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Senin - Jumat: 08.00 - 17.00 WIB<br />
              Sabtu: 08.00 - 13.00 WIB<br />
              Minggu & Hari Libur: Tutup
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactInfo; 