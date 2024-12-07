import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

const MinerStatusPage = () => {
  const { hotkey } = useParams(); // Get the dynamic 'hotkey' from the URL
  const [minerData, setMinerData] = useState(null); // State to store miner data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch miner data when the component loads or when 'hotkey' changes
  useEffect(() => {
    const fetchMinerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/miner_status/${hotkey}`);
        setMinerData(response.data); // Set the fetched data
        setLoading(false); // Set loading to false
      } catch (err) {
        setError('Failed to fetch miner data'); // Handle errors
        setLoading(false);
      }
    };

    fetchMinerData();
  }, [hotkey]);

  // Render loading, error, or the miner data
  return (
    <Paper sx={{ padding: '20px', marginBottom: '40px' }}>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by coldkey"
            variant="outlined"
            fullWidth
            value={volumeThreshold}
            onChange={(e) => setVolumeThreshold(e.target.value, 10)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by hotkey"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Search by uid"
            variant="outlined"
            fullWidth
            value={liquidityThreshold}
            onChange={(e) => setLiquidityThreshold(e.target.value, 10)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Fee Tier</InputLabel>
            <Select
              value={feeTier}
              onChange={(e) => setFeeTier(e.target.value)}
              label="Fee Tier"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="3000">0.3%</MenuItem>
              <MenuItem value="500">0.05%</MenuItem>
              <MenuItem value="10000">1%</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="None">NONE</MenuItem>
              <MenuItem value="events">UID</MenuItem>
              <MenuItem value="liquidity">Intentive</MenuItem>
              <MenuItem value="volume">Live</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">ORDER</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">UID</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">COLDKEY</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">HOTKEY</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">INCENTIVE</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">DAILY REWARD</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">LIVE</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Average Score</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Total Storage</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Stability</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">DETAILS</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool, index) => (
              <TableRow key={index}>
                <TableCell>{pool.order} / {pool.token1_symbol}</TableCell>
                <TableCell>{pool.uid}</TableCell>
                <TableCell>{pool.coldkey}</TableCell>
                <TableCell>{pool.hotkey}</TableCell>
                <TableCell>{pool.incentive}</TableCell>
                <TableCell>{pool.daily_reward}</TableCell>
                <TableCell>{pool.live}</TableCell>
                <TableCell>{pool.average_score}</TableCell>
                <TableCell>{pool.total_storage}</TableCell>
                <TableCell>{pool.stability}</TableCell>
                <TableCell><Button onClick={()=> {navigate("/miner_status/"+pool.hotkey)}}>View Details</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={totalPools}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      /> */}
    </Paper>
  );
};

export default MinerStatusPage;