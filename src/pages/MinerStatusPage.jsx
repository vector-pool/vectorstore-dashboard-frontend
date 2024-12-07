import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Box, Paper, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';

const samplePools = [
  {
    hotkey: "12345",
    validator: 2,
    operation: "ETH",
    s_f: "UID67890",
    score: "ColdKey456",
    timestamp: "HotKey456",
  },
  {
    hotkey: "12345",
    validator: 2,
    operation: "ETH",
    s_f: "UID67890",
    score: "ColdKey456",
    timestamp: "HotKey456",
  },
  {
    hotkey: "12345",
    validator: 2,
    operation: "ETH",
    s_f: "UID67890",
    score: "ColdKey456",
    timestamp: "HotKey456",
  },
];

const HOTKEY="12345456345"

const MinerStatusPage = () => {
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
    
    const response = await axios.get(`http://localhost:8000/api/miner_status/${hotkey}`);
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
            label="Filter by validator"
            variant="outlined"
            fullWidth
            value={volumeThreshold}
            onChange={(e) => setVolumeThreshold(e.target.value, 10)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filter by (S/F)"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            label="Filter by CRUD type"
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
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold" align="center">
            HOTKEY: {HOTKEY}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">VALIDATOR</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">OPERATION</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">S/F</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">SCORE</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">TIMESTAMP</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pools.map((pool, index) => (
              <TableRow key={index}>
                <TableCell>{pool.validator}</TableCell>
                <TableCell>{pool.operation}</TableCell>
                <TableCell>{pool.s_f}</TableCell>
                <TableCell>{pool.score}</TableCell>
                <TableCell>{pool.timestamp}</TableCell>
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

export default MinerStatusPage;