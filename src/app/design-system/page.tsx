'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Chip,
  Divider,
  Alert,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

interface ColorBoxProps {
  bgcolor: string;
  children?: React.ReactNode;
  theme?: Theme;
}

// Komponen untuk menampilkan warna
const ColorBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bgcolor' && prop !== 'theme',
})<ColorBoxProps>(({ theme, bgcolor }) => ({
  width: '100%',
  height: 80,
  backgroundColor: bgcolor,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.getContrastText(bgcolor),
  fontWeight: 'bold',
}));

// Komponen untuk menampilkan tipografi
const TypographyDemo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

interface SpacingBoxProps {
  size: number;
  theme?: Theme;
}

// Komponen untuk menampilkan spacing
const SpacingBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'theme',
})<SpacingBoxProps>(({ theme, size }) => ({
  width: size,
  height: 20,
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1),
  display: 'inline-block',
}));

export default function DesignSystemPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h1" gutterBottom>
        Sistem Desain
      </Typography>
      <Typography variant="body1" paragraph>
        Dokumentasi sistem desain untuk PT Sarana Pancakarya Nusa. Panduan ini berisi komponen-komponen UI, 
        palet warna, tipografi, dan elemen desain lainnya yang digunakan dalam aplikasi.
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="design system tabs">
          <Tab label="Warna" />
          <Tab label="Tipografi" />
          <Tab label="Komponen" />
          <Tab label="Spacing & Shadows" />
        </Tabs>
      </Box>

      {/* Tab Warna */}
      <Box hidden={tabValue !== 0}>
        <Typography variant="h2" gutterBottom>
          Palet Warna
        </Typography>
        <Typography variant="body1" paragraph>
          Warna-warna berikut digunakan secara konsisten di seluruh aplikasi untuk menciptakan identitas visual yang kuat.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Warna Utama
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#1976d2">Primary Main</ColorBox>
                <Typography variant="caption">#1976d2</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#42a5f5">Primary Light</ColorBox>
                <Typography variant="caption">#42a5f5</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#0d47a1">Primary Dark</ColorBox>
                <Typography variant="caption">#0d47a1</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#f50057">Secondary Main</ColorBox>
                <Typography variant="caption">#f50057</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Warna Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#4caf50">Success</ColorBox>
                <Typography variant="caption">#4caf50</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#f44336">Error</ColorBox>
                <Typography variant="caption">#f44336</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#ff9800">Warning</ColorBox>
                <Typography variant="caption">#ff9800</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ColorBox bgcolor="#2196f3">Info</ColorBox>
                <Typography variant="caption">#2196f3</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Warna Abu-abu
            </Typography>
            <Grid container spacing={2}>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((value) => (
                <Grid item xs={6} sm={4} md={2.4} key={value}>
                  <ColorBox bgcolor={`#${getGreyColor(value)}`}>Grey {value}</ColorBox>
                  <Typography variant="caption">#{getGreyColor(value)}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Tab Tipografi */}
      <Box hidden={tabValue !== 1}>
        <Typography variant="h2" gutterBottom>
          Tipografi
        </Typography>
        <Typography variant="body1" paragraph>
          Sistem tipografi yang konsisten membantu menciptakan hierarki dan kejelasan dalam konten.
        </Typography>

        <TypographyDemo>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="caption">2.5rem • 700 weight • 1.2 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="caption">2rem • 700 weight • 1.2 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="caption">1.75rem • 600 weight • 1.2 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="caption">1.5rem • 600 weight • 1.2 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="caption">1.25rem • 600 weight • 1.2 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="caption">1.125rem • 600 weight • 1.2 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="subtitle1">Subtitle 1</Typography>
          <Typography variant="caption">1rem • 500 weight • 1.5 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="subtitle2">Subtitle 2</Typography>
          <Typography variant="caption">0.875rem • 500 weight • 1.5 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="body1">
            Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
          </Typography>
          <Typography variant="caption">1rem • 400 weight • 1.5 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="body2">
            Body 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
          </Typography>
          <Typography variant="caption">0.875rem • 400 weight • 1.5 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="button">BUTTON TEXT</Typography>
          <Typography variant="caption">0.875rem • 500 weight • 1.75 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="caption">Caption Text</Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>0.75rem • 400 weight • 1.66 line height</Typography>
        </TypographyDemo>

        <TypographyDemo>
          <Typography variant="overline">OVERLINE TEXT</Typography>
          <Typography variant="caption">0.75rem • 500 weight • 2.66 line height • uppercase</Typography>
        </TypographyDemo>
      </Box>

      {/* Tab Komponen */}
      <Box hidden={tabValue !== 2}>
        <Typography variant="h2" gutterBottom>
          Komponen
        </Typography>
        <Typography variant="body1" paragraph>
          Komponen-komponen UI yang digunakan dalam aplikasi.
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Tombol
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ '& > button': { m: 1 } }}>
                <Button variant="contained" color="primary">Primary</Button>
                <Button variant="contained" color="secondary">Secondary</Button>
                <Button variant="outlined" color="primary">Outlined</Button>
                <Button variant="text" color="primary">Text</Button>
                <Button variant="contained" color="primary" size="large">Large</Button>
                <Button variant="contained" color="primary" size="small">Small</Button>
                <Button variant="contained" disabled>Disabled</Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Input
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ '& > *': { mb: 2, width: '100%' } }}>
                <TextField label="Standard" />
                <TextField label="Filled" variant="filled" />
                <TextField label="Outlined" variant="outlined" />
                <TextField label="With Helper Text" helperText="Helper text" />
                <TextField label="Error" error helperText="Error message" />
                <TextField label="Disabled" disabled />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Kartu
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Judul Kartu
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ini adalah contoh konten kartu. Kartu dapat digunakan untuk menampilkan informasi dalam format yang terstruktur.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Tindakan 1</Button>
                <Button size="small">Tindakan 2</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Chip
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ '& > *': { m: 0.5 } }}>
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Secondary" color="secondary" />
                <Chip label="Success" color="success" />
                <Chip label="Error" color="error" />
                <Chip label="Warning" color="warning" />
                <Chip label="Info" color="info" />
                <Chip label="Clickable" onClick={() => {}} />
                <Chip label="Deletable" onDelete={() => {}} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Alert
            </Typography>
            <Box sx={{ '& > *': { mb: 2 } }}>
              <Alert severity="success">Ini adalah alert success</Alert>
              <Alert severity="info">Ini adalah alert info</Alert>
              <Alert severity="warning">Ini adalah alert warning</Alert>
              <Alert severity="error">Ini adalah alert error</Alert>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Tabel
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nama</TableCell>
                    <TableCell align="right">Kalori</TableCell>
                    <TableCell align="right">Lemak&nbsp;(g)</TableCell>
                    <TableCell align="right">Karbohidrat&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
                    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
                    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              Dialog
            </Typography>
            <Button variant="outlined" onClick={handleDialogOpen}>
              Buka Dialog
            </Button>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle>Judul Dialog</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Ini adalah contoh dialog yang dapat digunakan untuk menampilkan informasi penting atau meminta konfirmasi dari pengguna.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Batal</Button>
                <Button onClick={handleDialogClose} variant="contained">Konfirmasi</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>

      {/* Tab Spacing & Shadows */}
      <Box hidden={tabValue !== 3}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Spacing
            </Typography>
            <Typography variant="body1" paragraph>
              Sistem spacing yang konsisten membantu menciptakan tata letak yang harmonis.
              Basis spacing adalah 8px, dengan kelipatan yang digunakan di seluruh aplikasi.
            </Typography>

            <Paper sx={{ p: 3 }}>
              {[1, 2, 3, 4, 6, 8, 12].map((size) => (
                <Box key={size} sx={{ mb: 2 }}>
                  <SpacingBox size={size * 8} />
                  <Typography variant="caption" sx={{ verticalAlign: 'middle' }}>
                    {size} ({size * 8}px)
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              Border Radius
            </Typography>
            <Typography variant="body1" paragraph>
              Border radius yang konsisten digunakan untuk elemen-elemen UI.
            </Typography>

            <Paper sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {[
                  { name: 'Small', value: 4 },
                  { name: 'Medium', value: 8 },
                  { name: 'Large', value: 12 },
                  { name: 'Extra Large', value: 16 },
                ].map((radius) => (
                  <Grid item xs={6} key={radius.name}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        bgcolor: 'primary.main',
                        borderRadius: radius.value,
                        mb: 1,
                      }}
                    />
                    <Typography variant="body2">{radius.name}</Typography>
                    <Typography variant="caption">{radius.value}px</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2" gutterBottom>
              Shadows
            </Typography>
            <Typography variant="body1" paragraph>
              Shadows memberikan kedalaman dan hierarki pada elemen-elemen UI.
            </Typography>

            <Grid container spacing={3}>
              {[0, 1, 2, 4, 8, 16, 24].map((elevation) => (
                <Grid item xs={6} sm={4} md={3} key={elevation}>
                  <Tooltip title={`elevation=${elevation}`} arrow>
                    <Paper
                      elevation={elevation}
                      sx={{
                        p: 3,
                        height: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography>Elevation {elevation}</Typography>
                    </Paper>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// Helper function untuk mendapatkan warna abu-abu
function getGreyColor(value: number): string {
  const greyColors: Record<number, string> = {
    50: 'fafafa',
    100: 'f5f5f5',
    200: 'eeeeee',
    300: 'e0e0e0',
    400: 'bdbdbd',
    500: '9e9e9e',
    600: '757575',
    700: '616161',
    800: '424242',
    900: '212121',
  };
  return greyColors[value] || '9e9e9e';
} 