<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> fe91f17 (feat: added click outside dropdown to close feat)
import DatePicker from './CalendarComponent';
import '../CSS/App.css';
import ModelContainer from './ModelContainer';
import { Button } from '@material-ui/core';
<<<<<<< HEAD
=======
import searchContext from '../utils/SearchContext';
>>>>>>> fe91f17 (feat: added click outside dropdown to close feat)

const SearchBar = () => {
  return (
    <div className="searchbar">
<<<<<<< HEAD
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
=======
      <searchContext.Provider value={[]}>
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
      </searchContext.Provider>
>>>>>>> fe91f17 (feat: added click outside dropdown to close feat)
    </div>
  );
};

export default SearchBar;
