import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Check as CheckIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
  price?: string;
  estimatedTime?: string;
  isPopular?: boolean;
  onOrderNow?: (id: string) => void;
  onLearnMore?: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  features,
  price,
  estimatedTime,
  isPopular = false,
  onOrderNow,
  onLearnMore,
}) => {
  const theme = useTheme();
  
  const handleOrderNow = () => {
    if (onOrderNow) {
      onOrderNow(id);
    }
  };
  
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore(id);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 350, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        }
      }}
    >
      {isPopular && (
        <Chip
          label="Populer"
          color="secondary"
          sx={{
            position: 'absolute',
            top: -12,
            right: 16,
            fontWeight: 'bold',
            zIndex: 1,
          }}
        />
      )}
      
      <CardMedia
        component="img"
        height="180"
        image={imageUrl || 'https://source.unsplash.com/random/350x180?printing'}
        alt={title}
        sx={{ 
          borderBottom: `4px solid ${theme.palette.primary.main}`,
        }}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
        
        {(price || estimatedTime) && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {price && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Mulai dari
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  {price}
                </Typography>
              </Box>
            )}
            
            {estimatedTime && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Estimasi
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {estimatedTime}
                </Typography>
              </Box>
            )}
          </Box>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        <List disablePadding>
          {features.map((feature, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={feature} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  color: 'text.primary'
                }} 
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      
      <CardActions sx={{ padding: 2, justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          endIcon={<ArrowForwardIcon />}
          onClick={handleLearnMore}
        >
          Pelajari
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          onClick={handleOrderNow}
        >
          Pesan Sekarang
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard; 