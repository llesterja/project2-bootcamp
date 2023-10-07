import React from 'react';
import { Button, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import '../../CSS/FlightOfferCard.css';
import ReturnFlightsInfo from '../Atoms/ReturnFlightsInfo';

const FlightOfferCard = () => {
  return (
    <Grid container spacing={0} className="offer-card">
      <Grid item xs={3} className="card-paper flight-itinery">
        <div>
          <ReturnFlightsInfo />
          <ReturnFlightsInfo />
        </div>
      </Grid>
      <Grid item xs={1} className="card-paper offer-wrapper">
        <div className="offer-info">
          <span className="total-offers-available">13 offers from </span>
          <h4 className="lowest-price">£454</h4>
          <Button variant="contained" endIcon={<ArrowForwardIcon />}>
            Select
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default FlightOfferCard;
