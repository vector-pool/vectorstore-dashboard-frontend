// import React from 'react';
// import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

// const RecentEvents = () => {
//   return (
//     <Paper sx={{ padding: '20px', marginBottom: '40px' }}>
//       <Typography variant="h5" gutterBottom>
//         Miner's Performance
//       </Typography>
//       <div className="event-filters" sx={{ marginBottom: '10px' }}>
//         <Button variant="outlined" sx={{ marginRight: '10px' }}>All</Button>
//         <Button variant="outlined" sx={{ marginRight: '10px' }}>Swaps</Button>
//         <Button variant="outlined" sx={{ marginRight: '10px' }}>Mints</Button>
//         <Button variant="outlined">Burns</Button>
//       </div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">UID</TableCell>
//               <TableCell align="center">ORDER</TableCell>
//               <TableCell align="center">HOTKEY</TableCell>
//               <TableCell align="center">INCENTIVE</TableCell>
//               <TableCell align="center">DAILY REWARD(τ)</TableCell>
//               <TableCell align="center">LIVE</TableCell>
//               <TableCell align="center">DAILY REWARD(τ)</TableCell>
//               <TableCell align="center">Details</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell align="center">5</TableCell>
//               <TableCell align="center">4</TableCell>
//               <TableCell align="center" sx={{ wordWrap: 'break-word', maxWidth: '200px' }}>
//                 5DfaHZnrQ4PuktbXm9zaeAwLCwbECXpcNn6i9bxJUACW7icD
//               </TableCell>
//               <TableCell align="center">0.65</TableCell>
//               <TableCell align="center">3.2</TableCell>
//               <TableCell align="center">2500</TableCell>
//               <TableCell align="center">3.2</TableCell>
//               <TableCell align="center">
//                 <Button variant="outlined" sx={{ marginRight: '10px' }}>show_details</Button>
//               </TableCell>
//             </TableRow>
//             {/* Add more rows as needed */}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );

// };

// export default RecentEvents;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';

const RecentEvents = () => {
  const navigate = useNavigate();
  const [pools, setPools] = useState([]);
  const [search, setSearch] = useState('');
  const [feeTier, setFeeTier] = useState("All");
  const [liquidityThreshold, setLiquidityThreshold] = useState('');
  const [volumeThreshold, setVolumeThreshold] = useState('');
  const [sortField, setSortField] = useState("None");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPools, setTotalPools] = useState(0);

  useEffect(() => {
    fetchPools(page, rowsPerPage);
  }, [page, rowsPerPage, search, feeTier, liquidityThreshold, volumeThreshold, sortField]);

  

  const fetchPools = async (page, rowsPerPage) => {
    
    const response = await axios.get(`http://localhost:8000/api/pools?page=${page + 1}&page_limit=${rowsPerPage}&search=${search}&fee_tier=${feeTier}&liquidity_threshold=${liquidityThreshold}&volume_threshold=${volumeThreshold}&sort_field=${sortField}`);
    const data = response.data;
    setPools(data.pools);
    setTotalPools(data.total);

  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              <TableCell><Typography fontWeight="bold">DETAILS</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool, index) => (
              <TableRow key={index} onClick={() => navigate(`/analytics/${pool.pool}`)}>
                <TableCell>{pool.token0_symbol} / {pool.token1_symbol}</TableCell>
                <TableCell>{pool.fee}</TableCell>
                <TableCell>{pool.liquidity}</TableCell>
                <TableCell>{pool.volume_24h}</TableCell>
                <TableCell>{pool.events_count_24h}</TableCell>
                <TableCell>{pool.price_range_24h}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalPools}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default RecentEvents;