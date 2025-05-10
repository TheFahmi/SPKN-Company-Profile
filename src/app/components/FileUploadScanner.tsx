'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import axios from 'axios';

// Interface untuk hasil pemindaian dari API
interface ScanResult {
  isClean: boolean;
  fileName: string;
  threats: string[];
  message: string;
}

interface ScanResponse {
  success: boolean;
  isClean: boolean;
  results: Record<string, ScanResult>;
  message: string;
}

export default function FileUploadScanner() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Menangani pemilihan file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Reset hasil pemindaian sebelumnya
      setScanResults(null);
      setError(null);
      
      // Reset input file agar event change terpicu lagi jika file yang sama dipilih
      if (event.target.value) {
        event.target.value = '';
      }
    }
  };

  // Menghapus file dari daftar
  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    // Reset hasil pemindaian jika semua file dihapus
    if (files.length === 1) {
      setScanResults(null);
    }
  };

  // Mengunggah dan memindai file
  const handleScanFiles = async () => {
    if (files.length === 0) {
      setError('Silakan pilih file terlebih dahulu');
      return;
    }

    try {
      setUploading(true);
      setScanning(true);
      setError(null);

      // Buat form data untuk dikirim ke API
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      // Kirim file ke API untuk dipindai
      const response = await axios.post<ScanResponse>('/api/upload/scan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set hasil pemindaian
      setScanResults(response.data);
    } catch (err) {
      console.error('Error saat memindai file:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Terjadi kesalahan saat memindai file'
      );
    } finally {
      setUploading(false);
      setScanning(false);
    }
  };

  // Mendapatkan warna chip berdasarkan status pemindaian
  const getStatusColor = (isClean: boolean) => {
    return isClean ? 'success' : 'error';
  };

  // Mendapatkan ikon status berdasarkan hasil pemindaian
  const getStatusIcon = (isClean: boolean) => {
    return isClean ? (
      <CheckCircleIcon color="success" />
    ) : (
      <ErrorIcon color="error" />
    );
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          bgcolor: 'background.paper',
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SecurityIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
          <Typography variant="h5" component="h2" fontWeight="bold">
            Pemindai Antivirus
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Unggah file untuk dipindai terhadap virus, malware, dan ancaman keamanan lainnya.
          Kami menggunakan teknologi pemindaian canggih untuk memastikan file Anda aman.
        </Typography>

        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            p: 3,
            mb: 3,
            bgcolor: 'background.default',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: 'primary.dark',
              bgcolor: 'action.hover',
            },
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
          <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Klik atau seret file ke sini
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mendukung berbagai format file (PDF, DOCX, XLSX, ZIP, dll.)
          </Typography>
        </Box>

        {/* Daftar file yang dipilih */}
        {files.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              File yang Dipilih ({files.length})
            </Typography>
            <List disablePadding>
              {files.map((file, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider />}
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveFile(index)}
                        disabled={uploading || scanning}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <InfoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={`${(file.size / 1024).toFixed(2)} KB`}
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Tombol pemindaian */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={scanning ? <CircularProgress size={20} color="inherit" /> : <SecurityIcon />}
            onClick={handleScanFiles}
            disabled={files.length === 0 || uploading || scanning}
            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
          >
            {scanning ? 'Memindai...' : 'Pindai File'}
          </Button>
        </Box>

        {/* Pesan error */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        {/* Hasil pemindaian */}
        {scanResults && (
          <Box sx={{ mt: 4 }}>
            <Alert
              severity={scanResults.isClean ? 'success' : 'error'}
              sx={{ mb: 3 }}
            >
              <AlertTitle>
                {scanResults.isClean
                  ? 'Semua File Aman'
                  : 'Terdeteksi Ancaman'}
              </AlertTitle>
              {scanResults.message}
            </Alert>

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Detail Hasil Pemindaian
            </Typography>

            <List sx={{ bgcolor: 'background.default', borderRadius: 1 }}>
              {Object.entries(scanResults.results).map(([key, result], index) => (
                <React.Fragment key={key}>
                  {index > 0 && <Divider />}
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      bgcolor: result.isClean
                        ? 'success.light'
                        : 'error.light',
                      opacity: 0.8,
                      borderRadius: index === 0 ? '4px 4px 0 0' : index === Object.keys(scanResults.results).length - 1 ? '0 0 4px 4px' : 0,
                    }}
                  >
                    <ListItemIcon>{getStatusIcon(result.isClean)}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {result.fileName}
                          </Typography>
                          <Chip
                            label={result.isClean ? 'Aman' : 'Terinfeksi'}
                            color={getStatusColor(result.isClean)}
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{ mt: 1 }}
                          >
                            {result.message}
                          </Typography>
                          {result.threats.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" fontWeight="medium">
                                Ancaman terdeteksi:
                              </Typography>
                              <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                                {result.threats.map((threat, i) => (
                                  <Chip
                                    key={i}
                                    label={threat}
                                    color="error"
                                    variant="outlined"
                                    size="small"
                                  />
                                ))}
                              </Stack>
                            </Box>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Informasi tambahan */}
        <Box sx={{ mt: 4, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Catatan Penting:
          </Typography>
          <Typography variant="body2">
            Pemindaian antivirus kami menggunakan teknologi canggih untuk mendeteksi ancaman, 
            namun tidak ada sistem yang 100% sempurna. Selalu berhati-hati saat menangani file 
            dari sumber yang tidak dikenal.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
} 