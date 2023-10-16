import React, { useContext, useEffect } from 'react';
import ChipForm from '../../components/Organisms/dashBoardform';
import loggedInContext from '../../utils/loggedInContext';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '../../utils/useCurrentUser';
import { getProfilePictureURL } from '../../api/manageUserData';
import '../../CSS/Dashboard.css';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn, profileImageURL, setProfileImageURL] =
    useContext(loggedInContext);

  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/register');
    }
  });

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
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile">
        <div class="image-container">
          <img src={profileImageURL} alt={`profile for ${currentUser?.uid}`} />
        </div>
        <ChipForm />
      </div>
    </div>
  );
};

export default Profile;
