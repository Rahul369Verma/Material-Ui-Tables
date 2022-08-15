import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation } from 'react-router-dom';
import axios from 'axios';




export const EmployeeTable = () => {
  const location = useLocation()
  console.log(location.state)
  const temp = location.state
  const [data, setData] = useState({})
  const [error, setError] = useState(null)



  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/${temp?.first_name}`)
        console.log(response.data)
        setData(response.data[0])
      } catch (err) {
        if (err?.response?.data?.message) {
          setError(err.response.data.message)
        }
      }
    }
    if (temp.details) {
      getData()
    } else {
      setData(temp)
    }
  }, [temp])


  return (
    <div className="px-5">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Fields</b></TableCell>
              <TableCell><b>Values</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                First Name
              </TableCell>
              <TableCell >{data.first_name}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Last Name
              </TableCell>
              <TableCell >{data.last_name}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Date Of Joining
              </TableCell>
              <TableCell >{data.date_of_joining}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Salary
              </TableCell>
              <TableCell >{data.salary}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Designation
              </TableCell>
              <TableCell >{data.designation}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Date Of Birth
              </TableCell>
              <TableCell >{data.date_of_birth}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Address
              </TableCell>
              <TableCell >{data.address}</TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}