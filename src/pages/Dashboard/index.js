import React, { useEffect, useContext } from 'react';
import SearchBarWrapper from '../../components/Organisms/SearchBarWrapper';
import loggedInContext from '../../utils/loggedInContext';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../../utils/useCurrentUser';
import { getProfilePictureURL } from '../../api/manageUserData';

const Dashboard = () => {
  const [isLoggedIn, , profileImageURL, setProfileImageURL] =
    useContext(loggedInContext);

  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/register');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProfilePictureURL = async () => {
      if (currentUser) {
        try {
          const url = await getProfilePictureURL(currentUser.uid);
          setProfileImageURL(url);
        } catch (error) {
          console.error('Error fetching profile picture URL:', error);
        }
      }
    };

    fetchProfilePictureURL();
  }, [currentUser, setProfileImageURL]);

  return (
    <div>
      <SearchBarWrapper />
    </div>
  );
};

export default Dashboard;
