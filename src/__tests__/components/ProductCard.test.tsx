import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../../src/components/ProductCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'This is a test product',
    price: 100000,
    discountPrice: 80000,
    imageUrl: '/images/products/test-product.jpg',
    category: 'test',
    isNew: true,
    isBestSeller: false,
  };

  // Create a theme for testing
  const theme = createTheme();

  // Setup function to render with theme
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  it('renders product name correctly', () => {
    renderWithTheme(<ProductCard {...mockProduct} />);
    // Use getByText with a string or regex
    const nameElement = screen.getByText('Test Product');
    expect(nameElement).toBeDefined();
  });

  it('renders product price correctly', () => {
    renderWithTheme(<ProductCard {...mockProduct} />);
    // Format price to IDR
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(mockProduct.price);
    
    const priceElement = screen.getByText(formattedPrice);
    expect(priceElement).toBeDefined();
  });

  it('shows discount price when available', () => {
    renderWithTheme(<ProductCard {...mockProduct} />);
    // Format discount price to IDR
    const formattedDiscountPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(mockProduct.discountPrice);
    
    const discountElement = screen.getByText(formattedDiscountPrice);
    expect(discountElement).toBeDefined();
  });

  it('displays "New" badge when product is new', () => {
    renderWithTheme(<ProductCard {...mockProduct} />);
    const newBadge = screen.getByText('New');
    expect(newBadge).toBeDefined();
  });

  it('does not display "Best Seller" badge when product is not a best seller', () => {
    renderWithTheme(<ProductCard {...mockProduct} />);
    const bestSellerBadge = screen.queryByText('Best Seller');
    expect(bestSellerBadge).toBeNull();
  });
}); 