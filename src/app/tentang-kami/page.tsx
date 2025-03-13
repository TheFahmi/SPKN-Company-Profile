"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Tabs,
  Tab,
  Fade,
  Grow,
  Zoom,
  Slide,
} from "@mui/material";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistoryIcon from "@mui/icons-material/History";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import TimelineIcon from "@mui/icons-material/Timeline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import {
  AboutIllustration,
  TeamIllustration,
  TimelineIllustration,
  HeroIllustration,
} from "../components/illustrations";

// Data perjalanan perusahaan
const timelineData = [
  {
    year: "1966",
    title: "Awal Mula",
    description:
      "Dipelopori oleh seorang ahli di bidang percetakan dan penerbitan yang telah mengabdikan dirinya sejak tahun 1966, Wimpy S. Ibrahim.",
    icon: <HistoryIcon />,
    color: "#1976d2",
    achievements: [
      "Pengabdian di bidang percetakan dan penerbitan",
      "Membangun fondasi untuk masa depan",
      "Mengembangkan keahlian di industri percetakan",
    ],
  },
  {
    year: "1986",
    title: "Pendirian PT SPKN",
    description:
      "PT Sarana Pancakarya Nusa didirikan berdasarkan akte notaris Koswara, No. 26 tanggal 6 Desember 1986.",
    icon: <LocalPrintshopIcon />,
    color: "#4caf50",
    achievements: [
      "Pendirian resmi perusahaan",
      "Memulai operasi percetakan profesional",
      "Fokus pada produksi buku pendidikan",
    ],
  },
  {
    year: "2000",
    title: "Ekspansi Layanan",
    description:
      "Memperluas jangkauan layanan dengan berbagai jenis cetakan dan buku pendidikan.",
    icon: <EmojiObjectsIcon />,
    color: "#ff9800",
    achievements: [
      "Produksi buku teks pelajaran PAUD hingga SMA/MA",
      "Pengembangan buku non-teks pelajaran",
      "Penerbitan buku perguruan tinggi",
    ],
  },
  {
    year: "2010",
    title: "Modernisasi",
    description:
      "Peningkatan kapasitas produksi dan modernisasi teknologi percetakan.",
    icon: <GroupsIcon />,
    color: "#9c27b0",
    achievements: [
      "Investasi mesin cetak modern",
      "Peningkatan kualitas produksi",
      "Pengembangan SDM profesional",
    ],
  },
  {
    year: "2023",
    title: "Era Digital",
    description:
      "Mengembangkan platform digital dan meningkatkan layanan online.",
    icon: <LocalPrintshopIcon />,
    color: "#f50057",
    achievements: [
      "Peluncuran website perusahaan",
      "Pengembangan sistem manajemen digital",
      "Peningkatan efisiensi produksi",
    ],
  },
];

export default function AboutPage() {
  // State untuk tab timeline yang aktif
  const [activeTimelineTab, setActiveTimelineTab] = useState(0);
  const [isVisible, setIsVisible] = useState({
    header: false,
    content: false,
    timeline: false,
    values: false,
  });

  const handleTimelineTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTimelineTab(newValue);
  };

  useEffect(() => {
    setIsVisible({
      header: true,
      content: true,
      timeline: true,
      values: true,
    });
  }, []);

  return (
    <>
      <Fade in={isVisible.header} timeout={1000}>
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
            <Slide direction="right" in={isVisible.header} timeout={1200}>
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
                      Mitra Terpercaya dalam Meningkatkan Mutu Pendidikan Sejak
                      1966
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

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Fade in={isVisible.content} timeout={1000}>
              <Box
                sx={{
                  transform: isVisible.content
                    ? "translateY(0)"
                    : "translateY(20px)",
                  opacity: isVisible.content ? 1 : 0,
                  transition: "all 0.6s ease-out",
                }}
              >
                <Box sx={{ mb: 4 }}>
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
                    TENTANG PERUSAHAAN
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    fontWeight="bold"
                    sx={{
                      mb: 2,
                      background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    PT Sarana Pancakarya Nusa
                  </Typography>
                  <Box
                    sx={{
                      width: 80,
                      height: 4,
                      bgcolor: "primary.main",
                      borderRadius: 2,
                      mb: 3,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 2,
                    bgcolor: "primary.light",
                    color: "primary.contrastText",
                    boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
                  }}
                >
                  <Typography variant="body1" fontWeight="medium">
                    "Tekad yang diusung PT Sarana Pancakarya Nusa adalah turut
                    serta mencerdaskan kehidupan bangsa, dan meningkatkan
                    kualitas sumber daya manusia Indonesia menjadi lebih baik
                    lagi."
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    fontSize: "1.05rem",
                    lineHeight: 1.7,
                    color: "text.primary",
                  }}
                >
                  Dunia perbukuan, yang menjadi bagian dari penerbitan dan
                  percetakan buku telah mengilhami PT Sarana Pancakarya Nusa
                  untuk ikut serta memberikan yang terbaik pada dunia pendidikan
                  di tanah air tercinta ini.
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              bgcolor: "primary.light",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1.5,
                            }}
                          >
                            <LocalPrintshopIcon
                              sx={{ fontSize: 20, color: "primary.main" }}
                            />
                          </Box>
                          <Typography variant="h6" fontWeight="bold">
                            1986
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          Didirikan berdasarkan akte notaris Koswara, No. 26
                          tanggal 6 Desember 1986
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: 2,
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              bgcolor: "primary.light",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              mr: 1.5,
                            }}
                          >
                            <GroupsIcon
                              sx={{ fontSize: 20, color: "primary.main" }}
                            />
                          </Box>
                          <Typography variant="h6" fontWeight="bold">
                            200+
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          Karyawan profesional yang siap melayani kebutuhan Anda
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Typography variant="body1" paragraph>
                  PT Sarana Pancakarya Nusa telah mencetak berbagai macam
                  cetakan antara lain: buku-buku teks pelajaran (dari tingkat
                  PAUD/TK s.d. SMA/MA); buku-buku nonteks pelajaran (antara
                  lain: buku pengayaan, buku referensi, buku panduan pendidik,
                  dan buku muatan lokal); buku-buku PLS (Pendidikan Luar
                  Sekolah); buku-buku KF (Keaksaraan Fungsional); bukubuku
                  perguruan tinggi; dan buku-buku umum lainnya.
                </Typography>

                <Typography variant="body1">
                  PT Sarana Pancakarya Nusa terus setia melengkapi kebutuhan
                  berbagai macam cetakan besar ataupun kecil serta berbagai
                  bahan ajar dan cetakan security secara tepat waktu, tepat
                  jumlah dengan standar kualitas terjamin karena PT Sarana
                  Pancakarya Nusa dipimpin dan didukung oleh para pekerja
                  profesional di bidangnya.
                </Typography>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Slide direction="left" in={isVisible.content} timeout={1200}>
              <Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.1) 100%)",
                      zIndex: 0,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 400,
                      width: "100%",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <AboutIllustration />
                  </Box>

                  <Box sx={{ mt: 4, position: "relative", zIndex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "primary.main" }}
                    >
                      Keunggulan Kami
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      {[
                        {
                          label: "Kualitas Terjamin",
                          icon: <CheckCircleIcon fontSize="small" />,
                        },
                        {
                          label: "Tepat Waktu",
                          icon: <CheckCircleIcon fontSize="small" />,
                        },
                        {
                          label: "Profesional",
                          icon: <CheckCircleIcon fontSize="small" />,
                        },
                        {
                          label: "Inovatif",
                          icon: <CheckCircleIcon fontSize="small" />,
                        },
                      ].map((item, index) => (
                        <Grid item xs={6} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 1.5,
                              borderRadius: 2,
                              bgcolor: "background.paper",
                              border: "1px solid",
                              borderColor: "divider",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "primary.main",
                                color: "white",
                                "& .MuiSvgIcon-root": {
                                  color: "white",
                                },
                              },
                            }}
                          >
                            <Box
                              sx={{
                                mr: 1.5,
                                color: "primary.main",
                                transition: "color 0.2s ease",
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Typography variant="body2" fontWeight="medium">
                              {item.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* Visi & Misi */}
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
              <Zoom in={isVisible.values} timeout={800}>
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
                        Pandangan jangka panjang kami
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
                        "Menjadi bagian dan mitra terpercaya dalam meningkatkan
                        mutu pendidikan."
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
              <Zoom in={isVisible.values} timeout={1000}>
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
                        <LocalPrintshopIcon
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
                      {[
                        "Ikut aktif dan berkontribusi dalam mencerdaskan bangsa melalui produk pendidikan yang berkualitas",
                        "Patuh dan taat terhadap aturan yang sudah ditetapkan",
                        "Meningkatkan dan mengembangkan bisnis secara bertahap ke seluruh nusantara",
                        "Membangun kebersamaan secara profesional dengan mitra usaha",
                        "Meningkatkan dan mengembangkan mekanisme kerja melalui online dan offline",
                      ].map((item, index) => (
                        <ListItem
                          key={index}
                          disableGutters
                          sx={{
                            py: 1.5,
                            borderBottom: index < 4 ? "1px solid" : "none",
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
                            primary={item}
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

      {/* Perjalanan Kami */}
      <Box
        sx={{
          py: { xs: 10, md: 12 },
          position: "relative",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
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
            opacity: 0.05,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
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
              SEJARAH PERUSAHAAN
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
              Perjalanan Kami
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: "auto",
                mb: 2,
              }}
            >
              Sejak tahun 1966, PT Sarana Pancakarya Nusa telah berkembang
              menjadi salah satu percetakan terkemuka di Indonesia. Berikut
              adalah tonggak penting dalam perjalanan kami.
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

          {/* Timeline Illustration - Desktop Only */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              mb: 6,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: 3,
                bgcolor: "rgba(25, 118, 210, 0.1)",
                borderRadius: 1.5,
                zIndex: 0,
              },
            }}
          >
            <TimelineIllustration />
          </Box>

          {/* Timeline Tabs */}
          <Box sx={{ mb: 6 }}>
            <Tabs
              value={activeTimelineTab}
              onChange={handleTimelineTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                mb: 4,
                "& .MuiTab-root": {
                  minWidth: 100,
                  fontWeight: "bold",
                  borderRadius: 2,
                  mx: 0.5,
                  transition: "all 0.3s ease",
                },
                "& .Mui-selected": {
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: "rgba(25, 118, 210, 0.05)",
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: 1.5,
                },
              }}
            >
              {timelineData.map((item, index) => (
                <Tab
                  key={index}
                  label={item.year}
                  icon={
                    <Box
                      sx={{
                        bgcolor:
                          activeTimelineTab === index
                            ? item.color
                            : "rgba(0,0,0,0.04)",
                        color:
                          activeTimelineTab === index ? "white" : item.color,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        mb: 1,
                        boxShadow:
                          activeTimelineTab === index
                            ? `0 4px 10px ${item.color}80`
                            : "none",
                      }}
                    >
                      {React.cloneElement(item.icon, { fontSize: "small" })}
                    </Box>
                  }
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&.Mui-selected": {
                      bgcolor: "rgba(25, 118, 210, 0.05)",
                      transform: "translateY(-5px)",
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Timeline Content */}
          <Box sx={{ position: "relative", minHeight: 400, mb: 4 }}>
            {timelineData.map((item, index) => (
              <Fade
                key={index}
                in={activeTimelineTab === index}
                timeout={500}
                style={{
                  display: activeTimelineTab === index ? "block" : "none",
                  position: "absolute",
                  width: "100%",
                }}
              >
                <Box>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Zoom in={activeTimelineTab === index} timeout={700}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 0,
                            height: "100%",
                            borderRadius: 4,
                            overflow: "hidden",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: item.color,
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
                                {item.icon}
                              </Box>
                              <Box>
                                <Typography
                                  variant="h6"
                                  color="rgba(255,255,255,0.9)"
                                  sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 5,
                                    bgcolor: "rgba(0,0,0,0.1)",
                                    mb: 1,
                                  }}
                                >
                                  {item.year}
                                </Typography>
                                <Typography
                                  variant="h4"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  {item.title}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box sx={{ p: 4 }}>
                            <Typography
                              variant="body1"
                              paragraph
                              sx={{
                                color: "text.primary",
                                lineHeight: 1.7,
                              }}
                            >
                              {item.description}
                            </Typography>

                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              sx={{
                                mb: 2,
                                color: item.color,
                                textTransform: "uppercase",
                                fontSize: "0.75rem",
                                letterSpacing: 0.5,
                              }}
                            >
                              Pencapaian Utama:
                            </Typography>

                            <List>
                              {item.achievements.map((achievement, i) => (
                                <ListItem
                                  key={i}
                                  disableGutters
                                  sx={{
                                    py: 1,
                                    borderBottom:
                                      i < item.achievements.length - 1
                                        ? "1px dashed"
                                        : "none",
                                    borderColor: "divider",
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      minWidth: 36,
                                      "& .MuiSvgIcon-root": {
                                        fontSize: 18,
                                        p: 0.5,
                                        borderRadius: "50%",
                                        bgcolor: `${item.color}15`,
                                        color: item.color,
                                      },
                                    }}
                                  >
                                    <CheckCircleIcon />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={achievement}
                                    primaryTypographyProps={{
                                      variant: "body2",
                                      fontWeight: "medium",
                                      color: "text.primary",
                                    }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Paper>
                      </Zoom>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{ display: { xs: "none", md: "block" } }}
                    >
                      <Grow in={activeTimelineTab === index} timeout={1000}>
                        <Box
                          sx={{
                            height: "100%",
                            minHeight: 300,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: 280,
                              height: 280,
                              borderRadius: "50%",
                              bgcolor: `${item.color}10`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: `0 0 60px ${item.color}30`,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: `0 0 80px ${item.color}40`,
                              },
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                width: 220,
                                height: 220,
                                borderRadius: "50%",
                                bgcolor: `${item.color}20`,
                              },
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                width: 160,
                                height: 160,
                                borderRadius: "50%",
                                bgcolor: `${item.color}30`,
                              },
                            }}
                          >
                            <Typography
                              variant="h1"
                              component="div"
                              sx={{
                                fontWeight: "bold",
                                color: item.color,
                                zIndex: 1,
                                fontSize: { md: "4rem", lg: "5rem" },
                              }}
                            >
                              {item.year}
                            </Typography>
                          </Box>
                        </Box>
                      </Grow>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
              gap: 3,
              position: "sticky",
              bottom: { xs: 16, md: 24 },
              zIndex: 10,
              pb: 4,
              "& button": {
                minWidth: { xs: 120, md: 150 },
              },
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              disabled={activeTimelineTab === 0}
              onClick={() => setActiveTimelineTab((prev) => prev - 1)}
              sx={{
                fontWeight: "bold",
                borderRadius: 2,
                px: 3,
                py: 1.5,
                borderWidth: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                "&:not(:disabled)": {
                  borderColor: "primary.main",
                  "&:hover": {
                    borderWidth: 2,
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                  },
                },
                transition: "all 0.2s ease",
              }}
            >
              Sebelumnya
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={activeTimelineTab === timelineData.length - 1}
              onClick={() => setActiveTimelineTab((prev) => prev + 1)}
              sx={{
                fontWeight: "bold",
                borderRadius: 2,
                px: 3,
                py: 1.5,
                boxShadow: "0 4px 14px rgba(25, 118, 210, 0.3)",
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
                  transform: "translateY(-3px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Selanjutnya
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Tim Kami Section */}
      <Box
        id="tim-kami"
        sx={{
          py: { xs: 8, md: 12 },
          position: "relative",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
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
            opacity: 0.05,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ mb: 8, textAlign: "center" }}>
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
              PROFESIONAL & BERPENGALAMAN
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
              Tim Kami
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 650,
                mx: "auto",
                mb: 6,
              }}
            >
              Dipimpin oleh para profesional berpengalaman di bidangnya, tim
              kami berkomitmen untuk memberikan layanan terbaik dan hasil
              berkualitas tinggi.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: "Budi Santoso",
                role: "Direktur Utama",
                bio: "Memiliki pengalaman lebih dari 20 tahun di industri percetakan dan penerbitan. Budi telah memimpin berbagai proyek besar dan mengembangkan strategi inovatif untuk pertumbuhan perusahaan.",
                expertise: [
                  "Manajemen Strategis",
                  "Pengembangan Bisnis",
                  "Kepemimpinan",
                ],
                color: "#1976d2",
                social: {
                  linkedin: "#",
                  email: "budi@example.com",
                },
              },
              {
                name: "Siti Rahayu",
                role: "Manajer Operasional",
                bio: "Ahli dalam manajemen produksi dan optimalisasi proses percetakan. Siti fokus pada efisiensi operasional dan peningkatan kualitas produk melalui implementasi teknologi modern.",
                expertise: [
                  "Manajemen Produksi",
                  "Optimalisasi Proses",
                  "Kontrol Kualitas",
                ],
                color: "#f50057",
                social: {
                  linkedin: "#",
                  email: "siti@example.com",
                },
              },
              {
                name: "Ahmad Rizki",
                role: "Kepala Desainer",
                bio: "Desainer grafis berpengalaman dengan keahlian dalam layout buku dan desain cover. Ahmad memiliki mata yang tajam untuk detail dan selalu mengikuti tren desain terkini.",
                expertise: ["Desain Grafis", "Layout Buku", "Branding"],
                color: "#4caf50",
                social: {
                  linkedin: "#",
                  email: "ahmad@example.com",
                },
              },
              {
                name: "Dewi Lestari",
                role: "Manajer Layanan Pelanggan",
                bio: "Berdedikasi untuk memastikan kepuasan pelanggan dan kualitas layanan terbaik. Dewi memiliki kemampuan komunikasi yang luar biasa dan selalu mengutamakan kebutuhan klien.",
                expertise: [
                  "Layanan Pelanggan",
                  "Komunikasi",
                  "Manajemen Hubungan",
                ],
                color: "#ff9800",
                social: {
                  linkedin: "#",
                  email: "dewi@example.com",
                },
              },
            ].map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Grow in={isVisible.values} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        boxShadow: `0 15px 35px rgba(${
                          member.color === "#1976d2"
                            ? "25, 118, 210"
                            : member.color === "#f50057"
                            ? "245, 0, 87"
                            : member.color === "#4caf50"
                            ? "76, 175, 80"
                            : "255, 152, 0"
                        }, 0.15)`,
                        "& .MuiBox-root.team-illustration": {
                          transform: "scale(1.05)",
                        },
                        "& .MuiBox-root.social-icons": {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        height: 220,
                        bgcolor: `${member.color}15`,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        className="team-illustration"
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "80%",
                          height: "80%",
                          transition: "transform 0.3s ease-in-out",
                        }}
                      >
                        <TeamIllustration index={index} />
                      </Box>

                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          bgcolor: "white",
                          color: member.color,
                          px: 2,
                          py: 0.5,
                          borderRadius: 5,
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          zIndex: 2,
                        }}
                      >
                        {member.role}
                      </Box>

                      <Box
                        className="social-icons"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                          p: 1.5,
                          bgcolor: "rgba(255,255,255,0.9)",
                          backdropFilter: "blur(4px)",
                          borderTop: "1px solid",
                          borderColor: "divider",
                          opacity: 0,
                          transform: "translateY(10px)",
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: `${member.color}15`,
                            color: member.color,
                            "&:hover": {
                              bgcolor: member.color,
                              color: "white",
                            },
                          }}
                          component="a"
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LinkedInIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: `${member.color}15`,
                            color: member.color,
                            "&:hover": {
                              bgcolor: member.color,
                              color: "white",
                            },
                          }}
                          component="a"
                          href={`mailto:${member.social.email}`}
                        >
                          <EmailIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        fontWeight="bold"
                        gutterBottom
                      >
                        {member.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {member.bio}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        sx={{
                          mb: 1.5,
                          color: member.color,
                          fontSize: "0.75rem",
                          letterSpacing: 0.5,
                        }}
                      >
                        KEAHLIAN:
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {member.expertise.map((skill, idx) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="small"
                            sx={{
                              bgcolor: `${member.color}15`,
                              color: member.color,
                              fontWeight: 500,
                              fontSize: "0.7rem",
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              mt: 8,
              textAlign: "center",
              p: 4,
              borderRadius: 4,
              bgcolor: "rgba(25, 118, 210, 0.04)",
              border: "1px dashed",
              borderColor: "primary.light",
            }}
          >
            <Typography
              variant="h5"
              component="p"
              fontWeight="medium"
              sx={{ mb: 3, color: "text.primary" }}
            >
              Tertarik untuk bergabung dengan tim kami?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              href="/kontak"
              startIcon={<GroupsIcon />}
              sx={{
                fontWeight: "bold",
                py: 1.5,
                px: 4,
                borderRadius: 3,
                background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                boxShadow: "0 4px 14px rgba(25, 118, 210, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 20px rgba(25, 118, 210, 0.6)",
                },
              }}
            >
              Kirim Lamaran
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}