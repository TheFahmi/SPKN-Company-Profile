'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';
import { CustomUser } from '@/types/mongodb';

interface AuthHook {
  user: CustomUser | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  checkAdminAccess: () => Promise<boolean>;
  makeUserAdmin: (userId: string) => Promise<void>;
  refreshUserRole: () => Promise<void>;
}

export function useAuth(): AuthHook {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const user = session?.user as CustomUser | null;
  const isAdmin = user?.role === 'admin' || false;

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name?: string) => {
    try {
      // Validasi input sebelum mengirim request
      if (!email || !password) {
        throw new Error('Email dan password diperlukan');
      }

      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Format email tidak valid');
      }

      // Validasi panjang password
      if (password.length < 6) {
        throw new Error('Password minimal 6 karakter');
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Register error response:', data);
        throw new Error(data.message || 'Terjadi kesalahan saat registrasi');
      }

      return data;
    } catch (error: any) {
      console.error('Error registering user:', error);
      throw new Error(error.message || 'Terjadi kesalahan saat registrasi');
    }
  }, []);

  const checkAdminAccess = useCallback(async () => {
    if (!user) return false;
    return isAdmin;
  }, [user, isAdmin]);

  const makeUserAdmin = useCallback(async (userId: string) => {
    try {
      const response = await fetch('/api/admin/make-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to make user admin');
      }
    } catch (error) {
      console.error('Error setting user as admin:', error);
      throw error;
    }
  }, []);

  const refreshUserRole = useCallback(async () => {
    try {
      await signIn('credentials', {
        redirect: false,
        email: user?.email,
        password: '', // Password tidak diperlukan untuk refresh
        isRefresh: true,
      });
    } catch (error) {
      console.error('Error refreshing user role:', error);
      throw error;
    }
  }, [user?.email]);

  return {
    user,
    isAdmin,
    isLoading,
    signIn: handleSignIn,
    signOut: handleSignOut,
    register,
    checkAdminAccess,
    makeUserAdmin,
    refreshUserRole,
  };
} 