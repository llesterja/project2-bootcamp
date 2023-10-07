import React, { useState, useEffect } from 'react';
import SearchBarWrapper from './components/Organisms/SearchBarWrapper';
import './CSS/App.css';
import getData from './utils/UseAuthAmadeus';
import FlightTable from './components/FlightsTable';
import DestinationCard from "./components/DestinationCard";
import DestinationGallery from "./components/DestinationGallery"

import FlightOfferContainer from './components/Organisms/FlightOffersContainer';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [dictionaries, setDictionaries] = useState([]);

  return (
    <div className="App">
      <SearchBarWrapper />
      <FlightOfferContainer />
      <DestinationGallery/>
    </div>
  );
};

export default App;
