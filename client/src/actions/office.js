import axios from 'axios';
import { GET_ERRORS } from '@actions/types';

const fetchOfficeDetailsByID = (id, completionHandler) => {
  axios
    .get(`/offices/${id}`)
    .then(res => {
      completionHandler(res);
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

const collateResult = (id, completionHandler) => {
  axios
    .post(`/office/${id}/result`)
    .then(res => {
      completionHandler(res);
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

export { fetchOfficeDetailsByID, collateResult };
