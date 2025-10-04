import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const HomePage = () : React.ReactElement => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomePage;