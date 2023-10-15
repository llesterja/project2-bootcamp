import React, { useContext, useEffect } from 'react';
import ChipForm from '../../components/Organisms/dashBoardform';
import loggedInContext from '../../utils/loggedInContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isLoggedIn] = useContext(loggedInContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/register');
    }
  });

  return (
    <div>
      <h1>Profile Page</h1>

      <ChipForm />
    </div>
  );
};

export default Profile;
