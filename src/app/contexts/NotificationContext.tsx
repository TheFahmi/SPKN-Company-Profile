'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Tipe untuk notifikasi
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: number;
  url?: string;
}

// Tipe untuk konteks notifikasi
export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

// Membuat konteks dengan nilai default
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  removeNotification: () => {},
  clearAllNotifications: () => {},
});

// Hook untuk menggunakan konteks notifikasi
export const useNotifications = () => useContext(NotificationContext);

// Provider untuk konteks notifikasi
export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Memuat notifikasi dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error parsing notifications from localStorage:', error);
      }
    }
  }, []);

  // Menyimpan notifikasi ke localStorage saat berubah
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Menambahkan notifikasi baru
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    setNotifications((prev) => [
      {
        ...notification,
        id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        read: false,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  // Menandai notifikasi sebagai sudah dibaca
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  // Menandai semua notifikasi sebagai sudah dibaca
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  }, []);

  // Menghapus notifikasi
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  }, []);

  // Menghapus semua notifikasi
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Nilai konteks
  const contextValue = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext; 