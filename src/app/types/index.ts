import { ObjectId } from 'mongodb';

// Tipe data untuk produk
export interface Product {
  _id: ObjectId;
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  images: string[];
  price: number;
  author: string;
  publisher: string;
  level: string;
  pages: number;
  year: string;
  size: string;
  isbn?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  features?: string[];
  specifications?: {
    ukuran: string;
    kertas_isi: string;
    kertas_cover: string;
    finishing: string;
    jilid: string;
  };
  inStock: string;
}

// Tipe data untuk kategori produk
export interface Category {
  id: string;
  name: string;
}

// Tipe data untuk pengguna admin
export interface Admin {
  id?: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
  updatedAt: Date;
}

// Tipe data untuk form kontak
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
} 