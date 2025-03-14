import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Chip
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

export interface PricingFeature {
  title: string;
  included: boolean;
}

export interface PricingCardProps {
  id: string;
  title: string;
  description?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  buttonText?: string;
  isPopular?: boolean;
  isHighlighted?: boolean;
  onSelectPlan?: (id: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  id,
  title,
  description,
  price,
  period = 'per pesanan',
  features,
  buttonText = 'Pilih Paket',
  isPopular = false,
  isHighlighted = false,
  onSelectPlan,
}) => {
  const theme = useTheme();
  
  const handleSelectPlan = () => {
    if (onSelectPlan) {
      onSelectPlan(id);
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 350, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        transition: 'transform 0.3s, box-shadow 0.3s',
        borderWidth: isHighlighted ? 2 : 1,
        borderColor: isHighlighted ? theme.palette.primary.main : 'divider',
        borderStyle: 'solid',
        '&:hover': {
          transform: 'translateY(-8px)',
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
            right: 24,
            fontWeight: 'bold',
            zIndex: 1,
          }}
        />
      )}
      
      <CardContent sx={{ pt: 4, pb: 2, flexGrow: 1 }}>
        <Typography 
          variant="h5" 
          component="div" 
          align="center" 
          gutterBottom
          color={isHighlighted ? 'primary' : 'inherit'}
          fontWeight="bold"
        >
          {title}
        </Typography>
        
        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center" 
            sx={{ mb: 3 }}
          >
            {description}
          </Typography>
        )}
        
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h3" 
            component="div" 
            fontWeight="bold"
            color={isHighlighted ? 'primary' : 'inherit'}
          >
            {price}
          </Typography>
          
          {period && (
            <Typography variant="body2" color="text.secondary">
              {period}
            </Typography>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <List disablePadding>
          {features.map((feature, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                {feature.included ? (
                  <CheckIcon color={isHighlighted ? 'primary' : 'success'} fontSize="small" />
                ) : (
                  <CloseIcon color="action" fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={feature.title} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  color: feature.included ? 'text.primary' : 'text.secondary',
                  sx: { 
                    textDecoration: feature.included ? 'none' : 'line-through',
                  }
                }} 
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          variant={isHighlighted ? 'contained' : 'outlined'} 
          color={isHighlighted ? 'primary' : 'inherit'}
          fullWidth
          size="large"
          onClick={handleSelectPlan}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PricingCard; 