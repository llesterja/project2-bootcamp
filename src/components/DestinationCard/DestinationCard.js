import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import getAmadeusToken from '../../api/UseAmadeus';

const DestinationCard=()=>{
  console.log('this is a card that displays a picture of the destination country, details of the flight, price of the flight, dates travelling if applicable')
  const [cityObject,setCityObject] = useState(null);

  const surpriseSearch = async () => {
    const tokenData = await getAmadeusToken();
    const origin = "SIN"
    try{
      const amadeusFlightSurprise = await axios.get(
        ` https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${origin}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      );
      console.log(amadeusFlightSurprise.data)
      setCityObject(amadeusFlightSurprise.data);
    } catch (err){
      console.log(err);
    };
  };

  const getCity = async() => {
    const tokenData = await getAmadeusToken();
    const IATA = "MUC";
    try{
    const IATAtoCity = await axios.get(
      ` https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${IATA}/&view=LIGHT`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }

    );
    console.log(IATAtoCity.data)
    return IATAtoCity.data.data[0].address.cityName;    
    } catch(err){
      console.log(err);
    };
  }


  const getCityPhoto = async() => {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const apiUrl = 'https://api.unsplash.com';
    const response = await axios.get(`${apiUrl}/photos/random`
    , {
      headers: {
        Authorization: `Client-ID fk_07-rYAHvwuDPwqYFpDE4I0FECpU7m7YLoPaA0ArY`,
    },
  });
  console.log(response.data.urls) ;
  }

  useEffect(()=>{
    surpriseSearch();
  },[]);


  console.log("cityObject",cityObject)

  return(
    // there is 2 variation of this, one with search inputs and 1 with database inputs
    // create a generic one that can support both and build a gallery view of all available flights
    // card will have have picture of destination country (may have to call a separate api or download a list of images to be referenced)
    // card will display location name, lowest price, 

    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="city image"
        height="140"
        image="https://npr.brightspotcdn.com/dims4/default/aa612b7/2147483647/strip/true/crop/910x525+0+0/resize/1760x1016!/format/webp/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Flegacy%2Fsites%2Fwusf%2Ffiles%2F201907%2Finvasive_iguanas_7-5.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cityObject?cityObject.data[0].destination:"Loading"}
        </Typography>
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{cityObject?(cityObject.data[0].price.total+" "+cityObject.meta.currency):"Loading"}</Button>
        <Button size="small">Add to Dashboard</Button>
      </CardActions>
    </Card>
  )
}

export default DestinationCard;