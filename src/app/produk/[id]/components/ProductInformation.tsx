import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Product } from "@/app/types";

interface ProductInformationProps {
  product: Product;
}

const ProductInformation: React.FC<ProductInformationProps> = ({ product }) => {
  // Define the specifications to display
  const specifications = [
    {
      key: 'author',
      label: 'Penulis',
      value: product.author,
      icon: <PersonIcon fontSize="small" color="primary" />
    },
    {
      key: 'publisher',
      label: 'Penerbit',
      value: product.publisher,
      icon: <BusinessIcon fontSize="small" color="primary" />
    },
    {
      key: 'level',
      label: 'Jenjang',
      value: product.level,
      icon: <SchoolIcon fontSize="small" color="primary" />
    },
    {
      key: 'pages',
      label: 'Jumlah Halaman',
      value: product.pages > 0 ? product.pages : null,
      icon: <MenuBookIcon fontSize="small" color="primary" />
    },
    {
      key: 'year',
      label: 'Tahun Terbit',
      value: product.year,
      icon: <CalendarTodayIcon fontSize="small" color="primary" />
    },
    {
      key: 'size',
      label: 'Ukuran',
      value: product.size,
      icon: <AspectRatioIcon fontSize="small" color="primary" />
    },
    {
      key: 'isbn',
      label: 'ISBN',
      value: product.isbn,
      icon: <QrCodeIcon fontSize="small" color="primary" />
    }
  ];

  // Filter out specifications that don't have values
  const availableSpecs = specifications.filter(spec => spec.value);

  if (availableSpecs.length === 0) {
    return null;
  }

  return (
    <Card sx={{ borderRadius: 3, mb: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Informasi Produk
        </Typography>
        <Divider sx={{ my: 2 }} />
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              {availableSpecs.map((spec) => (
                <TableRow key={spec.key}>
                  <TableCell component="th" sx={{ width: "40%", border: "none" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          bgcolor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {spec.icon}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {spec.label}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography variant="body2">
                      {spec.value}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ProductInformation;