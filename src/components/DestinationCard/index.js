import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DestinationCard=()=>{
  console.log('this is a card that displays a picture of the destination country, details of the flight, price of the flight, dates travelling if applicable')
  return(
    // there is 2 variation of this, one with search inputs and 1 with database inputs
    // create a generic one that can support both and build a gallery view of all available flights
    // card will have have picture of destination country (may have to call a separate api or download a list of images to be referenced)
    // card will display location name, lowest price, 

    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://npr.brightspotcdn.com/dims4/default/aa612b7/2147483647/strip/true/crop/910x525+0+0/resize/1760x1016!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwusf%2Ffiles%2F201907%2Finvasive_iguanas_7-5.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default DestinationCard;