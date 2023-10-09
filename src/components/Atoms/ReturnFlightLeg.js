import React from 'react';
import moment from 'moment';
import LineSVG from './LineSVG';

const formatTime = (dateTimeString) => {
  const dateTime = moment(dateTimeString);
  return dateTime.format('HH:mm');
};

const formatDuration = (durationString) => {
  const duration = moment.duration(durationString);

  const hours = duration.hours();
  const minutes = duration.minutes();

  return `${hours}H ${minutes}`;
};

const FlightLeg = ({ outboundItinerary, returnItinerary }) => {
  const outboundDepartureTime = formatTime(
    outboundItinerary.segments[0].departure.at
  );
  const outboundArrivalTime = formatTime(
    outboundItinerary.segments[0].arrival.at
  );
  const returnDepartureTime = formatTime(
    returnItinerary.segments[0].departure.at
  );
  const returnArrivalTime = formatTime(returnItinerary.segments[0].arrival.at);
  const outboundDuration = formatDuration(outboundItinerary.duration);
  const returnDuration = formatDuration(returnItinerary.duration);

  return (
    <div className="flight-info">
      {/* Render outbound itinerary */}
      <div className="outbound-info">
        <div className="logo-container">
          <span className="dummy-logo"></span>
        </div>
        <div className="departure-flight-info">
          <h3>{outboundDepartureTime}</h3>
          <h6 className="departure-airport">
            {outboundItinerary.segments[0].departure.iataCode}
          </h6>
        </div>
        <div className="travel-info">
          <span className="travel-time">{outboundDuration}</span>
          <LineSVG />
          <span className="transport-stops"> Direct</span>
        </div>
        <div className="departure-flight-info">
          <h3>{outboundArrivalTime}</h3>
          <h6 className="departure-airport">
            {outboundItinerary.segments[0].arrival.iataCode}
          </h6>
        </div>
      </div>

      {/* Render return itinerary */}
      <div className="return-info">
        <div className="logo-container">
          <span className="dummy-logo"></span>
        </div>
        <div className="departure-flight-info">
          <h3>{returnDepartureTime}</h3>
          <h6 className="departure-airport">
            {returnItinerary.segments[0].departure.iataCode}
          </h6>
        </div>
        <div className="travel-info">
          <span className="travel-time">{returnDuration}</span>
          <LineSVG />
          <span className="transport-stops"> Direct</span>
        </div>
        <div className="departure-flight-info">
          <h3>{returnArrivalTime}</h3>
          <h6 className="departure-airport">
            {returnItinerary.segments[0].arrival.iataCode}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default FlightLeg;
