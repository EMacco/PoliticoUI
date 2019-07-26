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

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const registerUser = userData => async dispatch => {
  try {
    const response = (await axios.post('/auth/signup', userData)).data.data[0];
    const { token } = response;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const { user } = response;
    dispatch(setCurrentUser(user));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: { global: err.response.data.error }
    });
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const response = (await axios.post('/auth/login', userData)).data.data[0];
    const { token } = response;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const { user } = response;
    dispatch(setCurrentUser(user));
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

// Log User out
export const logoutUser = history => dispatch => {
  dispatch(setCurrentUser({}));
  dispatch({ type: CLEAR_CURRENT_PROFILE });
  dispatch({ type: CLEAR_DASHBOARD });
  dispatch({ type: CLEAR_PARTIES });
  dispatch({ type: CLEAR_OFFICES });
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  if (history) history.push('/');
  else window.location.href = '/';
};
