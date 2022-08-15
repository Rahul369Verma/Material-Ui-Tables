import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { TablePagination } from '@mui/material';

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const { all } = props;
  const [open, setOpen] = useState(false);
  const [allEmployee, setAllEmployee] = useState([])

  useEffect(() => {
    const temp = []
    all.forEach((item, index) => {
      if (item.manager_id === row.id) {
        temp.push(item)
      }
    })
    setAllEmployee(temp)
  }, [all, row])

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >
          {row.id}
        </TableCell>
        <TableCell >{row.first_name}</TableCell>
        <TableCell >{row.last_name}</TableCell>
        <TableCell >{row.date_of_joining}</TableCell>
        <TableCell >{row.salary}</TableCell>
        <TableCell >{row.designation}</TableCell>
        <TableCell >{row.date_of_birth}</TableCell>
        <TableCell >{row.address}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="w-100 p-0 m-0" colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Employee List of {row.first_name} {row.last_name}
              </Typography>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell >ID</TableCell>
                    <TableCell>First name</TableCell>
                    <TableCell >Last name</TableCell>
                    <TableCell >Date Of Joining</TableCell>
                    <TableCell >Salary</TableCell>
                    <TableCell >Designation</TableCell>
                    <TableCell >Date Of Birth</TableCell>
                    <TableCell >Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allEmployee.map((item, index) => (
                    <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell >{item.id}</TableCell>
                      <TableCell >{item.first_name}</TableCell>
                      <TableCell >{item.last_name}</TableCell>
                      <TableCell >{item.date_of_joining}</TableCell>
                      <TableCell >{item.salary}</TableCell>
                      <TableCell >{item.designation}</TableCell>
                      <TableCell >{item.date_of_birth}</TableCell>
                      <TableCell >{item.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export const Managers = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`)
        console.log(response.data)
        setData(response.data)
      } catch (err) {
        if (err?.response?.data?.message) {
          setError(err.response.data.message)
        }
      }
    }
    getUser()
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper className='mt-4' sx={{ width: '100%' }}>
      <TableContainer >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell >ID</TableCell>
              <TableCell>First name</TableCell>
              <TableCell >Last name</TableCell>
              <TableCell >Date Of Joining</TableCell>
              <TableCell >Salary</TableCell>
              <TableCell >Designation</TableCell>
              <TableCell >Date Of Birth</TableCell>
              <TableCell >Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.id} row={row} all={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
