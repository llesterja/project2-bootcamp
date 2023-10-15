import { useState, useEffect } from 'react';
import { auth } from '../firebase';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return currentUser;
};

export default useCurrentUser;
