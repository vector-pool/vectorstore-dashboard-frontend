import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TableSortLabel,
} from '@mui/material';

const RecentEvents = () => {
  const navigate = useNavigate();

  const [pools, setPools] = useState([]);
  const [filteredPools, setFilteredPools] = useState([]); // For search functionality
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  // Sorting state
  const [order, setOrder] = useState("asc"); // 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState(""); // Column to sort by

  // Search filters
  const [searchColdkey, setSearchColdkey] = useState("");
  const [searchHotkey, setSearchHotkey] = useState("");
  const [searchUid, setSearchUid] = useState("");

  useEffect(() => {
    fetchPools();
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (!Array.isArray(pools)) return; // Ensure pools is an array
  
    const filtered = pools.filter((pool) => {
      return (
        (pool.coldkey || "").toLowerCase().includes(searchColdkey.toLowerCase()) &&
        (pool.hotkey || "").toLowerCase().includes(searchHotkey.toLowerCase()) &&
        (pool.uid || "").toString().includes(searchUid.toLowerCase())
      );
    });
    setFilteredPools(filtered);
  }, [searchColdkey, searchHotkey, searchUid, pools]);
  

  const fetchPools = async () => {
    const response = await axios.get(
      `http://34.162.26.42:8091/v1/data_handler?page=${page + 1}&page_limit=${rowsPerPage}&searchColdKey=${searchColdkey}&searchHotkey=${searchHotkey}&searchUid=${searchUid}`
    );
    const data = response.data;
    console.log("Response data------------------------:", response.data); // Log the response data
    setPools(data.pools);
    setFilteredPools(data.pools); // Initialize filtered pools
  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    const newOrder = isAscending ? "desc" : "asc";

    setOrder(newOrder);
    setOrderBy(property);

    // Sort the pools array
    const sortedPools = [...filteredPools].sort((a, b) => {
      let valueA = a[property];
      let valueB = b[property];

      // Handle numeric sorting
      if (typeof valueA === "number" && typeof valueB === "number") {
        return newOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Handle string sorting
      if (typeof valueA === "string" && typeof valueB === "string") {
        return newOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Fallback for other types
      return 0;
    });

    setFilteredPools(sortedPools);
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
      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Coldkey"
            variant="outlined"
            fullWidth
            value={searchColdkey}
            onChange={(e) => setSearchColdkey(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Hotkey"
            variant="outlined"
            fullWidth
            value={searchHotkey}
            onChange={(e) => setSearchHotkey(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by UID"
            variant="outlined"
            fullWidth
            value={searchUid}
            onChange={(e) => setSearchUid(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "order"}
                  direction={orderBy === "order" ? order : "asc"}
                  onClick={() => handleSort("order")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    ID
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "uid"}
                  direction={orderBy === "uid" ? order : "asc"}
                  onClick={() => handleSort("uid")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    UID
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "coldkey"}
                  direction={orderBy === "coldkey" ? order : "asc"}
                  onClick={() => handleSort("coldkey")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    COLDKEY
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "hotkey"}
                  direction={orderBy === "hotkey" ? order : "asc"}
                  onClick={() => handleSort("hotkey")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    HOTKEY
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "incentive"}
                  direction={orderBy === "incentive" ? order : "asc"}
                  onClick={() => handleSort("incentive")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    INCENTIVE
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "trust"}
                  direction={orderBy === "trust" ? order : "asc"}
                  onClick={() => handleSort("trust")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    TRUST
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "daily_reward"}
                  direction={orderBy === "daily_reward" ? order : "asc"}
                  onClick={() => handleSort("daily_reward")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    DAILY REWARD
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "passed_request_count"}
                  direction={orderBy === "passed_request_count" ? order : "asc"}
                  onClick={() => handleSort("passed_request_count")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    PASSED REQUEST COUNT
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "weight"}
                  direction={orderBy === "weight" ? order : "asc"}
                  onClick={() => handleSort("weight")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px',}}>
                    WEIGHT
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <TableSortLabel
                  active={orderBy === "total_storage_size"}
                  direction={orderBy === "total_storage_size" ? order : "asc"}
                  onClick={() => handleSort("total_storage_size")}
                >
                  <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '20px', fontSize: '13px'}}>
                    TOTAL STORAGE SIZE
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                <Typography fontWeight="" sx={{ textAlign: 'center', marginLeft: '', fontSize: '13px' }}>
                  ACTIONS
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPools
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pool, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.miner_uid}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {pool.coldkey}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      maxWidth: '150px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {pool.hotkey}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.incentive}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.trust}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.daily_rewards}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.passed_request_count}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.weight}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    {pool.total_storage_size}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/miner_status/${pool.hotkey}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        component="div"
        count={filteredPools.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default RecentEvents;
