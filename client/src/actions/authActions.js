import axios from 'axios';
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_CURRENT_PROFILE } from '../actions/types';

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post('https://politico-okwara.herokuapp.com/api/v1/auth/login', userData)
    .then(res => {
      const response = res.data.data[0];

      // Set token in local storage
      const { token } = response;
      localStorage.setItem('jwtToken', token);

      // Set token to auth header
      setAuthToken(token);

      // Decode to get user data
      const { user } = response;

      // Set current user
      dispatch(setCurrentUser(user));

      history.push('/userhome');
      toast.success('Login Successful');
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

// Log User out
export const logoutUser = () => dispatch => {
  // Remove the token from localhost
  localStorage.removeItem('jwtToken');

  // remove token from the header
  setAuthToken(false);

  // Remove user profile
  dispatch({ type: CLEAR_CURRENT_PROFILE });

  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
