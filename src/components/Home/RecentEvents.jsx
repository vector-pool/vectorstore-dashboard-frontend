
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
    // Filter pools by search input
    fetchPools();
    const filtered = pools.filter((pool) => {
      return (
        pool.coldkey.toLowerCase().includes(searchColdkey.toLowerCase()) &&
        pool.hotkey.toLowerCase().includes(searchHotkey.toLowerCase()) &&
        pool.uid.toLowerCase().includes(searchUid.toLowerCase())
      );
    });
    setFilteredPools(filtered);
  }, [searchColdkey, searchHotkey, searchUid, pools]);


  const fetchPools = async () => {
    
    const response = await axios.get(`http://34.162.26.42:8091/v1/data_handler?page=${page + 1}&page_limit=${rowsPerPage}&searchColdKey=${searchColdkey}&searchHotkey=${searchHotkey}&searchUid=${searchUid}`);
    const data = response.data;
    setPools(data.pools);

  };

  const handleSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);

    // Sort the filtered pools
    const sortedPools = [...filteredPools].sort((a, b) => {
      if (property === "") return 0; // No sorting if no column selected
      if (order === "asc") {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return a[property] > b[property] ? -1 : 1;
      }
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
              <TableCell>
                <TableSortLabel
                  active={orderBy === "order"}
                  direction={orderBy === "order" ? order : "asc"}
                  onClick={() => handleSort("order")}
                >
                  <Typography fontWeight="bold">ORDER</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "uid"}
                  direction={orderBy === "uid" ? order : "asc"}
                  onClick={() => handleSort("uid")}
                >
                  <Typography fontWeight="bold">UID</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "coldkey"}
                  direction={orderBy === "coldkey" ? order : "asc"}
                  onClick={() => handleSort("coldkey")}
                >
                  <Typography fontWeight="bold">COLDKEY</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "hotkey"}
                  direction={orderBy === "hotkey" ? order : "asc"}
                  onClick={() => handleSort("hotkey")}
                >
                  <Typography fontWeight="bold">HOTKEY</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "incentive"}
                  direction={orderBy === "incentive" ? order : "asc"}
                  onClick={() => handleSort("incentive")}
                >
                  <Typography fontWeight="bold">INCENTIVE</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "trust"}
                  direction={orderBy === "trust" ? order : "asc"}
                  onClick={() => handleSort("incentive")}
                >
                  <Typography fontWeight="bold">TRUST</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "daily_reward"}
                  direction={orderBy === "daily_reward" ? order : "asc"}
                  onClick={() => handleSort("daily_reward")}
                >
                  <Typography fontWeight="bold">DAILY REWARD</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "passed_request_count"}
                  direction={orderBy === "passed_request_count" ? order : "asc"}
                  onClick={() => handleSort("passed_request_count")}
                >
                  <Typography fontWeight="bold">PASSED_REQUEST_COUNT</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "weight"}
                  direction={orderBy === "weight" ? order : "asc"}
                  onClick={() => handleSort("weight")}
                >
                  <Typography fontWeight="bold">WEIGHT</Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "total_storage_size"}
                  direction={orderBy === "total_storage_size" ? order : "asc"}
                  onClick={() => handleSort("total_storage_size")}
                >
                  <Typography fontWeight="bold">TOTAL_STORAGE_SIZE</Typography>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPools.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pool, index) => (
              <TableRow key={index}>
                <TableCell>{pool.order}</TableCell>
                <TableCell>{pool.miner_uid}</TableCell>
                <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pool.coldkey}</TableCell>
                <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pool.hotkey}</TableCell>
                <TableCell>{pool.incentive}</TableCell>
                <TableCell>{pool.trust}</TableCell>
                <TableCell>{pool.daily_rewards}</TableCell>
                <TableCell>{pool.passed_request_count}</TableCell>
                <TableCell>{pool.weight}</TableCell>
                <TableCell>{pool.total_storage_size}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => navigate(`/miner_status/${pool.hotkey}`)}>
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
