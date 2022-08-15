import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export const TableComponent = ({ user }) => {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  let navigate = useNavigate();
  const columns = [
    {
      field: 'id', headerName: 'ID',
      flex: 1
    },
    {
      field: 'first_name',
      headerName: 'First name',
      flex: 1
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      flex: 1
    },
    {
      field: 'date_of_joining', headerName: 'Date Of Joining',
      flex: 1
    },
    {
      field: 'salary', headerName: 'Salary',
      flex: 1
    },
    {
      field: 'designation', headerName: 'Designation',
      flex: 1
    },

    {
      field: 'date_of_birth',
      headerName: 'Date Of Birth',
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1

    },
  ];


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

  const handleClick = (e) => {
    console.log(e)
    if (e.field === "id") {
      navigate(`/employee/${e.value}`, { state: e.row })
    }
  }


  return (
    <div className='mt-4 d-flex' >
      <div className='w-100'>
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={15}
          // rowsPerPageOptions={[20]}
          checkboxSelection
          style={{ cursor: "pointer" }}
          // onRowClick={handleClick}
          onCellClick={handleClick}
        />
      </div>
    </div>
  );
};


