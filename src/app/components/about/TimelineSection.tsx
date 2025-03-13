'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Fade,
  Grow,
  Chip
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TimelineIllustration } from '../illustrations';

interface TimelineSectionProps {
  isVisible: boolean;
}

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

const TimelineSection: React.FC<TimelineSectionProps> = ({ isVisible }) => {
  const [activeTimelineTab, setActiveTimelineTab] = useState(0);

  const handleTimelineTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveTimelineTab(newValue);
  };

  return (
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
            position: "relative",
            zIndex: 2,
            pb: 4,
            mb: 4,
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
  );
};

export default TimelineSection;