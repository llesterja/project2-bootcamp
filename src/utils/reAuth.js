import { useEffect } from 'react';

export const useAuthCheck = (
  reAuth,
  setIsLoggedIn,
  setCurrentUser,
  navigate
) => {
  useEffect(() => {
    const checkIfLoggedIn = (authedUser) => {
      if (authedUser) {
        const { email } = authedUser;
        setCurrentUser(email);
        setIsLoggedIn(true);
        navigate('/profile');
      } else {
        return null;
      }
    };

    reAuth(checkIfLoggedIn);
  }, [reAuth, setIsLoggedIn, setCurrentUser, navigate]);
};
