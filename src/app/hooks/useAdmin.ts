'use client';

import { useState } from 'react';
import { useAuth } from './useAuth';
import { User } from '@/types/mongodb';

interface UseAdminHook {
  users: User[];
  loading: boolean;
  error: string | null;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  makeUserAdmin: (userId: string) => Promise<void>;
  getUsers: () => Promise<void>;
}

export function useAdmin(): UseAdminHook {
  const { signIn, user, makeUserAdmin: makeAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      await signIn(email, password);
      
      // Periksa apakah user yang login adalah admin
      if (!user?.isAdmin) {
        setError('Akses ditolak. Anda bukan admin.');
        return false;
      }
      
      return true;
    } catch (error: any) {
      console.error('Admin login error:', error);
      setError(error.message || 'Terjadi kesalahan saat login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const makeUserAdmin = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      await makeAdmin(userId);
      
      // Update user list setelah mengubah peran
      await getUsers();
    } catch (error: any) {
      console.error('Error making user admin:', error);
      setError(error.message || 'Terjadi kesalahan saat mengubah peran pengguna');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      console.error('Error getting users:', error);
      setError(error.message || 'Terjadi kesalahan saat mengambil data pengguna');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    loginAdmin,
    makeUserAdmin,
    getUsers,
  };
} 