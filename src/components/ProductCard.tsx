import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Divider,
  Box,
  Chip,
  Rating,
  useTheme,
  Stack
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onAddToCart?: (id: string) => void;
  onViewDetail?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  discountPrice,
  imageUrl,
  category,
  isNew = false,
  isBestSeller = false,
  onAddToCart,
  onViewDetail,
}) => {
  const theme = useTheme();
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  };
  
  const handleViewDetail = () => {
    if (onViewDetail) {
      onViewDetail(id);
    }
  };
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={name}
        />
        <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
          <Stack direction="row" spacing={1}>
            {isNew && (
              <Chip
                label="New"
                color="primary"
                size="small"
              />
            )}
            {isBestSeller && (
              <Chip
                label="Best Seller"
                color="secondary"
                size="small"
              />
            )}
          </Stack>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 'auto' }}>
          {discountPrice ? (
            <Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textDecoration: 'line-through', display: 'inline-block', mr: 1 }}
              >
                {formatPrice(price)}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ display: 'inline-block' }}>
                {formatPrice(discountPrice)}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" color="primary">
              {formatPrice(price)}
            </Typography>
          )}
        </Box>
      </CardContent>
      
      <Divider />
      
      <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={handleViewDetail}
        >
          Detail
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Tambah
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard; 