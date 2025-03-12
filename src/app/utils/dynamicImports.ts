import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

// Dynamically import components with code splitting
export const DynamicHeader = dynamic(() => import('../../components/Header'), {
  loading: () => <Box sx={{ height: { xs: 64, md: 80 } }} />,
  ssr: true
});

export const DynamicFooter = dynamic(() => import('../../components/Footer'), {
  loading: () => <Box sx={{ height: 200 }} />,
  ssr: true
});

export const DynamicLoadingScreen = dynamic(() => import('../../components/LoadingScreen'), {
  ssr: false
});

// Illustrations
export const DynamicHeroIllustration = dynamic(
  () => import('../components/illustrations/HeroIllustration'),
  { ssr: true }
);

export const DynamicProductIllustration = dynamic(
  () => import('../components/illustrations/ProductIllustration'),
  { ssr: true }
);

export const DynamicAboutIllustration = dynamic(
  () => import('../components/illustrations/AboutIllustration'),
  { ssr: true }
);

export const DynamicTeamIllustration = dynamic(
  () => import('../components/illustrations/TeamIllustration'),
  { ssr: true }
);

export const DynamicTimelineIllustration = dynamic(
  () => import('../components/illustrations/TimelineIllustration'),
  { ssr: true }
);

export const DynamicContactIllustration = dynamic(
  () => import('../components/illustrations/ContactIllustration'),
  { ssr: true }
);

// Admin components
export const DynamicAdminLayout = dynamic(
  () => import('../components/admin/AdminLayout'),
  { ssr: false }
);

export const DynamicAdminPageWrapper = dynamic(
  () => import('../components/admin/AdminPageWrapper'),
  { ssr: false }
);