import React from 'react';
import FlightIcon from '@mui/icons-material/Flight';

const LineSVG = () => {
  return (
    <div className="flight-line">
      <svg viewBox="0 0 100 25" width="100" height="auto">
        <line x1="0" y1="12" x2="100" y2="12" stroke="black" strokeWidth="1" />
      </svg>
      <FlightIcon className="plane-icon" />
    </div>
  );
};

export default LineSVG;
