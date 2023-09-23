import React from 'react';
import DatePicker from './CalendarComponent';
import '../CSS/App.css';
import ModelContainer from './ModelContainer';
import { Button } from '@material-ui/core';

const SearchBar = () => {
  return (
    <div className="searchbar">
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
        <DatePicker className="calendar-input" />

        <ModelContainer />

        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>

        <Button variant="contained" type="submit">
          Surprise Me
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
