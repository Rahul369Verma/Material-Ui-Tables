import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='bg-warning'>
      <div className='d-flex'>
        <Link to="/" style={{ textDecoration: 'none', color: "black" }}><p className='fs-4 mx-4 p-2'>Rahul Verma</p></Link>
        <Link to="managers" className='my-auto' ><button className='btn btn-success' >Managers</button></Link>
      </div>
    </div>
  );
};
