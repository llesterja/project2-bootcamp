import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#0062e3',
          color: 'white',
          fontSize: '1.5rem',
          alignSelf: 'center',
          padding: '1rem 3rem',
          border: 'none',
          borderRadius: '6px',
        },
      },
    },
  },
});

function NestedForm() {
  const [selectedOption, setSelectedOption] = useState('First Class');
  const [adultCounterValue, setAdultCounterValue] = useState(0);
  const [childCounterValue, setChildCounterValue] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const increaseCounter = (counter, setCounter) => {
    if (counter < 8) {
      setCounter((prevCount) => prevCount + 1);
    }
  };

  const decreaseCounter = (counter, setCounter) => {
    if (counter === 0) {
      return;
    }
    setCounter((prevCount) => prevCount - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log(selectedOption);
  };

  return (
    <div className="accordian-container">
      <FormControl className="form-items">
        <InputLabel className="cabin-label">Cabin Class</InputLabel>
        <Select
          value={selectedOption}
          className="Select"
          onChange={handleOptionChange}
        >
          <MenuItem value="First Class">First Class</MenuItem>
          <MenuItem value="Business Class">Business Class</MenuItem>
          <MenuItem value="Premium Economy">Premium Economy</MenuItem>
          <MenuItem value="Economy"> Economy</MenuItem>
        </Select>

        <div className="counter">
          <div className="label-text">
            <span> Adults</span>
            <span>Aged 16+</span>
          </div>
          <div className="counter-wrapper">
            <button
              onClick={() => {
                increaseCounter(adultCounterValue, setAdultCounterValue);
              }}
            >
              {' '}
              &#8593;
            </button>
            <input
              type="text"
              value={adultCounterValue}
              aria-label="number input"
            />
            <button
              onClick={() => {
                decreaseCounter(adultCounterValue, setAdultCounterValue);
              }}
            >
              {' '}
              &#8595;
            </button>
          </div>
        </div>

        <div className="counter">
          <div className="label-text">
            <span> Children</span>
            <span>Aged 0 to 15</span>
          </div>
          <div className="counter-wrapper">
            <button
              onClick={() => {
                increaseCounter(childCounterValue, setChildCounterValue);
              }}
            >
              {' '}
              &#8593;
            </button>
            <input
              type="text"
              value={childCounterValue}
              aria-label="number input"
            />
            <button
              onClick={() => {
                decreaseCounter(childCounterValue, setChildCounterValue);
              }}
            >
              {' '}
              &#8595;
            </button>
          </div>
        </div>
        <div className="legal-disclaimer">
          <span>
            Your age at time of travel must be valid for the age category
            booked. Airlines have restrictions on under 18s travelling alone.
          </span>
          <span>
            Age limits and policies for travelling with children may vary so
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
