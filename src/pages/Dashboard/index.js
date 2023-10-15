import React, { useEffect, useContext } from 'react';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';

import loggedInContext from '../../utils/loggedInContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isLoggedIn] = useContext(loggedInContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/register');
    }
  });

  return (
    <div>
      <SearchBarWrapper />
    </div>
  );
};

export default Dashboard;
