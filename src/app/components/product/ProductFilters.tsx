'use client';

import React from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ProductFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  itemsPerPage: number;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (e: SelectChangeEvent) => void;
  onItemsPerPageChange: (e: SelectChangeEvent<number>) => void;
  categories: { id: string; name: string }[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchTerm,
  selectedCategory,
  itemsPerPage,
  onSearchChange,
  onCategoryChange,
  onItemsPerPageChange,
  categories
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Search Bar */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: 'background.paper',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Grid>
        
        {/* Category Filter */}
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size="medium">
            <InputLabel id="category-select-label">Kategori</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Kategori"
              onChange={onCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Items per page */}
        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="medium">
            <InputLabel id="items-per-page-label">Tampilkan</InputLabel>
            <Select
              labelId="items-per-page-label"
              id="items-per-page"
              value={itemsPerPage}
              label="Tampilkan"
              onChange={onItemsPerPageChange}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={24}>24</MenuItem>
              <MenuItem value={32}>32</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductFilters;