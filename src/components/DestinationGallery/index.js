import React, {useState,useEffect} from 'react';
import axios from 'axios';
import DestinationCard from '../DestinationCard/DestinationCard';
import getAmadeusToken from '../../api/UseAmadeus';
import { Grid } from '@mui/material';

const DestinationGallery = (props) => {
  const [cityObject,setCityObject] = useState(null);

  const surpriseSearch = async (origin) => {
    const tokenData = await getAmadeusToken();
    
    try{
      const amadeusFlightSurprise = await axios.get(
        ` https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
      console.log(amadeusFlightSurprise.data)
      setCityObject(amadeusFlightSurprise.data);
    } catch (err){
      console.log(err);
    };
  };
  useEffect(()=>{
    surpriseSearch(props.origin);
  },[]);

  return(
    <div> Exploring your backyard...
      <Grid container spacing ={0}>
        {cityObject?cityObject.data.map((city,index)=>{
          return(
          <DestinationCard cityObject={city} currency={cityObject.meta.currency}/>
            )}):"Loading"}
      </Grid>
    </div>
  )
}

export default DestinationGallery;