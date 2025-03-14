"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Zoom,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

interface VisionMissionProps {
  isVisible: boolean;
}

const VisionMission: React.FC<VisionMissionProps> = ({ isVisible }) => {
  const milestones = [
    {
      year: '1966',
      title: 'Pendirian Perusahaan',
      description: 'PT Sarana Pancakarya Nusa didirikan sebagai perusahaan percetakan skala kecil di Jakarta.'
    },
    {
      year: '1975',
      title: 'Ekspansi Pertama',
      description: 'Perusahaan memperluas fasilitas produksi dan menambahkan layanan penerbitan buku.'
    },
    {
      year: '1985',
      title: 'Modernisasi Teknologi',
      description: 'Implementasi teknologi percetakan modern untuk meningkatkan kualitas dan kapasitas produksi.'
    },
    {
      year: '1995',
      title: 'Sertifikasi ISO',
      description: 'Memperoleh sertifikasi ISO 9001 untuk sistem manajemen mutu.'
    },
    {
      year: '2005',
      title: 'Pengembangan Security Printing',
      description: 'Mulai mengembangkan layanan security printing untuk dokumen berharga.'
    },
    {
      year: '2015',
      title: 'Digitalisasi',
      description: 'Mengintegrasikan teknologi digital dalam proses produksi dan manajemen.'
    },
    {
      year: '2023',
      title: 'Ekspansi Nasional',
      description: 'Memperluas jangkauan layanan ke seluruh wilayah Indonesia dengan jaringan distribusi yang lebih luas.'
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/images/bg-pattern.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "400px",
          opacity: 0.03,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="overline"
            component="p"
            sx={{
              color: "primary.main",
              fontWeight: 600,
              letterSpacing: 1.5,
              mb: 1,
            }}
          >
            TUJUAN & ARAH KAMI
          </Typography>
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            sx={{
              mb: 2,
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Visi & Misi
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 650,
              mx: "auto",
              mb: 2,
            }}
          >
            Komitmen kami untuk memberikan layanan terbaik dan berkontribusi
            pada dunia pendidikan Indonesia
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              bgcolor: "primary.main",
              borderRadius: 2,
              mx: "auto",
              mb: 6,
            }}
          />
        </Box>

        <Grid container spacing={6} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Zoom in={isVisible} timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 15px 50px rgba(25, 118, 210, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "primary.main",
                    p: 4,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -30,
                      left: -30,
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.15)",
                        mb: 2,
                      }}
                    >
                      <VisibilityIcon
                        sx={{ fontSize: 30, color: "white" }}
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      component="h3"
                      fontWeight="bold"
                      color="white"
                      gutterBottom
                    >
                      Visi
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="rgba(255,255,255,0.8)"
                      sx={{
                        pb: 2,
                        borderBottom: "1px solid rgba(255,255,255,0.2)",
                        mb: 2,
                      }}
                    >
                      Menjadi perusahaan percetakan dan penerbitan terkemuka di Indonesia yang dikenal karena kualitas, inovasi, dan layanan prima, serta berkontribusi pada perkembangan industri percetakan nasional.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                  >
                    Visi Kami
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "primary.light",
                      color: "primary.contrastText",
                      boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
                    }}
                  >
                    <Typography variant="body1" fontWeight="medium">
                      "Menjadi pemimpin pasar dalam industri percetakan dan penerbitan"
                    </Typography>
                  </Paper>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                      border: "1px dashed",
                      borderColor: "primary.light",
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "primary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <CheckCircleIcon
                        sx={{ fontSize: 20, color: "primary.main" }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Kami berkomitmen untuk menjadi mitra yang dapat
                      diandalkan dalam upaya peningkatan kualitas pendidikan
                      di Indonesia.
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>

          <Grid item xs={12} md={6}>
            <Zoom in={isVisible} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 15px 50px rgba(25, 118, 210, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#4caf50",
                    p: 4,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: -20,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -30,
                      left: -30,
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.15)",
                        mb: 2,
                      }}
                    >
                      <EmojiObjectsIcon
                        sx={{ fontSize: 30, color: "white" }}
                      />
                    </Box>
                    <Typography
                      variant="h4"
                      component="h3"
                      fontWeight="bold"
                      color="white"
                      gutterBottom
                    >
                      Misi
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="rgba(255,255,255,0.8)"
                      sx={{
                        pb: 2,
                        borderBottom: "1px solid rgba(255,255,255,0.2)",
                        mb: 2,
                      }}
                    >
                      Langkah-langkah strategis kami
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ p: 4 }}>
                  <List disablePadding>
                    {milestones.map((milestone, index) => (
                      <ListItem
                        key={index}
                        disableGutters
                        sx={{
                          py: 1.5,
                          borderBottom: index < milestones.length - 1 ? "1px solid" : "none",
                          borderColor: "divider",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 36,
                            "& .MuiSvgIcon-root": {
                              fontSize: 20,
                              p: 0.5,
                              borderRadius: "50%",
                              bgcolor: "rgba(76, 175, 80, 0.1)",
                              color: "#4caf50",
                            },
                          }}
                        >
                          <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={milestone.title}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                            fontWeight: "medium",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionMission; 