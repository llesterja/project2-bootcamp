import axios from 'axios';
const getData = async () => {
  const { data: tokenData } = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    {
      grant_type: 'client_credentials',
      client_id: 'yTrSG9Fhp3kYaxaFmYrGfAAYma6CLXlS',
      client_secret: 'ykDdiy1AGbs6GfP9',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  const originLocationCode = 'SYD';
  const destinationLocationCode = 'BKK';
  const departureDate = '2023-10-02';
  const adults = 2;

  const flightData = await axios.get(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&travelClass=PREMIUM_ECONOMY&nonStop=false&max=250`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  console.log(flightData.data);

  return flightData;
};

export default getData;
