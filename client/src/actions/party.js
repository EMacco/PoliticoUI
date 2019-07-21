import axios from 'axios';
import { GET_ERRORS } from '@actions/types';

const fetchPartyByID = (id, completionHandler) => {
  axios
    .get(`/parties/${id}`)
    .then(res => {
      completionHandler(res);
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

export { fetchPartyByID };
