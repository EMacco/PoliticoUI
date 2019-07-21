import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE,
  CLEAR_DASHBOARD,
  CLEAR_PARTIES,
  CLEAR_OFFICES
} from '../actions/types';

// Set logged in user
export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

// Register user
export const registerUser = userData => dispatch => {
  axios
    .post('/auth/signup', userData)
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
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: { global: err.response.data.error }
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post('/auth/login', userData)
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
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

// Log User out
export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({ type: CLEAR_CURRENT_PROFILE });
  dispatch({ type: CLEAR_DASHBOARD });
  dispatch({ type: CLEAR_PARTIES });
  dispatch({ type: CLEAR_OFFICES });
  if (history) history.push('/');
  else window.location.href = '/';
};
