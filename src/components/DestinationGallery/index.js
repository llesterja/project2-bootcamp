import React, {useEffect} from 'react';
import axios from 'axios';
import DestinationCard from '../DestinationCard/DestinationCard';
import getAmadeusToken from '../../api/UseAmadeus';

const DestinationGallery = () => {
  
  const surpriseSearch = async () => {
    const tokenData = await getAmadeusToken();
    const origin = "SIN"
    const amadeusFlightSurprise = await axios.get(
      ` https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );
    console.log(amadeusFlightSurprise.data)
    return amadeusFlightSurprise;
    }

  useEffect(()=>{
    const searchResult=surpriseSearch();
    console.log(searchResult)
  },[]);

  return(
    <div>Destination Gallery
      <DestinationCard />
    </div>
  )
}

export default DestinationGallery;