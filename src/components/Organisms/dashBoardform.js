import React, { useState, useEffect } from 'react';
import { TextField, Button, Chip, Grid } from '@mui/material';
import useCurrentUser from '../../utils/useCurrentUser';
import { getDatabase, get, child, ref, set, onValue } from 'firebase/database';
import { storage } from '../../firebase';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import '../../CSS/Dashboard.css';
import MUIloadingAnimation from '../Atoms/MUIloadingAnimation';

const ChipForm = ({ setTempProfileImage }) => {
  const useGetDestinations = (currentUser) => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
      if (currentUser) {
        const db = getDatabase();
        const destinationRef = ref(db, `users/${currentUser.uid}/destinations`);

        const unsubscribe = onValue(destinationRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setDestinations(data);
          }
        });
        getHomeCountry();
        // Clean up the subscription
        return () => unsubscribe();
      }
    }, [currentUser]);

    return destinations;
  };

  const [inputValue, setInputValue] = useState('');
  const currentUser = useCurrentUser();
  const destinations = useGetDestinations(currentUser);
  const [homeCountry, setHomeCountry] = useState(null);

  if (!currentUser) {
    return <MUIloadingAnimation />; // or any other loading state
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (inputValue && destinations.length < 5) {
      try {
        const db = getDatabase();
        const destinationRef = ref(db, `users/${currentUser.uid}/destinations`);
        const updatedDestinations = [...destinations, inputValue];
        await set(destinationRef, updatedDestinations);
        setInputValue('');
      } catch (error) {
        console.error('Error adding destination:', error);
      }
    }
  };

  const handleChipDelete = async (chipToDelete) => {
    try {
      const updatedDestinations = destinations.filter(
        (chip) => chip !== chipToDelete
      );
      const db = getDatabase();
      const destinationRef = ref(db, `users/${currentUser.uid}/destinations`);
      await set(destinationRef, updatedDestinations);
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileUrl = e.target.result;
      setTempProfileImage(fileUrl);
    };
    reader.readAsDataURL(file);

    if (file) {
      try {
        const fileRef = storageRef(
          storage,
          `profilePictures/${currentUser.uid}`
        );
        await uploadBytes(fileRef, file);
        await getDownloadURL(fileRef, `profilePictures/${currentUser.uid}`);
        event.target.value = '';
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const saveDestinationsToDatabase = async () => {
    try {
      const db = getDatabase();
      const destinationRef = ref(db, `users/${currentUser.uid}/destinations`);
      await set(destinationRef, destinations);
      console.log('Destinations saved to the database.');
    } catch (error) {
      console.error('Error saving destinations:', error);
    }
  };

  const getHomeCountry = () => {
    const db = getDatabase();
    const homeCountryRef = ref(db, `users/${currentUser.uid}`);
    get(child(homeCountryRef, `homeCountry`))
      .then((data) => {
        if (data.exists()) {
          console.log(data.val());
          setHomeCountry(data.val());
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="chip-form">
      <Grid container spacing={2}>
        {homeCountry != null ? `I'm from ${homeCountry}!` : 'Loading'}
      </Grid>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              label="Enter text"
              value={inputValue}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              variant="contained"
              disabled={inputValue === '' || destinations.length >= 5}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <div>
          {destinations.map((destination) => (
            <Chip
              key={destination}
              label={destination}
              onDelete={() => handleChipDelete(destination)}
              style={{ margin: '0.5rem' }}
            />
          ))}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
        </div>
        <Button variant="contained" onClick={saveDestinationsToDatabase}>
          Save Destinations
        </Button>
      </form>
    </div>
  );
};

export default ChipForm;
