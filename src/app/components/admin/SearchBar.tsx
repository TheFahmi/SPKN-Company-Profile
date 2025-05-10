'use client';

import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Article as DocumentIcon,
  ShoppingBag as ProductIcon,
  Person as UserIcon,
  Receipt as OrderIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

type ResultType = 'product' | 'order' | 'user' | 'document';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: ResultType;
  url: string;
}

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar = memo(({ onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const theme = useTheme();

  // Fokus pada input saat komponen dimuat
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Menangani penekanan tombol Escape untuk menutup pencarian
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    // Simulasi pencarian dengan timeout
    setTimeout(() => {
      // Data pencarian dummy dengan tipe yang benar
      const dummyResults: SearchResult[] = [
        {
          id: '1',
          title: 'Brosur A4 Full Color',
          description: 'Produk - Kategori: Brosur',
          type: 'product' as ResultType,
          url: '/admin/products/1',
        },
        {
          id: '2',
          title: 'Pesanan #ORD-12345',
          description: 'Pesanan - Status: Selesai',
          type: 'order' as ResultType,
          url: '/admin/orders/12345',
        },
        {
          id: '3',
          title: 'Ahmad Fauzi',
          description: 'Pelanggan - Email: ahmad@example.com',
          type: 'user' as ResultType,
          url: '/admin/customers/3',
        },
        {
          id: '4',
          title: 'Laporan Penjualan Bulanan',
          description: 'Dokumen - Kategori: Laporan',
          type: 'document' as ResultType,
          url: '/admin/reports/monthly',
        },
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setResults(dummyResults);
      setLoading(false);
    }, 300);
  }, []);

  const handleResultClick = useCallback((url: string) => {
    router.push(url);
    onClose();
  }, [router, onClose]);

  const getIconForType = (type: ResultType) => {
    switch (type) {
      case 'product':
        return <ProductIcon color="primary" />;
      case 'order':
        return <OrderIcon color="secondary" />;
      case 'user':
        return <UserIcon sx={{ color: theme.palette.success.main }} />;
      case 'document':
        return <DocumentIcon sx={{ color: theme.palette.warning.main }} />;
      default:
        return <DocumentIcon />;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: 400 },
        maxWidth: '100%',
      }}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        placeholder="Cari produk, pesanan, pelanggan..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(8px)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={onClose}
                size="small"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      {focused && (query.length > 0 || results.length > 0) && (
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            maxHeight: 400,
            overflow: 'auto',
            zIndex: 1300,
            borderRadius: '8px',
            boxShadow: theme.shadows[8],
          }}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Mencari...
              </Typography>
            </Box>
          ) : results.length > 0 ? (
            <List disablePadding>
              {results.map((result, index) => (
                <React.Fragment key={result.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleResultClick(result.url)}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {getIconForType(result.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={result.title}
                        secondary={result.description}
                        primaryTypographyProps={{
                          variant: 'subtitle2',
                          sx: { fontWeight: 'medium' },
                        }}
                        secondaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontSize: '0.75rem' },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          ) : query.length > 1 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Tidak ada hasil untuk "{query}"
              </Typography>
            </Box>
          ) : null}
        </Paper>
      )}
    </Box>
  );
});

// Memastikan nama tampil di React DevTools
SearchBar.displayName = 'SearchBar';

export default SearchBar; 