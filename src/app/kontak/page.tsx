'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Grid
} from '@mui/material';

// Import komponen-komponen
import HeaderSection from '../components/kontak/HeaderSection';
import ContactForm from '../components/kontak/ContactForm';
import ContactInfo from '../components/kontak/ContactInfo';
import EmergencyContact from '../components/kontak/EmergencyContact';
import MapSection from '../components/kontak/MapSection';
import FAQSection from '../components/kontak/FAQSection';
import CTASection from '../components/kontak/CTASection';

export default function KontakPage() {
  return (
    <>
      {/* Header Section */}
      <HeaderSection />

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={5}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <ContactForm />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <ContactInfo />
              <EmergencyContact />
              </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <MapSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* CTA Section */}
      <CTASection />
    </>
  );
} 