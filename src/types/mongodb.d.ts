import { ObjectId } from 'mongodb';

// Deklarasi tipe untuk dokumen MongoDB
export interface MongoDocument {
  _id?: ObjectId;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

// Deklarasi tipe untuk pengguna
export interface User extends MongoDocument {
  email: string;
  password?: string;
  name?: string | null;
  image?: string | null;
  role?: string;
  isAdmin?: boolean;
}

// Deklarasi tipe untuk pengguna custom
export interface CustomUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
  isAdmin?: boolean;
}

// Deklarasi tipe untuk produk
export interface Product extends MongoDocument {
  name: string;
  description?: string;
  price?: number;
  category?: string;
  features?: string[];
  imageUrl?: string;
  author?: string;
  publisher?: string;
  level?: string;
  pages?: number;
  year?: string;
  size?: string;
  isbn?: string;
  images?: string[];
  inStock?: boolean;
} 