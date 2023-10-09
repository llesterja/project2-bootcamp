import React, { useContext } from 'react';
import FlightOfferCard from '../Molecules/FlightOfferCard';
import FlightOfferContext from '../../utils/FlightOfferContext';

const FlightOfferContainer = () => {
  const { flights, dictionaries } = useContext(FlightOfferContext);

  return (
    <div>
      {flights.map((flightOffer) => (
        <FlightOfferContext.Provider
          key={flightOffer.id}
          value={{ flightOffer, dictionaries }}
        >
          <FlightOfferCard />
        </FlightOfferContext.Provider>
      ))}
    </div>
  );
};

export default FlightOfferContainer;
