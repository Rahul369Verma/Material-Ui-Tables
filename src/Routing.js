import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeTable } from './components/employee/EmployeeTable';
import { Managers } from './components/Managers/Managers';
import { Navbar } from "./components/navbar/Navbar";
import { TableComponent } from './components/table/Table';


export const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<TableComponent />} />
        <Route path='/employee/:id' element={<EmployeeTable />} />
        <Route path='/managers' element={<Managers />} />

      </Routes>
    </BrowserRouter >
  );
}
