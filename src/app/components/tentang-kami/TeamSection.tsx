"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Grow,
  Chip,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import { TeamIllustration } from "../../components/illustrations";

interface TeamSectionProps {
  isVisible: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ isVisible }) => {
  const team = [
    {
      name: 'Budi Santoso',
      position: 'Direktur Utama',
      bio: 'Memiliki pengalaman lebih dari 25 tahun dalam industri percetakan dan penerbitan. Budi telah memimpin perusahaan melalui berbagai transformasi teknologi dan ekspansi bisnis.',
      avatar: '/images/team/ceo.jpg',
      color: '#1976d2',
      social: {
        linkedin: 'https://linkedin.com/in/budisantoso',
        email: 'budi.santoso@spkn.co.id'
      },
      expertise: ['Manajemen Strategis', 'Pengembangan Bisnis', 'Kepemimpinan']
    },
    {
      name: 'Siti Rahayu',
      position: 'Direktur Operasional',
      bio: 'Ahli dalam manajemen operasional percetakan dengan fokus pada efisiensi produksi dan kontrol kualitas. Siti telah berhasil mengimplementasikan berbagai inovasi proses yang meningkatkan produktivitas.',
      avatar: '/images/team/coo.jpg',
      color: '#f50057',
      social: {
        linkedin: 'https://linkedin.com/in/sitirahayu',
        email: 'siti.rahayu@spkn.co.id'
      },
      expertise: ['Manajemen Operasional', 'Kontrol Kualitas', 'Optimasi Proses']
    },
    {
      name: 'Hendra Wijaya',
      position: 'Kepala Divisi Teknologi',
      bio: 'Spesialis dalam teknologi percetakan digital dan security printing. Hendra terus mengembangkan solusi teknologi baru untuk meningkatkan kualitas dan keamanan produk cetak.',
      avatar: '/images/team/cto.jpg',
      color: '#4caf50',
      social: {
        linkedin: 'https://linkedin.com/in/hendrawijaya',
        email: 'hendra.wijaya@spkn.co.id'
      },
      expertise: ['Teknologi Digital', 'Security Printing', 'Inovasi Produk']
    },
    {
      name: "Dewi Lestari",
      position: "Manajer Layanan Pelanggan",
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
    }
  ];

  return (
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
          {team.map((member, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Grow in={isVisible} timeout={1000 + index * 200}>
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
                      {member.position}
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
  );
};

export default TeamSection; 