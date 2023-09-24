import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-gb');

const DatePicker = () => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

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
