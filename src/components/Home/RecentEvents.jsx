import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const RecentEvents = () => {
  return (
    <Paper sx={{ padding: '20px', marginBottom: '40px' }}>
      <Typography variant="h5" gutterBottom>
        Miner's Performance
      </Typography>
      <div className="event-filters" sx={{ marginBottom: '10px' }}>
        <Button variant="outlined" sx={{ marginRight: '10px' }}>All</Button>
        <Button variant="outlined" sx={{ marginRight: '10px' }}>Swaps</Button>
        <Button variant="outlined" sx={{ marginRight: '10px' }}>Mints</Button>
        <Button variant="outlined">Burns</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">UID</TableCell>
              <TableCell align="center">ORDER</TableCell>
              <TableCell align="center">HOTKEY</TableCell>
              <TableCell align="center">INCENTIVE</TableCell>
              <TableCell align="center">DAILY REWARD(τ)</TableCell>
              <TableCell align="center">LIVE</TableCell>
              <TableCell align="center">DAILY REWARD(τ)</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">5</TableCell>
              <TableCell align="center">4</TableCell>
              <TableCell align="center" sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>
                5DfaHZnrQ4PuktbXm9zaeAwLCwbECXpcNn6i9bxJUACW7icD
              </TableCell>
              <TableCell align="center">0.65</TableCell>
              <TableCell align="center">3.2</TableCell>
              <TableCell align="center">2500</TableCell>
              <TableCell align="center">3.2</TableCell>
              <TableCell align="center">
                <Button variant="outlined" sx={{ marginRight: '10px' }}>show_details</Button>
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentEvents;