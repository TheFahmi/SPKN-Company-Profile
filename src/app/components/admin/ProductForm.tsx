'use client';

import React, { useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import type { Product } from '@/types/mongodb';

// Perbarui tipe Product di mongodb.d.ts untuk menambahkan properti yang dibutuhkan
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  imageUrl: string;
  author: string;
  publisher: string;
  level: string;
  pages: string;
  year: string;
  size: string;
  isbn: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (productData: Partial<Product>, image: File | null) => Promise<any>;
  loading: boolean;
  title?: string;
  submitButtonText?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  loading,
  title = 'Tambah Produk Baru',
  submitButtonText = 'Simpan Produk'
}) => {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
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
    }
  );
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage && !initialData?.imageUrl) {
      alert('Pilih gambar produk');
      return;
    }

    // Konversi formData ke format yang diharapkan oleh API
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
    };

    // Tambahkan properti level jika ada
    if (formData.level) {
      (productData as any).level = formData.level;
    }

    await onSubmit(productData, selectedImage);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Nama Produk"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Deskripsi"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Harga"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Kategori</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleSelectChange as any}
              label="Kategori"
            >
              <MenuItem value="buku-pelajaran">Buku Pelajaran</MenuItem>
              <MenuItem value="buku-anak">Buku Anak</MenuItem>
              <MenuItem value="komik-edukasi">Komik Edukasi</MenuItem>
              <MenuItem value="pklh">PKLH</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Penulis"
            name="author"
            value={formData.author}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Penerbit"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Jenjang"
            name="level"
            value={formData.level}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Jumlah Halaman"
            name="pages"
            type="number"
            value={formData.pages}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Tahun Terbit"
            name="year"
            value={formData.year}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ukuran"
            name="size"
            value={formData.size}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            margin="normal"
          />
          <Box sx={{ mt: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="product-image"
              type="file"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
            />
            <label htmlFor="product-image">
              <Button variant="outlined" component="span" sx={{ mr: 2 }}>
                Pilih Gambar
              </Button>
              {selectedImage && (
                <Typography variant="body2" component="span">
                  {selectedImage.name}
                </Typography>
              )}
              {!selectedImage && initialData?.imageUrl && (
                <Typography variant="body2" component="span">
                  Gambar sudah ada
                </Typography>
              )}
            </label>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Menyimpan...
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductForm; 