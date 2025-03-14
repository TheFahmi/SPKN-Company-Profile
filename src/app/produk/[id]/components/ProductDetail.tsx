import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
  Card,
  CardContent,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CheckIcon from "@mui/icons-material/Check";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { ProductDetailIllustration } from "../../../components/illustrations";
import ImageGallery from "./ImageGallery";
import ProductInformation from "./ProductInformation";
import ProductDescription from "./ProductDescription";
import CustomerReviews from "./CustomerReviews";
import RelatedProducts from "./RelatedProducts";
import { Product } from "@/app/types";

// Format price to Rupiah
function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
  productRating: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  relatedProducts,
  productRating,
}) => {
  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -100,
            top: "50%",
            transform: "translateY(-50%)",
            width: "600px",
            height: "600px",
            opacity: 0.1,
            display: { xs: "none", md: "block" },
          }}
        >
          <ProductDetailIllustration index={0} />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 3 }}
          >
            <MuiLink
              component={Link}
              href="/"
              color="inherit"
              underline="hover"
            >
              Beranda
            </MuiLink>
            <MuiLink
              component={Link}
              href="/produk"
              color="inherit"
              underline="hover"
            >
              Produk
            </MuiLink>
            <Typography color="white">{product.name}</Typography>
          </Breadcrumbs>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              maxWidth: "800px",
            }}
          >
            {product.name}
          </Typography>
          <Chip
            label={product.category}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              mb: 2,
            }}
          />
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Column - Gambar dan Aksi */}
          <Grid item xs={12} md={7}>
            <Card sx={{ mb: 4, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                <ImageGallery 
                  images={product.images || []} 
                  productName={product.name} 
                  defaultImage={product.imageUrl} 
                />
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  {formatPrice(product.price)}
                </Typography>

                {/* Feature-specific card with checkmarks */}
                <Card
                  sx={{
                    mt: 3,
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                    overflow: "visible",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <VerifiedUserIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Fitur Produk
                      </Typography>
                    </Box>

                    <List disablePadding>
                      {[
                        {
                          text: "Kualitas Premium",
                          icon: (
                            <CheckIcon
                              fontSize="small"
                              sx={{ color: "success.main" }}
                            />
                          ),
                        },
                        {
                          text: "Garansi Produk",
                          icon: (
                            <VerifiedUserIcon
                              fontSize="small"
                              sx={{ color: "info.main" }}
                            />
                          ),
                        },
                        {
                          text: "Pengiriman Cepat",
                          icon: (
                            <LocalShippingIcon
                              fontSize="small"
                              sx={{ color: "warning.main" }}
                            />
                          ),
                        },
                        {
                          text: "Layanan Purna Jual",
                          icon: (
                            <AssignmentTurnedInIcon
                              fontSize="small"
                              sx={{ color: "error.main" }}
                            />
                          ),
                        },
                      ].map((feature, index) => (
                        <ListItem
                          key={index}
                          disablePadding
                          sx={{
                            py: 1,
                            borderBottom: index < 3 ? "1px dashed" : "none",
                            borderColor: "divider",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {feature.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={feature.text}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight: 500,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    fullWidth
                    component="a"
                    href="https://wa.me/6281234567890?text=Saya tertarik dengan produk ini: "
                    target="_blank"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(76, 175, 80, 0.3)",
                      },
                    }}
                  >
                    Chat WhatsApp
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                    component={Link}
                    href="/kontak"
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: "bold",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(25, 118, 210, 0.3)",
                      },
                    }}
                  >
                    Pesan Sekarang
                  </Button>
                </Stack>

                {/* Add this after the action buttons */}
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color="text.primary"
                  >
                    Bagikan Produk Ini
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {[
                      { color: "#3b5998", icon: "f", label: "Facebook" },
                      { color: "#1da1f2", icon: "t", label: "Twitter" },
                      {
                        color: "#25D366",
                        icon: <WhatsAppIcon fontSize="small" />,
                        label: "WhatsApp",
                      },
                      { color: "#E60023", icon: "p", label: "Pinterest" },
                    ].map((social, index) => (
                      <Tooltip
                        key={index}
                        title={social.label}
                        arrow
                        placement="top"
                      >
                        <IconButton
                          sx={{
                            bgcolor: social.color,
                            color: "white",
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            "&:hover": {
                              bgcolor: social.color,
                              opacity: 0.9,
                              transform: "translateY(-3px) scale(1.1)",
                              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            },
                            transition: "all 0.2s ease",
                          }}
                          size="small"
                        >
                          {typeof social.icon === "string" ? (
                            <Box
                              component="span"
                              sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                            >
                              {social.icon}
                            </Box>
                          ) : (
                            social.icon
                          )}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <ProductDescription description={product.description} />

            <CustomerReviews 
              reviews={[
                {
                  name: "Ahmad Fauzi",
                  rating: 5,
                  date: "12 Maret 2023",
                  comment:
                    "Produk berkualitas tinggi dan sesuai dengan deskripsi. Pengiriman cepat dan pelayanan sangat baik. Sangat merekomendasikan!",
                },
                {
                  name: "Siti Nurhaliza",
                  rating: 4,
                  date: "5 Februari 2023",
                  comment:
                    "Kualitas produk bagus dan sesuai dengan kebutuhan kami. Hanya saja pengiriman sedikit terlambat dari jadwal yang dijanjikan.",
                },
              ]} 
              overallRating={productRating} 
            />
          </Grid>

          {/* Right Column - Informasi Produk */}
          <Grid item xs={12} md={5}>
            <ProductInformation product={product} />
          </Grid>
        </Grid>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} showViewAll={true} />

        {/* CTA Section */}
        <Card
          sx={{
            mt: 8,
            borderRadius: 3,
            bgcolor: "primary.main",
            color: "white",
            backgroundImage:
              "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)",
          }}
        >
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Typography
              variant="h4"
              component="h3"
              fontWeight="bold"
              gutterBottom
            >
              Butuh Bantuan?
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                opacity: 0.9,
              }}
            >
              Tim kami siap membantu Anda untuk konsultasi dan pemesanan produk.
              Hubungi kami sekarang untuk mendapatkan penawaran terbaik.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<WhatsAppIcon />}
                component={Link}
                href="/kontak"
                sx={{
                  fontWeight: "bold",
                  py: 1.5,
                  px: 4,
                  bgcolor: "#25D366",
                  "&:hover": {
                    bgcolor: "#128C7E",
                  },
                }}
              >
                Chat WhatsApp
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/kontak"
                sx={{
                  fontWeight: "bold",
                  py: 1.5,
                  px: 4,
                  color: "white",
                  borderColor: "white",
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Hubungi Kami
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ProductDetail;