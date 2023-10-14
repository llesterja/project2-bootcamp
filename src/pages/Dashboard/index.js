import React from 'react';
import Navbar from '../../components/Molecules/NavbarLoggedIn';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import '../../CSS/dashboard.css';
import ChipForm from '../../components/Organisms/dashBoardform';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <SearchBarWrapper />
      <ChipForm />
    </div>
  );
};

export default Dashboard;
