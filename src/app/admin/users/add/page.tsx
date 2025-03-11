'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid } from '@mui/material';
import AdminFormTemplate, { FormSection } from '@/app/components/admin/AdminFormTemplate';
import { TextInput, SelectInput } from '@/app/components/admin/FormFields';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  isAdmin?: string;
}

const ROLE_OPTIONS = [
  { value: 'false', label: 'User' },
  { value: 'true', label: 'Admin' },
];

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: 'false',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validasi nama
    if (!formData.name) {
      errors.name = 'Nama harus diisi';
      isValid = false;
    }

    // Validasi email
    if (!formData.email) {
      errors.email = 'Email harus diisi';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
      isValid = false;
    }

    // Validasi password
    if (!formData.password) {
      errors.password = 'Password harus diisi';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
      isValid = false;
    }

    // Validasi konfirmasi password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi password harus diisi';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Konfirmasi password tidak sesuai';
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

    try {
      setLoading(true);
      setError(null);

      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin === 'true',
      };

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menambahkan pengguna');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menambahkan pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user selects
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleGoBack = () => {
    router.push('/admin/users');
  };

  // Sections for the form template
  const formSections: FormSection[] = [
    {
      title: 'Informasi Pengguna',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextInput
              name="name"
              label="Nama Lengkap"
              value={formData.name}
              onChange={handleInputChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              type="email"
              required
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: 'Keamanan',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              type="password"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              name="confirmPassword"
              label="Konfirmasi Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              type="password"
              required
            />
          </Grid>
        </Grid>
      ),
    },
    {
      title: 'Role Pengguna',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SelectInput
              name="isAdmin"
              label="Role"
              value={formData.isAdmin}
              onChange={handleSelectChange}
              options={ROLE_OPTIONS}
              error={!!formErrors.isAdmin}
              helperText={formErrors.isAdmin}
            />
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <AdminFormTemplate
      title="Tambah Pengguna Baru"
      isEdit={false}
      loading={false}
      isSubmitting={loading}
      error={error}
      success={success}
      successMessage="Pengguna berhasil ditambahkan. Mengalihkan ke halaman daftar pengguna..."
      onSubmit={handleSubmit}
      onCancel={handleGoBack}
      sections={formSections}
    />
  );
} 