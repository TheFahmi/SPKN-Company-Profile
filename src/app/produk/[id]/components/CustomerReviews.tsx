import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Rating,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

interface Review {
  name: string;
  rating: number;
  date: string;
  comment: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
  overallRating: number;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews = [],
  overallRating = 0,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "divider",
        mb: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: "warning.main",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <StarIcon sx={{ color: "white" }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
          Ulasan Pelanggan
        </Typography>
      </Box>
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: "warning.main",
                color: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                boxShadow: "0 4px 12px rgba(255, 152, 0, 0.3)",
              }}
            >
              <Typography variant="h4" fontWeight="bold" lineHeight={1}>
                {overallRating.toFixed(1)}
              </Typography>
              <Box sx={{ display: "flex", mt: 0.5 }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{ fontSize: "0.6rem", color: "white" }}
                  />
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={600} color="text.primary">
                Rating Keseluruhan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Berdasarkan {reviews.length} ulasan pelanggan
              </Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              "&:hover": {
                bgcolor: "warning.main",
                color: "white",
              },
            }}
          >
            Tulis Ulasan
          </Button>
        </Box>

        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                mb: index < reviews.length - 1 ? 3 : 0,
                pb: index < reviews.length - 1 ? 3 : 0,
                borderBottom: index < reviews.length - 1 ? "1px solid" : "none",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "primary.light",
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {review.name.charAt(0)}
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {review.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={review.rating} readOnly size="small" />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pl: 6 }}
              >
                {review.comment}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", py: 2 }}
          >
            Belum ada ulasan untuk produk ini.
          </Typography>
        )}

        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.primary"
            gutterBottom
          >
            Sudah menggunakan produk ini?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Bagikan pengalaman Anda dengan pelanggan lain
          </Typography>
          <Button
            variant="contained"
            color="warning"
            startIcon={<StarIcon />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(255, 152, 0, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(255, 152, 0, 0.3)",
              },
            }}
          >
            Tulis Ulasan
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerReviews;