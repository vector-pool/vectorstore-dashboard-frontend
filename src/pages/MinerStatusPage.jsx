// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Box, Paper, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';

// const samplePools = [
//   {
//     hotkey: "5DD26kC4CNirXXyN6bMvGxbxVpwbCVuBGxkTKVE7kGzRLDGD", // SS58 format address
//     validator: "5FWP7QS6dfgZE7AxkDJ5FUVDtNxKFpwvnKwxAQAhxN7kJ1Tz", // validator address
//     operation: "Create", // common bittensor operation type
//     s_f: "success", // success/failure indicator
//     score: 1.0, // typical score between 0-1
//     timestamp: "2024-12-17T14:03:45.123Z", // ISO timestamp
//     request_cycle_score: 0.83 // optional cycle score
//   },
//   {
//     hotkey: "5CJaTPgn5UYUDzfxc6v6k4xW3Pc9MvqktP7u9PKxE3qCE6qN",
//     validator: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
//     operation: "Update",
//     s_f: "failure",
//     score: 0,
//     timestamp: "2024-12-17T14:02:30.456Z",
//     request_cycle_score: 0.623
//   },
//   {
//     hotkey: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
//     validator: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
//     operation: "Read",
//     s_f: "success",
//     score: 0.87,
//     timestamp: "2024-12-17T14:01:15.789Z",
//     request_cycle_score: 0.713
//   }
// ];


// const HOTKEY = "12345456345"

// const MinerStatusPage = () => {
//   const navigate = useNavigate();
//   const [pools, setPools] = useState(samplePools);
//   const [filtersf, filterSF] = useState('');
//   const [feeTier, setFeeTier] = useState("All");
//   const [filtercrud, filterCRUD] = useState('');
//   const [filtervalidator, filterValidator] = useState('');
//   const [sortField, setSortField] = useState("None");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPools, setTotalPools] = useState(0);

//   useEffect(() => {
//     fetchPools(page, rowsPerPage);
//   }, [page, rowsPerPage, filterCodekey, filterCRUD, filterSF, volumeThreshold, sortField]);



//   const fetchPools = async (page, rowsPerPage) => {

//     const response = await axios.get(`http://localhost:8000/api/miner_status/${HOTKEY}`);
//     const data = response.data;
//     setPools(data.pools);
//     setTotalPools(data.total);

//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ margin: '60px', padding: '20px', marginBottom: '40px', minHeight: '100vh' }}>
//       <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Filter by validator"
//             variant="outlined"
//             fullWidth
//             value={volumeThreshold}
//             onChange={(e) => filterValidator(e.target.value, 10)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Filter by S/F"
//             variant="outlined"
//             fullWidth
//             value={search}
//             onChange={(e) => filterSF(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={2}>
//           <TextField
//             label="Filter by CRUD type"
//             variant="outlined"
//             fullWidth
//             value={liquidityThreshold}
//             onChange={(e) => filterCRUD(e.target.value, 10)}
//           />
//         </Grid>
//       </Grid>
//       <TableContainer component={Paper}>
//         <Box p={2}>
//           <Typography variant="h6" fontWeight="bold" align="center">
//             UID: 130, HOTKEY: 5FxcZraZACr4L78jWkcYe3FHdiwiAUzrKLVtsSwkvFobBKqq
//           </Typography>
//         </Box>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><Typography fontWeight="bold">VALIDATOR</Typography></TableCell>
//               <TableCell><Typography fontWeight="bold">OPERATION</Typography></TableCell>
//               <TableCell><Typography fontWeight="bold">S/F</Typography></TableCell>
//               <TableCell><Typography fontWeight="bold">SCORE</Typography></TableCell>
//               <TableCell><Typography fontWeight="bold">TIMESTAMP</Typography></TableCell>
//               <TableCell><Typography fontWeight="bold">Request_cycle_score</Typography></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {pools.map((pool, index) => (
//               <TableRow key={index}>
//                 <TableCell>{pool.validator}</TableCell>
//                 <TableCell>{pool.operation}</TableCell>
//                 <TableCell>{pool.s_f}</TableCell>
//                 <TableCell>{pool.score}</TableCell>
//                 <TableCell>{pool.timestamp}</TableCell>
//                 <TableCell>{pool.request_cycle_score}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={totalPools}
//         page={page}
//         onPageChange={handlePageChange}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleRowsPerPageChange}
//       />
//     </Paper>
//   );
// };

