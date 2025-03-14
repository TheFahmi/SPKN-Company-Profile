import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
  useTheme,
  Divider
} from '@mui/material';
import { FormatQuote as FormatQuoteIcon } from '@mui/icons-material';

export interface TestimonialCardProps {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  testimonial: string;
  rating: number;
  date?: string;
  productOrService?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  id,
  name,
  role,
  company,
  avatarUrl,
  testimonial,
  rating,
  date,
  productOrService,
}) => {
  const theme = useTheme();
  
  // Fungsi untuk mendapatkan inisial dari nama
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16, 
          color: theme.palette.primary.main,
          opacity: 0.2,
          transform: 'scale(2)',
        }}
      >
        <FormatQuoteIcon fontSize="large" />
      </Box>
      
      <CardContent sx={{ pt: 5, pb: 3, flexGrow: 1 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: 'italic',
            mb: 3,
            position: 'relative',
            zIndex: 1,
            minHeight: '80px',
          }}
        >
          "{testimonial}"
        </Typography>
        
        {productOrService && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2 }}
          >
            Produk/Layanan: <b>{productOrService}</b>
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {rating.toFixed(1)}
          </Typography>
        </Box>
        
        {date && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
            {date}
          </Typography>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={avatarUrl} 
            alt={name}
            sx={{ 
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48,
              mr: 2
            }}
          >
            {!avatarUrl && getInitials(name)}
          </Avatar>
          
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {name}
            </Typography>
            
            {(role || company) && (
              <Typography variant="body2" color="text.secondary">
                {role}{role && company ? ', ' : ''}{company}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard; 