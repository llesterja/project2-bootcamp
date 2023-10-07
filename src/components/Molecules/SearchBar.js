import React, { useState, useMemo, useRef, useEffect } from 'react';
import DatePicker from './CalendarComponent';
import '../../CSS/App.css';
import '../../CSS/SearchBar.css';
import ModelContainer from '../Organisms/ModelContainer';
import { Button } from '@material-ui/core';
import searchContext from '../../utils/SearchContext';
import dateRangeContext from '../../utils/dateRangeContext';
import axios from 'axios';
import getAuth from '../../utils/UseAuthAmadeus';
import getFlightOffers from '../../utils/useFlightOffersApi';

const SearchBar = () => {
  const [passengerInfoState, setPassengerInfoState] = useState({
    selectedOption: 'First Class',
    adultCounterValue: 0,
    childCounterValue: 0,
  });
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [departureQuery, setDepartureQuery] = useState({
    name: '',
    IATACODE: '',
  });
  const [destinationQuery, setDestinationQuery] = useState({
    name: '',
    IATACODE: '',
  });
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const debounceTimeoutRef = useRef(null);

  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleSearch = debounce(async (searchQuery, setSuggestions) => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const authDetails = await getAuth();

    try {
      const apiResponse = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${searchQuery}&page[limit]=10&view=LIGHT`,
        {
          headers: {
            Authorization: `Bearer ${authDetails}`,
          },
        }
      );
      const { data } = apiResponse;
      console.log(data.data);
      // Process the API response
      setSuggestions(data.data);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching API data:', error);
    }
  }, 600);

  const handleChange = (event, setQuery, setSuggestions) => {
    const { value } = event.target;
    setQuery(value);
    handleSearch(value, setSuggestions);
  };

  const handleSuggestionClick = (
    suggestion,
    inputId,
    setSuggestionsArray,
    setQuery,
    suggestionsArray
  ) => {
    const inputField = document.getElementById(inputId);
    console.log(suggestionsArray[suggestion]);
    inputField.value = suggestion;
    setQuery(suggestion);
    setSuggestionsArray([]);
  };

  const memoizedSearchArray = useMemo(
    () => [passengerInfoState, setPassengerInfoState],
    [passengerInfoState, setPassengerInfoState]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const offers = await getFlightOffers(
      departureQuery,
      destinationQuery,
      dateRange,
      passengerInfoState.selectedOption,
      passengerInfoState.adultCounterValue,
      passengerInfoState.childCounterValue
    );
    console.log(offers);
  };

  return (
    <div className="searchbar">
      <h1 className="searchbar-heading">
        Millions of cheap flights, at your finger tips
      </h1>
      <searchContext.Provider value={memoizedSearchArray}>
        <form>
          <div className="origin">
            <label>From</label>
            <input
              name="departure"
              className="departure-arrival"
              id="departure"
              placeholder="Country, City or Airport"
              onChange={(event) => {
                handleChange(event, setDepartureQuery, setDepartureSuggestions);
              }}
              autoComplete="off"
            />
            {departureSuggestions.length > 0 && (
              <ul className="auto-suggest-airport departure-suggestions">
                {departureSuggestions.map((suggestion) => {
                  return (
                    <li
                      className="departure-suggestions"
                      key={suggestion.id}
                      onClick={() => {
                        handleSuggestionClick(
                          suggestion.name,
                          'departure',
                          setDepartureSuggestions,
                          setDepartureQuery,
                          departureSuggestions
                        );
                      }}
                    >
                      {suggestion.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="destination">
            <label>To</label>
            <input
              className="departure-arrival"
              name="arrival"
              id="arrival"
              placeholder="Country, City or Airport"
              onChange={(event) => {
                handleChange(
                  event,
                  setDestinationQuery,
                  setDestinationSuggestions
                );
              }}
              autoComplete="off"
            />
            {destinationSuggestions.length > 0 && (
              <ul className="auto-suggest-airport destination-suggestions">
                {destinationSuggestions.map((suggestion) => {
                  return (
                    <li
                      className="destination-suggestion"
                      key={suggestion.id}
                      onClick={() => {
                        handleSuggestionClick(
                          suggestion.name,
                          'arrival',
                          setDestinationSuggestions,
                          setDestinationQuery
                        );
                      }}
                    >
                      {suggestion.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <dateRangeContext.Provider value={{ dateRange, setDateRange }}>
            <DatePicker className="calendar-input" />
          </dateRangeContext.Provider>
          <ModelContainer />

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Search
          </Button>

          <Button variant="contained" type="submit">
            Surprise Me
          </Button>
        </form>
      </searchContext.Provider>
    </div>
  );
};

export default SearchBar;
