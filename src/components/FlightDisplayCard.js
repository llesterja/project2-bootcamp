import React from "react";

const FlightDisplayCard = ({ flight }) => {
  return (
    <div className="flight-display-card">
      <h3>{flight.airline}</h3>
      <p>From: {flight.origin}</p>
      <p>To: {flight.destination}</p>
      <p>Price: {flight.price}</p>
      <button className="book-button">Book Now</button>
    </div>
  );
};

export default FlightDisplayCard;
