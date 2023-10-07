import React, { useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import autoSuggestContext from '../../utils/autoSuggestContext';

export default function AirportAutoSuggest() {
  const [
    departureSuggestions,
    destinationSuggestions,
    handleSearch,
    setDepartureSuggestions,
    setDestinationSuggestions,
    departureQuery,
    destinationQuery,
    setDepartureQuery,
    setDestinationQuery,
  ] = useContext(autoSuggestContext);

  const handleDepartureInputChange = (e) => {
    const inputValue = e.target.value;

    const selectedSuggestion = departureSuggestions.find(
      (suggestion) => suggestion.name === inputValue
    );

    if (selectedSuggestion) {
      console.log(selectedSuggestion);
      handleSearch(inputValue, setDepartureSuggestions);
    } else {
      setDepartureQuery(''); // Reset departureQuery if no suggestion is selected
      handleSearch(inputValue, setDepartureSuggestions);
    }
  };

  const handleDestinationInputChange = (e) => {
    const inputValue = e.target.value;
    // Handle destination search here if needed
  };

  return (
    <div className="destination-arrival-wrapper">
      <Stack spacing={1} sx={{ width: 300 }} className="mui-auto-suggest">
        <Autocomplete
          id="departure-auto-complete"
          freeSolo
          onInputChange={handleDepartureInputChange} // Call handleDepartureInputChange when input value changes
          options={departureSuggestions.map((option) => option.name)}
          renderInput={(params) => (
            <TextField {...params} label="airport, city or country" />
          )}
        />
      </Stack>
      <Stack spacing={1} sx={{ width: 300 }} className="mui-auto-suggest">
        <Autocomplete
          id="arrival-auto-complete"
          freeSolo
          onInputChange={handleDestinationInputChange} // Call handleDestinationInputChange when input value changes
          options={destinationSuggestions.map((option) => option.name)}
          renderInput={(params) => (
            <TextField {...params} label="airport, city or country" />
          )}
        />
      </Stack>
    </div>
  );
}
