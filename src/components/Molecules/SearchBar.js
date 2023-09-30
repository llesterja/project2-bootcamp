import React, { useState, useMemo } from 'react';
import DatePicker from '../CalendarComponent';
import '../../CSS/App.css';
import '../../CSS/SearchBar.css';
import ModelContainer from '../Organisms/ModelContainer';
import { Button } from '@material-ui/core';
import searchContext from '../../utils/SearchContext';
import dateRangeContext from '../../utils/dateRangeContext';

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
