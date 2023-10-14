import React, { useContext } from 'react';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import '../../CSS/home.css';

const HomePage = () => {
  return (
    <div>
      <div className="banner-image"></div>
      <div className="search-container">
        <SearchBarWrapper />
      </div>
    </div>
  );
};

export default HomePage;
