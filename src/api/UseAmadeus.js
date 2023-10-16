import axios from 'axios';

const getAmadeusToken = async () => {
  const { data: tokenData } = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    {
      grant_type: 'client_credentials',
      client_id: process.env.REACT_APP_AMADEUS_CLIENT_ID,
      client_secret: process.env.REACT_APP_AMADEUS_CLIENT_SECRET,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  return tokenData;
};

export default getAmadeusToken;