// export default MinerStatusPage;


// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableSortLabel,
// } from '@mui/material';

// const MinerStatusPage = () => {
//   const [pools, setPools] = useState([]);
//   const [filterSF, setFilterSF] = useState('');
//   const [filterCRUD, setFilterCRUD] = useState('');
//   const [filterValidator, setFilterValidator] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [sortField, setSortField] = useState(null);
//   const [sortDirection, setSortDirection] = useState('asc');

//   // Filter and sort data
//   useEffect(() => {
//     applyFiltersAndSorting();
//   }, [filterSF, filterCRUD, filterValidator, sortField, sortDirection]);


//   const fetchPools = async () => {
//     const response = await axios.get(
//       `http://34.162.26.42:8091/v1/data_handler?page=${page + 1}&page_limit=${rowsPerPage}&filterValidator=${filterValidator}&filterSF=${filterSF}&filterCRUD=${filterCRUD}`
//     );
//     const data = response.data;
//     console.log("Response data------------------------:", response.data); // Log the response data
//     setPools(data.pools);
//     setFilteredPools(data.pools); // Initialize filtered pools
//   };

//   const applyFiltersAndSorting = () => {
//     let filteredPools = samplePools.filter((pool) => {
//       return (
//         (!filterSF || pool.s_f.toLowerCase().includes(filterSF.toLowerCase())) &&
//         (!filterCRUD || pool.operation.toLowerCase().includes(filterCRUD.toLowerCase())) &&
//         (!filterValidator || pool.validator.toLowerCase().includes(filterValidator.toLowerCase()))
//       );
//     });

//     if (sortField) {
//       filteredPools = filteredPools.sort((a, b) => {
//         const aValue = a[sortField];
//         const bValue = b[sortField];
//         if (sortDirection === 'asc') {
//           return aValue > bValue ? 1 : -1;
//         } else {
//           return aValue < bValue ? 1 : -1;
//         }
//       });
//     }

//     setPools(filteredPools.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSort = (field) => {
//     const isAsc = sortField === field && sortDirection === 'asc';
//     setSortDirection(isAsc ? 'desc' : 'asc');
//     setSortField(field);
//   };

//   return (
//     <Paper sx={{ margin: '60px', padding: '20px', marginBottom: '40px', minHeight: '100vh' }}>
//       <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Filter by Validator"
//             variant="outlined"
//             fullWidth
//             value={filterValidator}
//             onChange={(e) => setFilterValidator(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Filter by S/F"
//             variant="outlined"
//             fullWidth
//             value={filterSF}
//             onChange={(e) => setFilterSF(e.target.value)}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <TextField
//             label="Filter by CRUD Type"
//             variant="outlined"
//             fullWidth
//             value={filterCRUD}
//             onChange={(e) => setFilterCRUD(e.target.value)}
//           />
//         </Grid>
//       </Grid>
//       <TableContainer component={Paper}>
//         <Box p={2}>
//           <Typography variant="h6" fontWeight="bold" align="center">
//             UID: 130, HOTKEY: 5FxcZraZACr4L78jWkcYe3FHdiwiAUzrKLVtsSwkvFobBKqq
//           </Typography>
//         </Box>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortField === 'validator'}
//                   direction={sortDirection}
//                   onClick={() => handleSort('validator')}
//                 >
//                   <Typography fontWeight="bold">VALIDATOR</Typography>
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortField === 'operation'}
//                   direction={sortDirection}
//                   onClick={() => handleSort('operation')}
//                 >
//                   <Typography fontWeight="bold">OPERATION</Typography>
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortField === 's_f'}
//                   direction={sortDirection}
//                   onClick={() => handleSort('s_f')}
//                 >
//                   <Typography fontWeight="bold">S/F</Typography>
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortField === 'score'}
//                   direction={sortDirection}
//                   onClick={() => handleSort('score')}
//                 >
//                   <Typography fontWeight="bold">SCORE</Typography>
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortField === 'timestamp'}
//                   direction={sortDirection}
//                   onClick={() => handleSort('timestamp')}
//                 >
//                   <Typography fontWeight="bold">TIMESTAMP</Typography>
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={sortField === 'request_cycle_score'}
//                   direction={sortDirection}
//                   onClick={() => handleSort('request_cycle_score')}
//                 >
//                   <Typography fontWeight="bold">REQUEST CYCLE SCORE</Typography>
//                 </TableSortLabel>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {pools.map((pool, index) => (
//               <TableRow key={index}>
//                 <TableCell>{pool.validator}</TableCell>
//                 <TableCell>{pool.operation}</TableCell>
//                 <TableCell>{pool.s_f}</TableCell>
//                 <TableCell>{pool.score}</TableCell>
//                 <TableCell>{new Date(pool.timestamp).toLocaleString()}</TableCell>
//                 <TableCell>{pool.request_cycle_score}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={samplePools.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </TableContainer>
//     </Paper>
//   );
// };

// export default MinerStatusPage;


import React, { useState, useEffect } from 'react';
import {
  Box,
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
  TableSortLabel,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const MinerStatusPage = () => {
  const [pools, setPools] = useState([]);
  const [filterSF, setFilterSF] = useState('');
  const [filterCRUD, setFilterCRUD] = useState('');
  const [filterValidator, setFilterValidator] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPools, setTotalPools] = useState(0);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [loading, setLoading] = useState(false);

  const fetchPools = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://34.162.26.42:8091/v1/operations?page=${page + 1}&page_limit=${rowsPerPage}&filterValidator=${filterValidator}&filterSF=${filterSF}&filterCRUD=${filterCRUD}&sortField=${sortField || ''}&sortDirection=${sortDirection}`
      );
      const data = response.data;
      setPools(data.pools || []);
      setTotalPools(data.total || 0);
    } catch (error) {
      console.error('Error fetching pools:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever filters, pagination, or sorting changes
  useEffect(() => {
    fetchPools();
  }, [page, rowsPerPage, filterSF, filterCRUD, filterValidator, sortField, sortDirection]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  return (
    <Paper sx={{ margin: '60px', padding: '20px', marginBottom: '40px', minHeight: '100vh' }}>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filter by Validator"
            variant="outlined"
            fullWidth
            value={filterValidator}
            onChange={(e) => setFilterValidator(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filter by S/F"
            variant="outlined"
            fullWidth
            value={filterSF}
            onChange={(e) => setFilterSF(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Filter by CRUD Type"
            variant="outlined"
            fullWidth
            value={filterCRUD}
            onChange={(e) => setFilterCRUD(e.target.value)}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold" align="center">
            UID: 130, HOTKEY: 5FxcZraZACr4L78jWkcYe3FHdiwiAUzrKLVtsSwkvFobBKqq
          </Typography>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'validator'}
                    direction={sortDirection}
                    onClick={() => handleSort('validator')}
                  >
                    <Typography fontWeight="bold">VALIDATOR</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'operation'}
                    direction={sortDirection}
                    onClick={() => handleSort('operation')}
                  >
                    <Typography fontWeight="bold">OPERATION</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 's_f'}
                    direction={sortDirection}
                    onClick={() => handleSort('s_f')}
                  >
                    <Typography fontWeight="bold">S/F</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'score'}
                    direction={sortDirection}
                    onClick={() => handleSort('score')}
                  >
                    <Typography fontWeight="bold">SCORE</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'timestamp'}
                    direction={sortDirection}
                    onClick={() => handleSort('timestamp')}
                  >
                    <Typography fontWeight="bold">TIMESTAMP</Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === 'request_cycle_score'}
                    direction={sortDirection}
                    onClick={() => handleSort('request_cycle_score')}
                  >
                    <Typography fontWeight="bold">REQUEST CYCLE SCORE</Typography>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pools.map((pool, index) => (
                <TableRow key={index}>
                  <TableCell>{pool.validator}</TableCell>
                  <TableCell>{pool.operation}</TableCell>
                  <TableCell>{pool.s_f}</TableCell>
                  <TableCell>{pool.score}</TableCell>
                  <TableCell>{new Date(pool.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{pool.request_cycle_score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPools}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </Paper>
  );
};

export default MinerStatusPage;
