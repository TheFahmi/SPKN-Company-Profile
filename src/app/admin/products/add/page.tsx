'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/material';
import AdminFormTemplate, { FormSection } from '@/app/components/admin/AdminFormTemplate';
import { TextInput, NumberInput, SelectInput, ImageSelector, WysiwygEditor } from '@/app/components/admin/FormFields';

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  author: string;
  publisher: string;
  pages: string;
  year: string;
  size: string;
  isbn: string;
  imageUrl: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  author?: string;
  publisher?: string;
  pages?: string;
  year?: string;
  size?: string;
  isbn?: string;
  imageUrl?: string;
}

const CATEGORIES = [
  { value: 'buku-pelajaran', label: 'Buku Pelajaran' },
  { value: 'buku-anak', label: 'Buku Anak' },
  { value: 'komik-edukasi', label: 'Komik Edukasi' },
  { value: 'pklh', label: 'PKLH' },
];

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    author: '',
    publisher: '',
    pages: '',
    year: '',
    size: '',
    isbn: '',
    imageUrl: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [useImageUrl, setUseImageUrl] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    if (!formData.name) {
      errors.name = 'Nama produk harus diisi';
      isValid = false;
    }

    if (!formData.description) {
      errors.description = 'Deskripsi harus diisi';
      isValid = false;
    }

    if (!formData.price) {
      errors.price = 'Harga harus diisi';
      isValid = false;
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = 'Harga harus berupa angka positif';
      isValid = false;
    }

    if (!formData.category) {
      errors.category = 'Kategori harus dipilih';
      isValid = false;
    }

    if (formData.pages && (isNaN(Number(formData.pages)) || Number(formData.pages) < 1)) {
      errors.pages = 'Jumlah halaman minimal 1';
      isValid = false;
    }

    if (!useImageUrl && !selectedImage && !formData.imageUrl) {
      errors.imageUrl = 'Gambar produk harus diisi';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Prepare form data
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('category', formData.category);
      productData.append('author', formData.author);
      productData.append('publisher', formData.publisher);
      productData.append('pages', formData.pages);
      productData.append('year', formData.year);
      productData.append('size', formData.size);
      productData.append('isbn', formData.isbn);
      
      if (useImageUrl) {
        productData.append('imageUrl', formData.imageUrl);
      } else if (selectedImage) {
        productData.append('image', selectedImage);
      }
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: productData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menambahkan produk');
      }
      
      setSuccess(true);
      
      // Redirect ke halaman daftar produk setelah berhasil
      setTimeout(() => {
        router.push('/admin/products');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menambahkan produk');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk editor WYSIWYG
  const handleWysiwygChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleGoBack = () => {
    router.push('/admin/products');
  };

  // Sections for the form template
  const formSections: FormSection[] = [
    {
      title: 'Informasi Dasar',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextInput
              name="name"
              label="Nama Produk"
              value={formData.name}
              onChange={handleInputChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <WysiwygEditor
              name="description"
              label="Deskripsi Produk"
              value={formData.description}
              onChange={handleWysiwygChange}
              error={!!formErrors.description}
              helperText={formErrors.description}
              required
              height={400}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NumberInput
              name="price"
              label="Harga"
              value={formData.price}
              onChange={handleInputChange}
              error={!!formErrors.price}
              helperText={formErrors.price}
              required
              startAdornment="Rp"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              name="category"
              label="Kategori"
              value={formData.category}
              onChange={handleSelectChange}
              options={CATEGORIES}
              error={!!formErrors.category}
              helperText={formErrors.category}
              required
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: 'Informasi Detail',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              name="author"
              label="Penulis"
              value={formData.author}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              name="publisher"
              label="Penerbit"
              value={formData.publisher}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              name="pages"
              label="Jumlah Halaman"
              value={formData.pages}
              onChange={handleInputChange}
              min={1}
              error={!!formErrors.pages}
              helperText={formErrors.pages}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput
              name="year"
              label="Tahun Terbit"
              value={formData.year}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput
              name="size"
              label="Ukuran Kertas"
              value={formData.size}
              onChange={handleInputChange}
              placeholder="Contoh: A4, 20x30 cm"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="isbn"
              label="ISBN"
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: 'Gambar Produk',
      content: (
        <ImageSelector
          useImageUrl={useImageUrl}
          setUseImageUrl={setUseImageUrl}
          imageUrl={formData.imageUrl}
          onImageUrlChange={handleInputChange}
          selectedImage={selectedImage}
          onFileChange={handleImageChange}
          error={!!formErrors.imageUrl}
          imageUrlHelperText={formErrors.imageUrl}
          fileHelperText={formErrors.imageUrl}
        />
      ),
    },
  ];

  return (
    <AdminFormTemplate
      title="Tambah Produk Baru"
      isEdit={false}
      loading={false}
      isSubmitting={loading}
      error={error}
      success={success}
      successMessage="Produk berhasil ditambahkan!"
      onSubmit={handleSubmit}
      onCancel={handleGoBack}
      sections={formSections}
    />
  );
} 