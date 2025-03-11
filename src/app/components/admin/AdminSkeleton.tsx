'use client';

import { Box, Skeleton, Grid, Card, CardContent, Paper, Stack, useTheme, alpha, Divider, Container } from '@mui/material';

interface AdminSkeletonProps {
  type?: 'dashboard' | 'table' | 'form' | 'detail' | 'products' | 'users' | 'settings';
}

export default function AdminSkeleton({ type = 'dashboard' }: AdminSkeletonProps) {
  const theme = useTheme();
  
  if (type === 'table') {
    return (
      <Box sx={{ width: '100%', mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2, borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1, borderRadius: 1 }} />
        {Array.from(new Array(8)).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={50} sx={{ mb: 1, borderRadius: 1 }} />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Skeleton variant="rectangular" width={300} height={40} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    );
  }

  if (type === 'form') {
    return (
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: theme.shadows[2] }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton variant="rectangular" width="40%" height={32} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
          </Box>

          {/* Form Sections */}
          {Array.from(new Array(2)).map((_, sectionIndex) => (
            <Box key={sectionIndex} sx={{ mb: 4 }}>
              {/* Section Title */}
              <Skeleton variant="rectangular" width="30%" height={28} sx={{ mb: 2, borderRadius: 1 }} />
              <Divider sx={{ mb: 3 }} />
              
              {/* Form Fields */}
              <Grid container spacing={3}>
                {Array.from(new Array(3)).map((_, fieldIndex) => (
                  <Grid item xs={12} sm={6} key={fieldIndex}>
                    <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1 }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          {/* Form Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
            <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 2 }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (type === 'detail') {
    return (
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: theme.shadows[2] }}>
        <CardContent>
          <Skeleton variant="rectangular" width="70%" height={40} sx={{ mb: 3, borderRadius: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 2, borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="60%" height={40} sx={{ mt: 2, borderRadius: 1 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  if (type === 'dashboard') {
    return (
      <Container maxWidth="lg">
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Skeleton variant="text" width={300} height={45} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={250} height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={150} height={24} />
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Skeleton variant="rounded" width={150} height={40} />
            </Grid>
          </Grid>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rounded" height={160} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>

        {/* Data Completion */}
        <Skeleton variant="rounded" height={180} sx={{ mb: 4, borderRadius: 3 }} />

        {/* Main Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={6} sm={3} key={item}>
                <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }

  // Default: dashboard - disesuaikan dengan tampilan dashboard baru
  return (
    <Box sx={{ width: '100%', py: 4 }}>
      {/* Welcome Section */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" width="70%" height={40} sx={{ mb: 1, borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="40%" height={24} sx={{ borderRadius: 1 }} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Array.from(new Array(4)).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: theme.shadows[2],
            }}>
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Skeleton variant="rectangular" width="80%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width="60%" height={32} sx={{ mb: 1, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width="40%" height={16} sx={{ mb: 1, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width="30%" height={16} sx={{ mt: 2, borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Skeleton variant="circular" width={56} height={56} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Data Completion */}
      <Card sx={{ mb: 4, borderRadius: 3, boxShadow: theme.shadows[2] }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="rectangular" width="30%" height={24} sx={{ borderRadius: 1 }} />
            <Skeleton variant="rectangular" width="10%" height={24} sx={{ borderRadius: 1 }} />
          </Box>
          <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 5, mb: 2 }} />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <Skeleton variant="rectangular" width="80%" height={20} sx={{ borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Skeleton variant="rectangular" width="80%" height={20} sx={{ borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Skeleton variant="rectangular" width="80%" height={20} sx={{ borderRadius: 1 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Top Products */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: theme.shadows[2],
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="rectangular" width="40%" height={24} sx={{ borderRadius: 1 }} />
                <Skeleton variant="circular" width={32} height={32} />
              </Box>
              <Stack spacing={2}>
                {Array.from(new Array(5)).map((_, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton variant="rectangular" width="60%" height={20} sx={{ mb: 0.5, borderRadius: 1 }} />
                      <Skeleton variant="rectangular" width="40%" height={16} sx={{ borderRadius: 1 }} />
                    </Box>
                    <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Products */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%', 
            borderRadius: 3,
            boxShadow: theme.shadows[2],
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Skeleton variant="rectangular" width="40%" height={24} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
              </Box>
              <Stack spacing={2}>
                {Array.from(new Array(5)).map((_, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton variant="rectangular" width="60%" height={20} sx={{ mb: 0.5, borderRadius: 1 }} />
                      <Skeleton variant="rectangular" width="70%" height={16} sx={{ borderRadius: 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Skeleton variant="circular" width={24} height={24} />
                      <Skeleton variant="circular" width={24} height={24} />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" width="20%" height={24} sx={{ mb: 2, borderRadius: 1 }} />
        <Grid container spacing={2}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card sx={{ 
                p: 2, 
                height: 140,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
                boxShadow: theme.shadows[2],
              }}>
                <Skeleton variant="circular" width={56} height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" width="70%" height={20} sx={{ borderRadius: 1 }} />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
} 