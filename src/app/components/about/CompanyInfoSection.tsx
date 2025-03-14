'use client';

import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Fade,
  Slide
} from '@mui/material';
import { AboutIllustration } from '../illustrations';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CompanyInfoSectionProps {
  isVisible: boolean;
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({ isVisible }) => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Fade in={isVisible} timeout={1000}>
            <Box
              sx={{
                transform: isVisible
                  ? "translateY(0)"
                  : "translateY(20px)",
                opacity: isVisible ? 1 : 0,
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
          <Slide direction="left" in={isVisible} timeout={1200}>
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
  );
};

export default CompanyInfoSection;