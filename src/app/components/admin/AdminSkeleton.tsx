import { Box, Skeleton, Grid, Card, CardContent, Paper } from '@mui/material';

interface AdminSkeletonProps {
  type?: 'dashboard' | 'table' | 'form' | 'detail';
}

export default function AdminSkeleton({ type = 'dashboard' }: AdminSkeletonProps) {
  if (type === 'table') {
    return (
      <Box sx={{ width: '100%', mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 1 }} />
        {Array.from(new Array(8)).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={50} sx={{ mb: 1 }} />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Skeleton variant="rectangular" width={300} height={40} />
        </Box>
      </Box>
    );
  }

  if (type === 'form') {
    return (
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Skeleton variant="rectangular" width="60%" height={40} sx={{ mb: 4 }} />
          {Array.from(new Array(6)).map((_, index) => (
            <Skeleton key={index} variant="rectangular" width="100%" height={60} sx={{ mb: 2 }} />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (type === 'detail') {
    return (
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Skeleton variant="rectangular" width="70%" height={40} sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" width="60%" height={40} sx={{ mt: 2 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  // Default: dashboard
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" width="50%" height={40} sx={{ mb: 4 }} />
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Array.from(new Array(4)).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={120} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Grid>
      </Grid>
    </Box>
  );
} 