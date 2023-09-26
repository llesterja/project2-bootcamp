import axios from 'axios';

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
