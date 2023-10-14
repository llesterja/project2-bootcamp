import React from 'react';
import Navbar from '../../components/Molecules/Navbar';
import SearchBar from '../../components/Molecules/SearchBarMUI';
import styles from '../../CSS/SearchBar.css';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <SearchBar className={styles.searchbar} />
    </>
  );
};

export default Dashboard;
