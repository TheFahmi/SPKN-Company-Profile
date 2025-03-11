'use client';

import { useState, useEffect } from 'react';
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

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: 'false',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        const response = await fetch(`/api/admin/users/${params.id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal mengambil data pengguna');
        }

        const data = await response.json();
        
        setFormData({
          name: data.name || '',
          email: data.email || '',
          password: '',
          confirmPassword: '',
          isAdmin: data.isAdmin ? 'true' : 'false',
        });
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data pengguna');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

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

    // Validasi password jika diubah
    if (changePassword) {
      if (!formData.password) {
        errors.password = 'Password harus diisi';
        isValid = false;
      } else if (formData.password.length < 6) {
        errors.password = 'Password minimal 6 karakter';
        isValid = false;
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Konfirmasi password harus diisi';
        isValid = false;
      } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Konfirmasi password tidak sesuai';
        isValid = false;
      }
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

      const userData: any = {
        name: formData.name,
        email: formData.email,
        isAdmin: formData.isAdmin === 'true',
      };

      // Hanya kirim password jika diubah
      if (changePassword && formData.password) {
        userData.password = formData.password;
      }

      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memperbarui pengguna');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memperbarui pengguna');
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

    // Set changePassword flag jika user mulai mengisi field password
    if ((name === 'password' || name === 'confirmPassword') && value.length > 0) {
      setChangePassword(true);
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
      title: 'Ubah Password (opsional)',
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextInput
              name="password"
              label="Password Baru"
              value={formData.password}
              onChange={handleInputChange}
              error={!!formErrors.password}
              helperText={formErrors.password || 'Biarkan kosong jika tidak ingin mengubah password'}
              type="password"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              name="confirmPassword"
              label="Konfirmasi Password Baru"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              type="password"
              disabled={!formData.password}
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
      title="Edit Pengguna"
      isEdit={true}
      loading={isLoading}
      isSubmitting={loading}
      error={error || fetchError}
      success={success}
      successMessage="Pengguna berhasil diperbarui. Mengalihkan ke halaman daftar pengguna..."
      onSubmit={handleSubmit}
      onCancel={handleGoBack}
      sections={formSections}
    />
  );
} 