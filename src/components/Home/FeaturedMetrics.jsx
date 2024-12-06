import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

const FeaturedMetrics = () => {
  return (
    <Paper sx={{ padding: '20px', marginBottom: '40px' }}>
      <Typography variant="h5" gutterBottom>
        Top miner
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="h6">Total storage (24h)</Typography>
            <Typography variant="body1">325GB</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="h6">Current Incentive</Typography>
            <Typography variant="body1">0.08</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="h6">Daily Rewards</Typography>
            <Typography variant="body1">3.5 Tao</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="h6">Average Reward Score</Typography>
            <Typography variant="body1">0.87</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FeaturedMetrics;