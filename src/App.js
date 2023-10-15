import { Routes, Route } from 'react-router-dom';
import React, { useState, useRef, useMemo } from 'react';
import './CSS/App.css';
import getAuth from './utils/UseAuthAmadeus';
import searchContext from './utils/SearchContext';
import dateRangeContext from './utils/dateRangeContext';
import autoSuggestContext from './utils/autoSuggestContext';
import axios from 'axios';
import FlightOfferContainer from './components/Organisms/FlightOffersContainer';
import FlightOfferContext from './utils/FlightOfferContext';
import HomePage from './pages/HomePage/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import FlightDisplayPage from './pages/FlightsDisplayPage/index';
import { userDetailsContext } from './utils/userDetailsContext';
import Dashboard from './pages/Dashboard';
import './CSS/SearchBar.css';
import SurpriseMePage from './pages/SupriseMe';
import NavbarLoggedIn from './components/Molecules/NavbarLoggedIn';
import NavbarLoggedOut from './components/Molecules/NavbarLoggedOut';
import loggedInContext from './utils/loggedInContext';
import Profile from './pages/Profile';

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
  const [loading, setLoading] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState('');
  const [passengerInfoState, setPassengerInfoState] = useState({
    selectedOption: 'First Class',
    adultCounterValue: 0,
    childCounterValue: 0,
  });
  const [departureQuery, setDepartureQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navbarComponent = isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />;
  const routes = [
    {
      path: '/',
      element: (
        <>
          {navbarComponent}
          <HomePage />
        </>
      ),
    },
    {
      path: '/Login',
      element: <Login />,
    },
    {
      path: '/Dashboard',
      element: (
        <>
          {navbarComponent}
          <Dashboard />
        </>
      ),
    },
    {
      path: '/FlightDisplayPage',
      element: (
        <>
          {navbarComponent}
          <FlightDisplayPage />
        </>
      ),
    },
    {
      path: '/Register',
      element: <Register />,
    },
    {
      path: '/SurpriseMe',
      element: (
        <>
          {navbarComponent}
          <SurpriseMePage />
        </>
      ),
    },

    {
      path: '/profile',
      element: (
        <>
          {navbarComponent}
          <Profile />
        </>
      ),
    },
  ];

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

  const memoizedLogIn = useMemo(
    () => [isLoggedIn, setIsLoggedIn, profileImageURL, setProfileImageURL],
    [isLoggedIn, setIsLoggedIn, profileImageURL, setProfileImageURL]
  );

  return (
    <div className="App" style={{ maxHeight: '100vh' }}>
      <loggedInContext.Provider value={memoizedLogIn}>
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
      </loggedInContext.Provider>
    </div>
  );
};

export default App;
