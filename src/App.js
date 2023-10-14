import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import './CSS/App.css';
import getAuth from './utils/UseAuthAmadeus';
import searchContext from './utils/SearchContext';
import dateRangeContext from './utils/dateRangeContext';
import autoSuggestContext from './utils/autoSuggestContext';
import axios from 'axios';
import FlightOfferContainer from './components/Organisms/FlightOffersContainer';
import LoadingFullPageModal from './components/Atoms/MUIloadingAnimation';
import FlightOfferContext from './utils/FlightOfferContext';
import HomePage from './pages/HomePage/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import FlightDisplayPage from './pages/FlightsDisplayPage/index';
import { userDetailsContext } from './utils/userDetailsContext';
import Dashboard from './pages/Dashboard';
import './CSS/SearchBar.css';
import SurpriseMePage from './pages/SupriseMe';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },

  {
    path: '/Login',
    element: <Login />,
  },

  {
    path: '/Dashboard',
    element: <Dashboard />,
  },

  {
    path: '/FlightDisplayPage',
    element: <FlightDisplayPage />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  {
    path: '/SurpriseMe',
    element: <SurpriseMePage />,
  },
];

const App = () => {
  const [flights, setFlights] = useState([]);
  const [dictionaries, setDictionaries] = useState();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [loading, setLoading] = useState(false);
  const [passengerInfoState, setPassengerInfoState] = useState({
    selectedOption: 'First Class',
    adultCounterValue: 0,
    childCounterValue: 0,
  });

  const [departureQuery, setDepartureQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    console.log('flightOffers are:', flights);
    console.log('dictionaries are:', dictionaries);
  }, [flights, dictionaries]);

  const debounceTimeoutRef = useRef(null);

  const debounce = (func, delay) => {
    return function (...args) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = debounce(async (searchQuery, setSuggestions) => {
    const trimmedQuery = String(searchQuery).trim();
    console.log('trimmed Query is:', trimmedQuery);
    if (trimmedQuery.length === 0) {
      setSuggestions([]);
      return;
    }

    const authDetails = await getAuth();

    try {
      const apiResponse = await axios.get(
        `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${encodeURIComponent(
          trimmedQuery
        )}&max=10&include=AIRPORTS`,
        {
          headers: {
            Authorization: `Bearer ${authDetails}`,
          },
        }
      );
      const { data } = apiResponse;
      // Process the API response
      const airports = data.included.airports;
      const airportList = [];

      for (const key in airports) {
        if (airports.hasOwnProperty(key)) {
          const airport = airports[key];
          const { name, iataCode } = airport;
          airportList.push({ name, iataCode });
        }
      }

      setSuggestions(airportList);
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error fetching API data:', error);
    }
  }, 600);
  const memoizedSearchArray = useMemo(
    () => [
      passengerInfoState,
      setPassengerInfoState,
      departureQuery,
      destinationQuery,
      setFlights,
      setDictionaries,
      setLoading,
    ],
    [
      passengerInfoState,
      setPassengerInfoState,
      departureQuery,
      destinationQuery,
      setFlights,
      setDictionaries,
      setLoading,
    ]
  );

  const memoizedDateArray = useMemo(
    () => [dateRange, setDateRange],
    [dateRange, setDateRange]
  );

  const memoizedAutoSuggestArray = useMemo(
    () => [
      departureSuggestions,
      destinationSuggestions,
      handleSearch,
      setDepartureSuggestions,
      setDestinationSuggestions,
      departureQuery,
      destinationQuery,
      setDepartureQuery,
      setDestinationQuery,
    ],
    [
      departureSuggestions,
      destinationSuggestions,
      handleSearch,
      setDepartureSuggestions,
      setDestinationSuggestions,
      departureQuery,
      destinationQuery,
      setDepartureQuery,
      setDestinationQuery,
    ]
  );

  const contextValues = useMemo(
    () => [
      userDetails,
      setUserDetails,
      isLoggedIn,
      setIsLoggedIn,
      currentUser,
      setCurrentUser,
    ],
    [userDetails, setUserDetails, isLoggedIn, currentUser, setCurrentUser]
  );

  return (
    <div className="App" style={{ maxHeight: '100vh' }}>
      <Router>
        <userDetailsContext.Provider value={contextValues}>
          <searchContext.Provider value={memoizedSearchArray}>
            <dateRangeContext.Provider value={memoizedDateArray}>
              <autoSuggestContext.Provider value={memoizedAutoSuggestArray}>
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </autoSuggestContext.Provider>
              <FlightOfferContext.Provider value={{ flights, dictionaries }}>
                <FlightOfferContainer />
              </FlightOfferContext.Provider>
            </dateRangeContext.Provider>
          </searchContext.Provider>
        </userDetailsContext.Provider>
      </Router>
    </div>
  );
};

export default App;
