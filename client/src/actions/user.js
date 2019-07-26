import axios from 'axios';
import { GET_ERRORS } from '@actions/types';

const fetchUserByID = async id => {
  try {
    return await axios.get(`/users/${id}`);
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

export { fetchUserByID };
