import React, { useContext } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import searchContext from '../utils/SearchContext';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  // Theme configuration...
});

function NestedForm() {
  const [
    passengerInfoState,
    onOptionChange,
    onAdultCounterChange,
    onChildCounterChange,
  ] = useContext(searchContext);

  const increaseCounter = (setCounter, event) => {
    event.preventDefault();
    setCounter((prevCount) => prevCount + 1);
  };

  const decreaseCounter = (setCounter, event) => {
    event.preventDefault();
    setCounter((prevCount) => (prevCount === 0 ? 0 : prevCount - 1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleOptionChange = (event) => {
    onOptionChange(event.target.value);
  };

  return (
    <div className="accordian-container">
      <FormControl className="form-items">
        <InputLabel className="cabin-label">Cabin Class</InputLabel>
        <Select
          value={passengerInfoState.selectedOption}
          className="Select"
          onChange={handleOptionChange}
        >
          <MenuItem value="First Class">First Class</MenuItem>
          <MenuItem value="Business Class">Business Class</MenuItem>
          <MenuItem value="Premium Economy">Premium Economy</MenuItem>
          <MenuItem value="Economy">Economy</MenuItem>
        </Select>

        <div className="counter">
          <div className="label-text">
            <span>Adults</span>
            <span>Aged 16+</span>
          </div>
          <div className="counter-wrapper">
            <button
              onClick={(event) => increaseCounter(onAdultCounterChange, event)}
            >
              &#8593;
            </button>
            <input
              type="text"
              value={passengerInfoState.adultCounterValue}
              aria-label="number input"
            />
            <button
              onClick={(event) => decreaseCounter(onAdultCounterChange, event)}
            >
              &#8595;
            </button>
          </div>
        </div>

        <div className="counter">
          <div className="label-text">
            <span>Children</span>
            <span>Aged 0 to 15</span>
          </div>
          <div className="counter-wrapper">
            <button
              onClick={(event) => increaseCounter(onChildCounterChange, event)}
            >
              &#8593;
            </button>
            <input
              type="text"
              value={passengerInfoState.childCounterValue}
              aria-label="number input"
            />
            <button
              onClick={(event) => decreaseCounter(onChildCounterChange, event)}
            >
              &#8595;
            </button>
          </div>
        </div>

        <div className="legal-disclaimer">
          <span>
            Your age at the time of travel must be valid for the age category
            booked. Airlines have restrictions on under 18s travelling alone.
          </span>
          <span>
            Age limits and policies for travelling with children may vary, so
            please check with the airline before booking.
          </span>
        </div>

        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Button
            variant="contained"
            color="primary"
            className="accordion-search"
            onClick={handleSubmit}
          >
            Search
          </Button>
        </ThemeProvider>
      </FormControl>
    </div>
  );
}

export default NestedForm;
