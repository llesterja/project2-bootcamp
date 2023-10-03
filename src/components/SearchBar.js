import React, { useState, useMemo, useCallback } from 'react';
import DatePicker from './CalendarComponent';
import '../CSS/App.css';
import ModelContainer from './ModelContainer';
import { Button } from '@material-ui/core';
import searchContext from '../utils/SearchContext';
import dateRangeContext from '../utils/dateRangeContext';

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

  // Update selected option
  const handleOptionChange = useCallback((option) => {
    setPassengerInfoState((prevState) => ({
      ...prevState,
      selectedOption: option,
    }));
  }, []);

  // Update adult counter value
  const handleAdultCounterChange = useCallback((value) => {
    setPassengerInfoState((prevState) => ({
      ...prevState,
      adultCounterValue: value,
    }));
  }, []);

  // Update child counter value
  const handleChildCounterChange = useCallback((value) => {
    setPassengerInfoState((prevState) => ({
      ...prevState,
      childCounterValue: value,
    }));
  }, []);

  const memoizedSearchArray = useMemo(
    () => [
      passengerInfoState,
      handleOptionChange,
      handleAdultCounterChange,
      handleChildCounterChange,
    ],
    [
      passengerInfoState,
      handleOptionChange,
      handleAdultCounterChange,
      handleChildCounterChange,
    ]
  );

  return (
    <div className="searchbar">
      <searchContext.Provider value={memoizedSearchArray}>
        <form>
          <div className="origin">
            <label>From</label>
            <input
              name="departure"
              className="departure-arrival"
              id="departure"
              placeholder="Country, City or Airport"
            />
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
