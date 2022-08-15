import React from 'react';
import './App.css';
import { Navbar } from './components/navbar/Navbar';
import { Search } from './components/search/Search';
import { Table, TableComponent } from './components/table/Table';
import { useState } from 'react';
import { Routing } from './Routing';

const App = () => {

  const [user, setUser] = useState("")

  const submitUser = (value) => {
    setUser(value)
  }

  return (
    <div className=''>
      {/* <Navbar />
      <Search submitUser={submitUser} />
      <TableComponent user={user} /> */}
      <Routing />
    </div>
  )
}

export default App;
