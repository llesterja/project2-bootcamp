import getAuth from './UseAuthAmadeus';
import axios from 'axios';
import moment from 'moment';

const getFlightOffers = async (
  departure,
  destination,
  datesObject,
  cabinClass,
  adults,
  children
) => {
  const authToken = await getAuth();

  const { endDate, startDate } = datesObject;
  const { _d: returnDate } = endDate;
  const { _d: departDate } = startDate;
  const formattedReturnDate = moment(returnDate).format('YYYY-MM-DD');
  const formattedDepartureDate = moment(departDate).format('YYYY-MM-DD');

  const travelClassDict = {
    FirstClass: 'FIRST',
    BusinessClass: 'BUSINESS',
    PremiumEconomy: 'PREMIUM_ECONOMY',
    Economy: 'ECONOMY',
  };

  const travelClass = travelClassDict[[...cabinClass].join('')];

  const flightData = await axios.get(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=LHR&destinationLocationCode=HKG&departureDate=${formattedDepartureDate}&returnDate=${formattedReturnDate}&adults=${adults}&travelClass=${travelClass}&children=${children}&nonStop=false&max=5`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  const responseData = flightData.data;
  return responseData;
};

export default getFlightOffers;
