import axios from 'axios';
import { GET_ERRORS, SET_GOVERNMENT_OFFICES } from '@actions/types';
import { extractCandidateInfoFromOffice, checkIfUserExpressedInterest } from '../utils/offices';

const fetchOfficeDetailsByID = async id => {
  try {
    return await axios.get(`/offices/${id}`);
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchAllOffices = async () => {
  try {
    return (await axios.get('/offices')).data.data;
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchOfficeCandidates = async () => {
  try {
    return (await axios.get('/offices/candidates')).data.data;
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchAllInterests = async () => {
  try {
    return (await axios.get('/offices/interests')).data.data;
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const collateResult = async id => {
  try {
    return await axios.post(`/office/${id}/result`);
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const expressInterest = (partyId, officeId) => async dispatch => {
  try {
    const response = await axios.post('/offices/interests', { partyId, officeId });
    window.location.reload();
  } catch (err) {
    console.log(err.response);
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchGovernmentOffices = userId => async dispatch => {
  try {
    const officeData = await fetchAllOffices();
    const candidates = await fetchOfficeCandidates();
    const interests = await fetchAllInterests();
    const offices = [];
    let alreadyApplied = false;

    for (let ind = 0; ind < officeData.length; ind += 1) {
      const { isCandidate } = extractCandidateInfoFromOffice(
        candidates,
        officeData[ind].id,
        userId
      );
      const isInterested = checkIfUserExpressedInterest(interests, officeData[ind].id, userId);

      if (isCandidate || isInterested) {
        alreadyApplied = true;
        break;
      }
    }

    for (let ind = 0; ind < officeData.length; ind += 1) {
      let candidateStatus = '';
      let officeBtn = 'add-party-btn';
      const { count, isCandidate, electionDate } = extractCandidateInfoFromOffice(
        candidates,
        officeData[ind].id,
        userId
      );

      const isInterested = checkIfUserExpressedInterest(interests, officeData[ind].id, userId);

      if (isCandidate) {
        candidateStatus = 'Approved candidate';
        officeBtn = 'casted-vote';
      } else if (isInterested) {
        candidateStatus = 'Awaiting approval';
        officeBtn = 'pending-vote';
      } else {
        candidateStatus = 'Express Interest';
        officeBtn = 'add-party-btn';
      }
      let electionDateString = new Date(electionDate).toDateString();
      if (electionDate === 'Not set') {
        electionDateString = 'Not set';
      }

      const { id, logourl, name, type } = officeData[ind];

      const officeObject = {
        officeId: id,
        officeLogo: logourl,
        officeName: name,
        officeType: type,
        electionDate: electionDateString,
        count,
        candidateStatus,
        officeBtn,
        alreadyApplied
      };

      offices.push(officeObject);
      if (ind === officeData.length - 1) {
        dispatch({ type: SET_GOVERNMENT_OFFICES, payload: offices });
      }
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

export { fetchOfficeDetailsByID, collateResult, fetchGovernmentOffices, expressInterest };
