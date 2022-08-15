import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
// import { Card } from 'antd';
// import { ForkOutlined, StarOutlined } from '@ant-design/icons';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export const TableComponent = ({ user }) => {

  // const { Meta } = Card;
  const [data, setData] = useState([])
  // const [userRepos, setUserRepos] = useState(null)
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
      // type: 'number',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1
      // description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      // valueGetter: (params) =>
      // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];


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


// {(userData && userRepos) &&
//   <>
//     <div style={{ width: "30%", marginLeft: '1.5%' }}>
//       <Card
//         hoverable
//         cover={<img style={{ height: "60vh", width: "100%" }} alt="avatar" src={userData?.avatar_url} />}
//       >
//         <Meta title={userData?.name} description={userData?.login} />
//         <p className='mt-1'>{userData.bio}</p>
//       </Card>
//     </div>
//     <div style={{ marginLeft: "2rem", width: "65%" }}>
//       <h2>Repositories</h2>
//       {userRepos.map((repo, i) => {
//         return (
//           <Card key={i} title={repo?.name} style={{ width: "100%", marginBottom: "1rem" }}>
//             <p>{repo?.description}</p>
//             <p><ForkOutlined /> {repo?.forks}</p>
//             <p><StarOutlined /> {repo?.watchers}</p>
//           </Card>
//         )
//       })}
//     </div>
//   </>
// }