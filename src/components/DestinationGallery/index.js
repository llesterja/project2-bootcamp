import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from '../DestinationCard/DestinationCard';
import getAmadeusToken from '../../api/UseAmadeus';
import { Grid } from '@mui/material';

const DestinationGallery = () => {
  const [cityObject, setCityObject] = useState(null);

  const surpriseSearch = async () => {
    const tokenData = await getAmadeusToken();
    const origin = 'SIN';
    try {
      const amadeusFlightSurprise = await axios.get(
        ` https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
      setCityObject(amadeusFlightSurprise.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    surpriseSearch();
  }, []);

  return (
    <div>
      {' '}
      Exploring your backyard...
      <Grid container spacing={0}>
        {cityObject
          ? cityObject.data.map((city, index) => {
              return (
                <DestinationCard
                  key={index}
                  cityObject={city}
                  currency={cityObject.meta.currency}
                />
              );
            })
          : 'Loading'}
      </Grid>
    </div>
  );
};

export default DestinationGallery;
