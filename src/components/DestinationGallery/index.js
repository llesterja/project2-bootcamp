import React from 'react';
import axios from 'axios';
import DestinationCard from '../DestinationCard';
// import Amadeus from 'amadeus';

const DestinationGallery = () => {
  // var amadeus = new Amadeus();

  return(
    <div>Destination Gallery
      <DestinationCard/>
      <DestinationCard/>
      <DestinationCard/>
    </div>
  )
}

export default DestinationGallery;