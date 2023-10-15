import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

const useGetDestinations = (currentUser) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchDestinations = async () => {
        try {
          const db = getDatabase();
          const destinationRef = ref(
            db,
            `users/${currentUser.uid}/destinations`
          );
          const snapshot = await get(destinationRef);
          if (snapshot.exists()) {
            const destinations = snapshot.val();
            setDestinations(destinations);
          } else {
            setDestinations([]);
          }
        } catch (error) {
          console.error('Error fetching destinations:', error);
        }
      };

      fetchDestinations();
    }
  }, [currentUser]);

  return destinations;
};

export default useGetDestinations;
