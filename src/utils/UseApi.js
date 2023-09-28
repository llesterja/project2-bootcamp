import axios from 'axios';

const getData = async () => {
  const data = await axios.post(
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
  return data;
};

export default getData;
