import React from 'react';
import LineSVG from './LineSVG';

const FlightLeg = ({ flightOffer }) => {
  console.log('flightleg is returning:', flightOffer);
  return (
    <div className="return-info">
      <div className="logo-container">
        <span className="dummy-logo"></span>
      </div>
      <div className="departure-flight-info">
        <h3> 16:00</h3>
        <h6 className="departure-airport">SIN</h6>
      </div>
      <div className="travel-info">
        <span className="travel-time">2h 45</span>
        <LineSVG />
        <span className="transport-stops"> Direct</span>
      </div>
      <div className="departure-flight-info">
        <h3> 18:45</h3>
        <h6 className="departure-airport">DPS</h6>
      </div>
    </div>
  );
};

export default FlightLeg;
