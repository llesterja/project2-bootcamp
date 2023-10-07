import React, { useState, useContext } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/en-gb';
import dateRangeContext from '../../utils/dateRangeContext';

moment.locale('en-gb');

const DatePicker = () => {
  const [dateRange, setDateRange] = useContext(dateRangeContext);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  const isOutsideRange = (date) => {
    return date.isBefore(moment(), 'day'); // Allow selection of today and future dates
  };

  return (
    <div>
      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onDatesChange={handleDateRangeChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        startDateId="start_date"
        endDateId="end_date"
        numberOfMonths={1}
        isOutsideRange={isOutsideRange} // Prevent selection of past dates
        displayFormat={() => 'DD/MM/YYYY'}
      />
    </div>
  );
};

export default DatePicker;
