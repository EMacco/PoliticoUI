import axios from 'axios';

axios.defaults.baseURL = 'https://politico-okwara.herokuapp.com/api/v1';

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    // Delete the axios deader
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
