'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import usePageLoading from '../hooks/usePageLoading';
import LoadingScreen from '../components/LoadingScreen';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import StructuredData from './components/StructuredData';
import dynamic from 'next/dynamic';

// Dynamically import components to improve initial load time
const DynamicHeader = dynamic(() => import('../components/Header'), { ssr: false });
const DynamicFooter = dynamic(() => import('../components/Footer'), { ssr: false });
const DynamicPreload = dynamic(() => import('./components/Preload'), { ssr: false });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isPageLoading } = usePageLoading();
  const theme = getTheme('light'); // Selalu gunakan light mode untuk halaman publik

  // Cek apakah path saat ini adalah admin, maintenance, atau auth pages
  const isAdminPath = pathname?.startsWith('/admin');
  const isMaintenancePath = pathname === '/maintenance';
  const isAuthPath = ['/login', '/register'].includes(pathname || '');
  const shouldHideLayout = isAdminPath || isMaintenancePath || isAuthPath;

  const hideHeaderFooter = [
    '/maintenance',
    '/admin',
    '/login',
    '/register',
    '/404',
    '/error'
  ].some(path => pathname?.startsWith(path));

  // Jika loading, tampilkan loading screen
  if (isPageLoading) {
    return <LoadingScreen />;
  }

  // Add structured data for organization
  const isHomePage = pathname === '/';

  // Jika path adalah admin, maintenance, atau auth, tampilkan children tanpa header dan footer
  if (shouldHideLayout) {
    return children;
  }

  // Bungkus konten dengan ThemeProvider untuk light mode
  const content = (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(/images/bg-pattern.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px',
        bgcolor: 'background.default',
      }}
    >
      {/* Add Preload component */}
      <DynamicPreload />
      {!hideHeaderFooter && <DynamicHeader />}
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      {!hideHeaderFooter && <DynamicFooter />}
      {isHomePage && <StructuredData type="organization" />}
    </Box>
  );

  // Jika bukan halaman admin, gunakan light mode
  if (!isAdminPath) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {content}
      </ThemeProvider>
    );
  }

  return content;
}