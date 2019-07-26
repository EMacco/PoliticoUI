import axios from 'axios';
import { GET_ERRORS, SET_POLITICAL_PARTIES } from '@actions/types';
import { setCurrentUser } from '@actions/authActions';
import setAuthToken from '../utils/setAuthToken';

const fetchPartyByID = async id => {
  try {
    return await axios.get(`/parties/${id}`);
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchAllParties = async () => {
  try {
    return await axios.get(`/parties`);
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const changeUserParty = partyId => async dispatch => {
  try {
    const { token, user } = (await axios.post(`/parties/join`, { partyId })).data.data[0];
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(user));
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchPoliticalParties = () => async dispatch => {
  let parties = [];
  try {
    const partiesRes = await fetchAllParties();
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
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

export { fetchPartyByID, fetchAllParties, fetchPoliticalParties, changeUserParty };
