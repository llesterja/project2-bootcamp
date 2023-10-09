import React, { useContext, useEffect } from 'react';
import DatePicker from './CalendarComponent';
import '../../CSS/App.css';
import '../../CSS/SearchBar.css';
import ModelContainer from '../Organisms/ModelContainer';
import { Button } from '@material-ui/core';
import searchContext from '../../utils/SearchContext';
import getFlightOffers from '../../utils/useFlightOffersApi';
import AirportAutoSuggest from '../Atoms/MUIAutoSuggest';
import dateRangeContext from '../../utils/dateRangeContext';
import dropDownContext from '../../utils/dropDownContext';
import { DropdownContext } from '@mui/base';

const SearchBar = () => {
  const [
    passengerInfoState,
    setPassengerInfoState,
    departureQuery,
    destinationQuery,
  ] = useContext(searchContext);
  const [dateRange] = useContext(dateRangeContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('The departure query in handleSubmit is:', departureQuery);
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

      <form>
        <AirportAutoSuggest className="grid-item1" />

        <DatePicker className="calendar-input grid-item2" />
        <dropDownContext.Provider value={[handleSubmit]}>
          <ModelContainer className="grid-item3" />
        </dropDownContext.Provider>

        <Button
          variant="contained"
          className="searchbar-btn grid-item4"
          color="primary"
          onClick={handleSubmit}
        >
          Search
        </Button>

        <Button
          variant="contained"
          type="submit"
          className="searchbar-btn grid-item5"
        >
          Surprise Me
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
