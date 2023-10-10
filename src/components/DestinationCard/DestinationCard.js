import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import getAmadeusToken from '../../api/UseAmadeus';

const DestinationCard=(props)=>{
  console.log('this is a card that displays a picture of the destination country, details of the flight, price of the flight, dates travelling if applicable')
  const {cityObject,currency} = props;
  const [cityName,setCityName]=useState(null);
  const [cityImg,setCityImg] = useState(null);
  // const [checkCityObj,setCheckCityObj]=useState(false);
  const [checkCityName,setCheckCityName]=useState(false);

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
      // setCityObject(amadeusFlightSurprise.data);
      // setCheckCityObj(true);
    } catch (err){
      console.log(err);
    };
  };

  const getCity = async(IATA) => {
    const tokenData = await getAmadeusToken();
    try{
    const IATAtoCity = await axios.get(
      `https://api.api-ninjas.com/v1/airports?iata=${IATA}`,
      {
        headers: {
          'X-API-Key': '76neFOhHiRLqsXXZNumRxA==R2ZfjE2Lv6qU38Aq'
        }
      }
    );
    console.log(IATAtoCity.data[0].city)
    setCityName(IATAtoCity.data[0].city);
    setCheckCityName(true)    
    } catch(err){
      console.log(err);
    };
  }


  const getCityPhoto = async(city) => {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const apiUrl = 'https://api.unsplash.com';
    const response = await axios.get(`${apiUrl}/search/photos?query=${city}`
    , {
      headers: {
        Authorization: `Client-ID fk_07-rYAHvwuDPwqYFpDE4I0FECpU7m7YLoPaA0ArY`,
    },
  });
  setCityImg(response.data.results[0].urls.full) ;
  };

  useEffect(()=>{
    
  },[]);
  useEffect(()=>{
    getCity(cityObject.destination)
  },[]);
  useEffect(()=>{
    checkCityName?getCityPhoto(cityName):console.log("Loading")
  },[cityName]);

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
        image={cityImg}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cityName?cityName:"Loading"}
        </Typography>
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{cityObject?(cityObject.price.total+" "+currency):"Loading"}</Button>
        <Button size="small">Add to Dashboard</Button>
      </CardActions>
    </Card>
  )
}

export default DestinationCard;