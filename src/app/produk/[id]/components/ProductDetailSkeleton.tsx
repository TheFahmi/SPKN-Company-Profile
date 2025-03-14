import React from "react";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

const ProductDetailSkeleton: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh" }}>
      {/* Header Section Skeleton */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Skeleton
            variant="text"
            width={300}
            height={20}
            sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 3 }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height={60}
            sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width={100}
            height={32}
            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
          />
        </Container>
      </Box>

      {/* Main Content Skeleton */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Left Column Skeleton */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                mb: 4,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Skeleton
                  variant="rectangular"
                  height={450}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                />
                <Box sx={{ p: 2, display: "flex", gap: 1, overflowX: "auto" }}>
                  {Array.from(new Array(5)).map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      width={80}
                      height={80}
                      sx={{
                        bgcolor: "rgba(0,0,0,0.07)",
                        borderRadius: 2,
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Skeleton
                        variant="text"
                        width={150}
                        height={48}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={24}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                      <Skeleton
                        variant="circular"
                        width={40}
                        height={40}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                    </Box>
                  </Box>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={48}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", borderRadius: 2 }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={48}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", borderRadius: 2 }}
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
                <Skeleton
                  variant="text"
                  width={200}
                  height={56}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                />
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="95%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 3 }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", borderRadius: 2, mb: 3 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column Skeleton */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                mb: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ bgcolor: "primary.main", py: 2, px: 3 }}>
                <Skeleton
                  variant="text"
                  width={200}
                  height={32}
                  sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
                />
              </Box>
              <CardContent sx={{ p: 0 }}>
                {Array.from(new Array(6)).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 3,
                      py: 2,
                      borderBottom: index < 5 ? "1px solid" : "none",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={32}
                      height={32}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", mr: 2 }}
                    />
                    <Box sx={{ width: "100%" }}>
                      <Skeleton
                        variant="text"
                        width="30%"
                        height={16}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)", mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={24}
                        sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card
              sx={{
                borderRadius: 3,
                mb: 4,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                  />
                  <Skeleton
                    variant="text"
                    width={150}
                    height={32}
                    sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                  />
                </Box>
                {Array.from(new Array(4)).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={20}
                      height={20}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)", mr: 2 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={20}
                      sx={{ bgcolor: "rgba(0,0,0,0.07)" }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetailSkeleton;