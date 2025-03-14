"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
  Slide,
  Fade,
} from "@mui/material";
import Link from "next/link";
import { HeroIllustration } from "../../components/illustrations";

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  return (
    <Fade in={isVisible} timeout={1000}>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          pt: { xs: 6, md: 8 },
          pb: { xs: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Illustration */}
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
          <HeroIllustration />
        </Box>
        <Container maxWidth="lg">
          <Slide direction="right" in={isVisible} timeout={1200}>
            <Box>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Tentang Kami
                  </Typography>
                  <Typography
                    variant="h6"
                    color="rgba(255, 255, 255, 0.8)"
                    sx={{ mb: 3 }}
                  >
                    Mengenal lebih dekat PT Sarana Pancakarya Nusa, perusahaan percetakan dan penerbitan terpercaya sejak 1966.
                  </Typography>
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    <MuiLink
                      component={Link}
                      href="/"
                      color="inherit"
                      underline="hover"
                    >
                      Beranda
                    </MuiLink>
                    <Typography color="white">Tentang Kami</Typography>
                  </Breadcrumbs>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      width: "100%",
                    }}
                  >
                    <HeroIllustration />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Slide>
        </Container>
      </Box>
    </Fade>
  );
};

export default HeroSection; 