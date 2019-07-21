import axios from 'axios';
import { GET_ERRORS, SET_POLITICAL_PARTIES } from '@actions/types';
import { setCurrentUser } from '@actions/authActions';
import setAuthToken from '../utils/setAuthToken';

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

const fetchAllParties = completionHandler => {
  axios
    .get(`/parties`)
    .then(res => {
      completionHandler(res);
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

const changeUserParty = partyId => dispatch => {
  axios
    .post(`/parties/join`, { partyId })
    .then(res => {
      const { token, user } = res.data.data[0];
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

const fetchPoliticalParties = partyid => dispatch => {
  let parties = [];
  fetchAllParties(partiesRes => {
    const { data } = partiesRes.data;

    for (let ind = 0; ind < data.length; ind += 1) {
      const partyObject = {
        partyId: data[ind].id,
        partyLogo: data[ind].logourl,
        partyName: data[ind].name,
        hqAddress: data[ind].hqaddress
      };

      parties.push(partyObject);
      if (ind === data.length - 1) {
        dispatch({ type: SET_POLITICAL_PARTIES, payload: parties });
      }
    }
  });
};

export { fetchPartyByID, fetchAllParties, fetchPoliticalParties, changeUserParty };
