import axios from 'axios';
<<<<<<< HEAD
const getAuth = async () => {
  try {
    const { data: tokenData } = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AMADEUS_API_KEY,
        client_secret: process.env.REACT_APP_AMADEUS_API_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenData.access_token;
    return accessToken;
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error fetching access token:', error);
    throw error; // Rethrow the error to be handled higher up the call stack if necessary
  }
};

export default getAuth;

// const originLocationCode = 'SYD';
// const destinationLocationCode = 'BKK';
// const departureDate = '2023-10-02';
// const returnDate = '2023-10-15';
// const adults = 2;
// const currencyCode = 'GBP';

// const flightData = await axios.get(
//   `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&travelClass=PREMIUM_ECONOMY&nonStop=false&max=250&currencyCode=${currencyCode}`,
//   {
//     headers: {
//       Authorization: `Bearer ${tokenData.access_token}`,
//     },
//   }
// );

// return flightData;
=======

const UseApi = (endpoint, method, parameters, authentication) => {
  console.log(authentication);
  return axios[method](endpoint, {
    params: parameters,
    headers: {
      Authorization: `Bearer ${authentication}`,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export default UseApi;
>>>>>>> b96f88a (refactor: worked on using UseContext to control search and date state in searchbar comp)
