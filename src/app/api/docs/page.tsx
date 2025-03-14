'use client';

import React, { useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocsPage() {
  useEffect(() => {
    // Menambahkan title ke halaman
    document.title = 'API Documentation | PT Sarana Pancakarya Nusa';
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Documentation
        </Typography>
        <Typography variant="body1" paragraph>
          Dokumentasi API untuk sistem PT Sarana Pancakarya Nusa. Gunakan dokumentasi ini sebagai referensi untuk mengintegrasikan dengan sistem kami.
        </Typography>
      </Paper>
      
      <Box sx={{ 
        '.swagger-ui .topbar': { display: 'none' },
        '.swagger-ui .info': { margin: '20px 0' },
        '.swagger-ui .info .title': { color: '#1976d2' },
        '.swagger-ui .opblock-tag': { 
          fontSize: '18px', 
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px'
        },
        '.swagger-ui .opblock': { borderRadius: '8px', marginBottom: '10px' },
        '.swagger-ui .opblock .opblock-summary': { padding: '10px' },
        '.swagger-ui .opblock-description-wrapper p': { fontSize: '14px' },
        '.swagger-ui .responses-inner h4': { marginTop: '10px' },
        '.swagger-ui .responses-inner': { padding: '10px' },
        '.swagger-ui table': { marginTop: '10px' },
        '.swagger-ui table thead tr td, .swagger-ui table thead tr th': { 
          color: '#333',
          fontWeight: 'bold',
          fontSize: '13px'
        },
        '.swagger-ui .btn': { 
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        },
        '.swagger-ui .btn.execute': { 
          backgroundColor: '#1976d2',
          color: 'white'
        },
        '.swagger-ui .btn.authorize': { 
          backgroundColor: '#4caf50',
          color: 'white'
        }
      }}>
        <SwaggerUI url="/api/docs/swagger" />
      </Box>
    </Container>
  );
} 