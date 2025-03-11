export interface User {
  _id?: string;
  id?: string;
  email: string;
  password: string;
  name?: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomUser {
  id?: string;
  _id?: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  isAdmin: boolean;
}

export interface MongoDocument {
  _id?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product extends MongoDocument {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  images?: string[];
  author?: string;
  publisher?: string;
  pages?: number;
  year?: string;
  size?: string;
  isbn?: string;
} 