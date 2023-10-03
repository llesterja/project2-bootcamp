import { useState } from 'react';
import UseApi from '../utils/UseApi';

const useFlightOffersApi = (endpoint, method, parameters, authentication) => {
  const [result, setResult] = useState(null);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      UseApi(endpoint, method, parameters, authentication)
        .then((response) => {
          setResult(response);
          resolve(response);
        })
        .catch((error) => {
          // Handle the error
          reject(error);
        });
    });
  };

  return fetchData;
};

export default useFlightOffersApi;
