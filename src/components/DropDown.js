import React, { useEffect, useState, useContext } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import searchContext from '../utils/SearchContext';
// todo  refactor onClicks for counters to reduce repeat e.preventDefault()
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
  const [passengerInfoState, setPassengerInfoState] = useContext(searchContext);

  useEffect(() => {
    console.log(passengerInfoState.selectedOption);
  }, [passengerInfoState]);

  const updateSelectedOption = (event) => {
    const newOption = event.target.value;

    console.log(newOption);

    setPassengerInfoState((prevState) => ({
      ...prevState,

      selectedOption: newOption,
    }));
  };

  const increaseAdultCounter = (event) => {
    event.preventDefault();

    setPassengerInfoState((prevState) => {
      const newCounterValue = Math.min(prevState.adultCounterValue + 1, 8); // Limit to a maximum of 8

      return {
        ...prevState,

        adultCounterValue: newCounterValue,
      };
    });
  };

  const decreaseAdultCounter = (event) => {
    event.preventDefault();

    setPassengerInfoState((prevState) => {
      const newCounterValue = Math.max(prevState.adultCounterValue - 1, 0);

      return {
        ...prevState,

        adultCounterValue: newCounterValue,
      };
    });
  };

  const increaseChildCounter = (event) => {
    event.preventDefault();

    setPassengerInfoState((prevState) => {
      const newCounterValue = Math.min(prevState.childCounterValue + 1, 8);

      return {
        ...prevState,

        childCounterValue: newCounterValue,
      };
    });
  };

  const decreaseChildCounter = (event) => {
    event.preventDefault();

    setPassengerInfoState((prevState) => {
      const newCounterValue = Math.max(prevState.childCounterValue - 1, 0);

      return {
        ...prevState,

        childCounterValue: newCounterValue,
      };
    });
  };

  return (
    <div className="accordian-container">
      <FormControl className="form-items">
        <InputLabel className="cabin-label">Cabin Class</InputLabel>

        <Select
          value={passengerInfoState.selectedOption}
          className="Select"
          onChange={updateSelectedOption}
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
            <button onClick={increaseAdultCounter}>&#8593;</button>

            <input
              type="text"
              value={passengerInfoState.adultCounterValue}
              aria-label="number input"
            />

            <button onClick={decreaseAdultCounter}>&#8595;</button>
          </div>
        </div>

        <div className="counter">
          <div className="label-text">
            <span>Children</span>

            <span>Aged 0 to 15</span>
          </div>

          <div className="counter-wrapper">
            <button onClick={increaseChildCounter}>&#8593;</button>

            <input
              type="text"
              value={passengerInfoState.childCounterValue}
              aria-label="number input"
            />

            <button onClick={decreaseChildCounter}>&#8595;</button>
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

            // onClick={handleSubmit}
          >
            Search
          </Button>
        </ThemeProvider>
      </FormControl>
    </div>
  );
}

export default NestedForm;
