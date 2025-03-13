import React from "react";
import { Box, Card, CardContent, Typography, Divider } from "@mui/material";

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
}) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Deskripsi Produk
        </Typography>
        <Divider sx={{ my: 2 }} />
        {description ? (
          <Box
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: 1,
                my: 2,
              },
              "& p": {
                mb: 2,
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                color: "text.primary",
                fontWeight: "bold",
                mt: 3,
                mb: 2,
              },
              "& ul, & ol": {
                pl: 3,
                mb: 2,
              },
              "& li": {
                mb: 1,
              },
              "& a": {
                color: "primary.main",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
              "& blockquote": {
                borderLeft: "4px solid",
                borderColor: "divider",
                pl: 2,
                py: 1,
                my: 2,
                fontStyle: "italic",
                bgcolor: "background.paper",
                borderRadius: 1,
              },
              "& table": {
                width: "100%",
                borderCollapse: "collapse",
                my: 2,
              },
              "& th, & td": {
                border: "1px solid",
                borderColor: "divider",
                p: 1,
              },
              "& th": {
                bgcolor: "background.paper",
                fontWeight: "bold",
              },
            }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            Tidak ada deskripsi tersedia untuk produk ini.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDescription;