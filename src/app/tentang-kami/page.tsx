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
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight="bold"
                  gutterBottom
                >
                  PT Sarana Pancakarya Nusa
                </Typography>
                <Typography variant="body1" paragraph>
                  Dunia perbukuan, yang menjadi bagian dari penerbitan dan
                  percetakan buku telah mengilhami PT Sarana Pancakarya Nusa
                  untuk ikut serta memberikan yang terbaik pada dunia pendidikan
                  di tanah air tercinta ini. Tekad yang diusung PT Sarana
                  Pancakarya Nusa adalah turut serta mencerdaskan kehidupan
                  bangsa, dan meningkatkan kualitas sumber daya manusia
                  Indonesia menjadi lebih baik lagi.
                </Typography>
                <Typography variant="body1" paragraph>
                  PT Sarana Pancakarya Nusa didirikan pada tahun 1986
                  berdasarkan akte notaris Koswara, No. 26 tanggal 6 Desember
                  1986 dan telah mencetak berbagai macam cetakan antara lain:
                  buku-buku teks pelajaran (dari tingkat PAUD/TK s.d. SMA/MA);
                  buku-buku nonteks pelajaran (antara lain: buku pengayaan, buku
                  referensi, buku panduan pendidik, dan buku muatan lokal);
                  buku-buku PLS (Pendidikan Luar Sekolah); buku-buku KF
                  (Keaksaraan Fungsional); bukubuku perguruan tinggi; dan
                  buku-buku umum lainnya.
                </Typography>
                <Typography variant="body1">
                  PT Sarana Pancakarya Nusa dengan jumlah karyawan sebanyak 200
                  orang (karyawan tetap dan ratusan tenaga tidak tetap yang siap
                  bekerja jika diperlukan) terus setia melengkapi kebutuhan
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
                <Box
                  sx={{
                    position: "relative",
                    height: 400,
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <AboutIllustration />
                </Box>
              </Box>
            </Slide>
          </Grid>
        </Grid>
      </Container>

      {/* Visi & Misi */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <EmojiObjectsIcon
                    color="primary"
                    sx={{ fontSize: 40, mr: 2 }}
                  />
                  <Typography variant="h4" component="h2" fontWeight="bold">
                    Visi
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Menjadi bagian dan mitra terpercaya dalam meningkatkan mutu
                  pendidikan.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <LocalPrintshopIcon
                    color="primary"
                    sx={{ fontSize: 40, mr: 2 }}
                  />
                  <Typography variant="h4" component="h2" fontWeight="bold">
                    Misi
                  </Typography>
                </Box>
                <List disablePadding>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Ikut aktif dan berkontribusi dalam mencerdaskan bangsa melalui produk pendidikan yang berkualitas" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Patuh dan taat terhadap aturan yang sudah ditetapkan" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Meningkatkan dan mengembangkan bisnis secara bertahap ke seluruh nusantara" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Membangun kebersamaan secara profesional dengan mitra usaha" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Meningkatkan dan mengembangkan mekanisme kerja melalui online dan offline" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Perjalanan Kami - Baru */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <TimelineIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Perjalanan Kami
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: "auto" }}
            >
              Sejak tahun 1966, PT Sarana Pancakarya Nusa telah berkembang
              menjadi salah satu percetakan terkemuka di Indonesia. Dipelopori
              oleh Wimpy S. Ibrahim, seorang ahli di bidang percetakan dan
              penerbitan, perusahaan ini terus berkembang dan memberikan yang
              terbaik untuk dunia pendidikan di Indonesia. Berikut adalah
              tonggak penting dalam perjalanan kami.
            </Typography>
          </Box>

          {/* Timeline Illustration - Desktop Only */}
          <Box sx={{ display: { xs: "none", md: "block" }, mb: 6 }}>
            <TimelineIllustration />
          </Box>

          {/* Timeline Tabs */}
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
              },
              "& .Mui-selected": {
                color: (theme) => theme.palette.primary.main,
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
                          : "transparent",
                      color: activeTimelineTab === index ? "white" : item.color,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      mb: 1,
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
                  },
                }}
              />
            ))}
          </Tabs>

          {/* Timeline Content */}
          <Box sx={{ position: "relative", minHeight: 300 }}>
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
                            p: 4,
                            height: "100%",
                            borderRadius: 4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                            borderLeft: `5px solid ${item.color}`,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 3,
                            }}
                          >
                            <Box
                              sx={{
                                bgcolor: item.color,
                                color: "white",
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mr: 2,
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Box>
                              <Typography variant="h6" color="text.secondary">
                                {item.year}
                              </Typography>
                              <Typography variant="h4" fontWeight="bold">
                                {item.title}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body1" paragraph>
                            {item.description}
                          </Typography>
                          <List>
                            {item.achievements.map((achievement, i) => (
                              <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <CheckCircleIcon sx={{ color: item.color }} />
                                </ListItemIcon>
                                <ListItemText primary={achievement} />
                              </ListItem>
                            ))}
                          </List>
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
                              width: 200,
                              height: 200,
                              borderRadius: "50%",
                              bgcolor: `${item.color}20`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                width: 160,
                                height: 160,
                                borderRadius: "50%",
                                bgcolor: `${item.color}40`,
                              },
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                bgcolor: `${item.color}60`,
                              },
                            }}
                          >
                            <Typography
                              variant="h2"
                              component="div"
                              sx={{
                                fontWeight: "bold",
                                color: item.color,
                                zIndex: 1,
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
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              disabled={activeTimelineTab === 0}
              onClick={() => setActiveTimelineTab((prev) => prev - 1)}
              sx={{ mr: 2 }}
            >
              Sebelumnya
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={activeTimelineTab === timelineData.length - 1}
              onClick={() => setActiveTimelineTab((prev) => prev + 1)}
            >
              Selanjutnya
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Tim Kami */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Tim Kami
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: "Budi Santoso",
                role: "Direktur Utama",
                bio: "Memiliki pengalaman lebih dari 20 tahun di industri percetakan dan penerbitan.",
              },
              {
                name: "Siti Rahayu",
                role: "Manajer Operasional",
                bio: "Ahli dalam manajemen produksi dan optimalisasi proses percetakan.",
              },
              {
                name: "Ahmad Rizki",
                role: "Kepala Desainer",
                bio: "Desainer grafis berpengalaman dengan keahlian dalam layout buku dan desain cover.",
              },
              {
                name: "Dewi Lestari",
                role: "Manajer Layanan Pelanggan",
                bio: "Berdedikasi untuk memastikan kepuasan pelanggan dan kualitas layanan terbaik.",
              },
            ].map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box sx={{ height: 200, position: "relative" }}>
                    <TeamIllustration index={index} />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
