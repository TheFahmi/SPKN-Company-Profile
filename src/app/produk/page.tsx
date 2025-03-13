"use client";

import React, { useState, useEffect } from "react";
import { Container, SelectChangeEvent } from "@mui/material";
import { Product } from "@/app/types";
import ProductHeader from "../components/product/ProductHeader";
import ProductFilters from "../components/product/ProductFilters";
import ProductGrid from "../components/product/ProductGrid";
import ProductPagination from "../components/product/ProductPagination";

// Kategori produk
const categories = [
  { id: "all", name: "Semua Kategori" },
  { id: "buku-pelajaran", name: "Buku Pelajaran" },
  { id: "buku-anak", name: "Buku Anak" },
  { id: "komik-edukasi", name: "Komik Edukasi" },
  { id: "pklh", name: "PKLH" },
];

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 0,
  });

  const fetchProducts = async (page = 1, limit = itemsPerPage) => {
    try {
      setLoading(true);
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      });

      const response = await fetch(`/api/products?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data produk");
      }
      const data = await response.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset halaman ke 1 ketika pencarian atau kategori berubah
    setCurrentPage(1);
    fetchProducts(1, itemsPerPage);
  }, [currentPage, itemsPerPage, searchTerm, selectedCategory]);

  // Tambahkan debounce untuk pencarian
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (currentPage === 1) {
        fetchProducts(1, itemsPerPage);
      } else {
        setCurrentPage(1); // Ini akan memicu useEffect di atas
      }
    }, 500); // Tunggu 500ms setelah user selesai mengetik

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reset ke halaman pertama saat ukuran halaman berubah
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <ProductHeader />
      
      <Container>
        <ProductFilters 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          itemsPerPage={itemsPerPage}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          categories={categories}
        />

        <ProductGrid 
          products={products}
          loading={loading}
          error={error}
          itemsPerPage={itemsPerPage}
          categories={categories}
        />

        <ProductPagination 
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={loading}
          error={error}
        />
      </Container>
    </>     
  );
}