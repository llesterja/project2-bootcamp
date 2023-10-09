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

  useEffect(() => {
    console.log('departureSuggestions:', departureSuggestions);
    console.log('destinationSuggestions:', destinationSuggestions);
  }, [departureSuggestions, destinationSuggestions]);

  const handleInputChange = (e, setSuggestionsArray, setQuery) => {
    const inputValue = e.target.value;
    handleSearch(inputValue, setSuggestionsArray);
    setQuery('');
  };

  const handleSelect = (event, value, suggestionsArray, setQuery) => {
    // Do something with the selected value
    const selectedObject = suggestionsArray.find((obj) => obj.name === value);
    const IATACode = selectedObject?.iataCode;
    setQuery(IATACode);
  };

  return (
    <div className="destination-arrival-wrapper">
      <Stack spacing={1} sx={{ width: 300 }} className="mui-auto-suggest">
        <Autocomplete
          id="departure-auto-complete"
          freeSolo
          filterOptions={(options, state) => options}
          onInputChange={(e) => {
            handleInputChange(e, setDepartureSuggestions, setDepartureQuery);
          }}
          onChange={(e, value) => {
            handleSelect(e, value, departureSuggestions, setDepartureQuery);
          }}
          options={departureSuggestions.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label=" From"
              placeholder="Country,city or airport"
            />
          )}
        />
      </Stack>
      <Stack spacing={1} sx={{ width: 300 }} className="mui-auto-suggest">
        <Autocomplete
          id="arrival-auto-complete"
          freeSolo
          filterOptions={(options, state) => options}
          onInputChange={(e) => {
            handleInputChange(
              e,
              setDestinationSuggestions,
              setDestinationQuery
            );
          }}
          onChange={(e, value) => {
            handleSelect(e, value, destinationSuggestions, setDestinationQuery);
          }}
          options={destinationSuggestions.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label=" To"
              placeholder="Country,city or airport"
            />
          )}
        />
      </Stack>
    </div>
  );
}
