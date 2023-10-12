import React from 'react';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import Navbar from '../../components/Molecules/Navbar';
import '../../CSS/bannerImage.css';
import '../../CSS/home.css';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="banner-image"></div>
      <div className="search-container">
        <SearchBarWrapper />
      </div>
    </div>
  );
};

export default HomePage;
