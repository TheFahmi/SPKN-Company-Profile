'use client';

import { useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

export function useNotificationDemo() {
  const { addNotification, notifications } = useNotifications();

  useEffect(() => {
    // Cek apakah sudah ada notifikasi demo
    const hasDemo = localStorage.getItem('notificationDemoShown');
    
    // Jika belum ada notifikasi demo, tambahkan notifikasi demo
    if (!hasDemo) {
      // Tambahkan notifikasi demo dengan delay
      setTimeout(() => {
        addNotification({
          title: 'Selamat Datang di Admin Panel',
          message: 'Ini adalah panel admin untuk mengelola konten website Anda. Silakan jelajahi fitur-fitur yang tersedia.',
          type: 'info',
          link: '/admin/dashboard',
        });
      }, 1000);
      
      setTimeout(() => {
        addNotification({
          title: 'Produk Baru Ditambahkan',
          message: 'Produk "Buku Matematika Kelas 6" telah berhasil ditambahkan ke database.',
          type: 'success',
          link: '/admin/products',
        });
      }, 3000);
      
      setTimeout(() => {
        addNotification({
          title: 'Pembaruan Tersedia',
          message: 'Versi baru sistem admin panel tersedia. Silakan perbarui untuk mendapatkan fitur terbaru.',
          type: 'warning',
        });
      }, 5000);
      
      // Tandai bahwa notifikasi demo sudah ditampilkan
      localStorage.setItem('notificationDemoShown', 'true');
    }
  }, [addNotification]);
} 