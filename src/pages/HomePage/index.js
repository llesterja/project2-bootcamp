import React, { useState } from 'react';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import NavbarLogggedIn from '../../components/Molecules/NavbarLoggedIn';
import NavbarLoggedOut from '../../components/Molecules/NavbarLoggedOut';
import '../../CSS/home.css';

const HomePage = () => {
  const [loggedOut, setLoggedOut] = useState(true);
  return (
    <div>
      {loggedOut ? <NavbarLoggedOut /> : <NavbarLogggedIn />}
      <div className="banner-image"></div>
      <div className="search-container">
        <SearchBarWrapper />
      </div>
    </div>
  );
};

export default HomePage;
