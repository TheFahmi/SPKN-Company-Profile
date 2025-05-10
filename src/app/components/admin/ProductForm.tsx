'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import type { Product } from '@/types/mongodb';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useCSRF } from '@/hooks/useCSRF';

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

// Interface untuk data form produk
interface ProductFormData {
  name: string;
  description: string;
  price: string | number;
  category: string;
  imageUrl: string;
  author?: string;
  publisher?: string;
  level?: string;
  pages?: string | number;
  year?: string;
  size?: string;
  isbn?: string;
  images: string[];
  features: string[];
  inStock: boolean;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (productData: Partial<Product>, image: File | null) => Promise<any>;
  loading: boolean;
  title?: string;
  submitButtonText?: string;
}

export default function ProductForm({ 
  onSubmit, 
  initialData, 
  title = initialData ? 'Edit Produk' : 'Tambah Produk Baru',
  loading = false
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(initialData ? {
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    imageUrl: initialData.imageUrl || '',
    author: initialData.author || '',
    publisher: initialData.publisher || '',
    level: initialData.level || '',
    pages: initialData.pages || '',
    year: initialData.year || '',
    size: initialData.size || '',
    isbn: initialData.isbn || '',
    images: initialData.images || [],
    features: initialData.features || [],
    inStock: initialData.inStock !== undefined ? initialData.inStock : true,
  } : {
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    author: '',
    publisher: '',
    level: '',
    pages: '',
    year: '',
    size: '',
    isbn: '',
    images: [],
    features: [],
    inStock: true,
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getHeaders } = useCSRF();
  
  const [newFeature, setNewFeature] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      setScanResults(null);
      setError(null);
      
      if (event.target.value) {
        event.target.value = '';
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
    if (files.length === 1) {
      setScanResults(null);
    }
  };

  const handleScanFiles = async () => {
    if (files.length === 0) {
      setError('Silakan pilih file terlebih dahulu');
      return;
    }

    try {
      setScanning(true);
      setError(null);

      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });

      const response = await axios.post<ScanResponse>('/api/upload/scan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setScanResults(response.data);
      
      if (response.data.isClean) {
        setSuccessMessage('Semua file aman dan siap untuk diunggah');
      }
    } catch (err) {
      console.error('Error saat memindai file:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Terjadi kesalahan saat memindai file'
      );
    } finally {
      setScanning(false);
    }
  };

  const handleUploadFiles = async () => {
    if (files.length === 0) {
      setError('Silakan pilih file terlebih dahulu');
      return;
    }
    
    if (!scanResults || !scanResults.isClean) {
      setError('Silakan pindai file terlebih dahulu atau pastikan file aman');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
      
      const headers = await getHeaders();
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
      });
      
      if (response.data.success && response.data.files.length > 0) {
        const uploadedUrls = response.data.files.map((file: any) => file.url);
        
        setFormData({
          ...formData,
          imageUrl: uploadedUrls[0],
          images: uploadedUrls,
        });
        
        setSuccessMessage('File berhasil diunggah');
        setFiles([]);
      }
    } catch (err) {
      console.error('Error saat mengunggah file:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Terjadi kesalahan saat mengunggah file'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage && !initialData?.imageUrl) {
      alert('Pilih gambar produk');
      return;
    }

    const productData: Partial<Product> = {
      name: formData.name,
      description: formData.description,
      price: formData.price ? Number(formData.price) : undefined,
      category: formData.category,
      imageUrl: formData.imageUrl,
      author: formData.author || undefined,
      publisher: formData.publisher || undefined,
      pages: formData.pages ? Number(formData.pages) : undefined,
      year: formData.year || undefined,
      size: formData.size || undefined,
      isbn: formData.isbn || undefined,
      images: formData.images,
      features: formData.features,
      inStock: formData.inStock,
    };

    if (formData.level) {
      (productData as any).level = formData.level;
    }

    await onSubmit(productData, selectedImage);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nama Produk"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Harga"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              variant="outlined"
              InputProps={{
                startAdornment: <Typography sx={{ mr: 1 }}>Rp</Typography>,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Kategori</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                label="Kategori"
                required
              >
                <MenuItem value="buku-pelajaran">Buku Pelajaran</MenuItem>
                <MenuItem value="buku-anak">Buku Anak</MenuItem>
                <MenuItem value="komik-edukasi">Komik Edukasi</MenuItem>
                <MenuItem value="pklh">PKLH</MenuItem>
                <MenuItem value="lainnya">Lainnya</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Fitur Produk
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                fullWidth
                label="Tambah Fitur"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                onClick={handleAddFeature}
                sx={{ ml: 1 }}
              >
                Tambah
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.features.map((feature: string, index: number) => (
                <Chip
                  key={index}
                  label={feature}
                  onDelete={() => handleRemoveFeature(index)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Gambar Produk
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
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
              <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Klik atau seret gambar ke sini
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Format yang didukung: JPG, PNG, GIF (Maks. 10MB)
              </Typography>
            </Box>
            
            {files.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  File yang Dipilih ({files.length})
                </Typography>
                <Grid container spacing={2}>
                  {files.map((file, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper
                        sx={{
                          p: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                          <Box
                            component="img"
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            sx={{
                              width: 40,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: 1,
                              mr: 1,
                            }}
                          />
                          <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                            {file.name}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveFile(index)}
                          disabled={uploading || scanning}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ display: 'flex', mt: 2, gap: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={scanning ? <CircularProgress size={20} /> : <SecurityIcon />}
                    onClick={handleScanFiles}
                    disabled={files.length === 0 || uploading || scanning}
                  >
                    {scanning ? 'Memindai...' : 'Pindai File'}
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                    onClick={handleUploadFiles}
                    disabled={files.length === 0 || uploading || scanning || !scanResults?.isClean}
                  >
                    {uploading ? 'Mengunggah...' : 'Unggah File'}
                  </Button>
                </Box>
                
                {scanResults && (
                  <Box sx={{ mt: 2 }}>
                    <Alert
                      severity={scanResults.isClean ? 'success' : 'error'}
                      icon={scanResults.isClean ? <CheckCircleIcon /> : undefined}
                    >
                      {scanResults.message}
                    </Alert>
                  </Box>
                )}
                
                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Box>
            )}
            
            {formData.images && formData.images.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Gambar yang Sudah Diunggah
                </Typography>
                <Grid container spacing={2}>
                  {formData.images.map((imageUrl: string, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        component="img"
                        src={imageUrl}
                        alt={`Produk ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: 150,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status Stok</InputLabel>
              <Select
                name="inStock"
                value={formData.inStock}
                onChange={handleSelectChange}
                label="Status Stok"
              >
                <MenuItem value={true}>Tersedia</MenuItem>
                <MenuItem value={false}>Habis</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Produk'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </Paper>
  );
} 