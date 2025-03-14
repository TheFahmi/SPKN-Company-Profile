import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import { Product } from "@/app/types";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = "Produk Terkait",
  showViewAll = false,
}) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        mb: 3 
      }}>
        <Typography variant="h5" component="h3" fontWeight="bold">
          {title}
        </Typography>
        
        {showViewAll && (
          <Button 
            component={Link} 
            href="/produk" 
            endIcon={<ArrowForwardIcon />}
            sx={{ 
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.08)',
                transform: 'translateX(4px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Lihat Semua
          </Button>
        )}
      </Box>
      
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid 
            item 
            key={product._id ? product._id.toString() : product.id} 
            xs={12} 
            sm={6} 
            md={3} 
            lg={3}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;