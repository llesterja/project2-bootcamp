import React, { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../CSS/FlightOfferCard.css';
import moment from 'moment';
import FlightOfferContext from '../../utils/FlightOfferContext';
import ReturnFlightLeg from '../Atoms/ReturnFlightLeg';

const FlightOfferCard = () => {
  const { flightOffer, dictionaries } = useContext(FlightOfferContext);
  const {
    price: { currency, total },
  } = flightOffer;

  const { itineraries } = flightOffer;
  const [outboundItinerary, returnItinerary] = itineraries;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(total);

  const departureDateTime = flightOffer.itineraries[0].segments[0].departure.at;
  const departureDate = moment(departureDateTime).format('ddd MM/DD/YYYY');

  return (
    <Grid container spacing={0} className="offer-card">
      <Grid item xs={3} className="card-paper flight-itinery">
        <div>
          <ReturnFlightLeg
            outboundItinerary={outboundItinerary}
            returnItinerary={returnItinerary}
          />
        </div>
      </Grid>
      <Grid item xs={1} className="card-paper offer-wrapper">
        <div className="offer-info">
          <span className="total-offers-available">
            {flightOffer.numberOfBookableSeats} seats left on {departureDate}
          </span>
          <h4 className="lowest-price">{formattedPrice}</h4>
          <Button variant="contained" endIcon={<ArrowForwardIcon />}>
            Select
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default FlightOfferCard;
