import React, { useState, useEffect } from 'react';
import SearchBarWrapper from './components/Organisms/SearchBarWrapper';
import './CSS/App.css';
import getData from './utils/UseApi';
import FlightTable from './components/FlightsTable';
import FlightOfferCard from './components/Molecules/FlightOfferCard';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [dictionaries, setDictionaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await getData();
      const { data } = rawData;
      const { dictionaries } = data;

      setFlights(data.data);
      setDictionaries(dictionaries);
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <SearchBarWrapper />
      {/* {flights.length > 0 && (
        <FlightTable flights={flights} dictionaries={dictionaries} />
      )} */}
      <FlightOfferCard />
    </div>
  );
};

export default App;
