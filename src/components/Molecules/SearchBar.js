import React, { useState, useMemo, useRef } from 'react';
import DatePicker from '../CalendarComponent';
import '../../CSS/App.css';
import '../../CSS/SearchBar.css';
import ModelContainer from '../Organisms/ModelContainer';
import { Button } from '@material-ui/core';
import searchContext from '../../utils/SearchContext';
import dateRangeContext from '../../utils/dateRangeContext';
import axios from 'axios';
import getAuth from '../../utils/UseApi';

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
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimeoutRef = useRef(null);

  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleSearch = debounce(async (searchQuery) => {
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

      // Process the API response
      setSuggestions(data.data);
      console.log(suggestions);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching API data:', error);
    }
    // setSuggestions(apiResponse);
  }, 300);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    handleSearch(value);
  };

  const memoizedSearchArray = useMemo(
    () => [passengerInfoState, setPassengerInfoState],
    [passengerInfoState, setPassengerInfoState]
  );

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
              onChange={handleChange}
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="auto-suggest-airport">
                {suggestions.map((suggestion) => {
                  console.log(suggestion);
                  return (
                    <li clßassName="auto-suggest-airport" key={suggestion.id}>
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
            />
          </div>
          <dateRangeContext.Provider value={{ dateRange, setDateRange }}>
            <DatePicker className="calendar-input" />
          </dateRangeContext.Provider>
          <ModelContainer />

          <Button variant="contained" color="primary" type="submit">
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
