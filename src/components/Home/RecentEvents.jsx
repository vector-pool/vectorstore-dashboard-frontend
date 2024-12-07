import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';



const samplePools = [
  {
    order: 1,
    token1_symbol: "BTC",
    uid: "UID12345",
    coldkey: "ColdKey123",
    hotkey: "HotKey123",
    incentive: "5000",
    daily_reward: "50",
    live: "Yes",
    pool: "pool123",
  },
  {
    order: 2,
    token1_symbol: "ETH",
    uid: "UID67890",
    coldkey: "ColdKey456",
    hotkey: "HotKey456",
    incentive: "3000",
    daily_reward: "30",
    live: "No",
    pool: "pool456",
  },
  {
    order: 3,
    token1_symbol: "SOL",
    uid: "UID11223",
    coldkey: "ColdKey789",
    hotkey: "HotKey789",
    incentive: "7000",
    daily_reward: "70",
    live: "Yes",
    pool: "pool789",
  },
];


const RecentEvents = () => {
  const navigate = useNavigate();
  const [pools, setPools] = useState(samplePools);
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

export default RecentEvents;