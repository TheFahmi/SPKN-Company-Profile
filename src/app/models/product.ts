import { ObjectId } from 'mongodb';

export interface Product {
  _id?: string | ObjectId;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFilter {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface PaginatedProducts {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
} 