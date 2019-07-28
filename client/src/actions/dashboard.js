import axios from 'axios';
import { toast } from 'react-toastify';
import {
  UPDATE_PROFILE_PICTURE,
  SET_INTERESTED_OFFICE,
  GET_ERRORS,
  SET_USER_VOTES
} from '@actions/types';
import { fetchOfficeDetailsByID, collateResult } from './office';
import { fetchUserByID } from './user';
import { fetchPartyByID } from './party';

const fetchInterestedOffice = userDetails => async dispatch => {
  try {
    const { data } = (await axios.get('/offices/candidates')).data;
    for (let ind = 0; ind < data.length; ind += 1) {
      if (data[ind].candidateid === userDetails.user.id) {
        const fullData = (await fetchOfficeDetailsByID(data[ind].officeid)).data.data[0];
        let numberOfCandidates = 0;
        for (let ind2 = 0; ind2 < data.length; ind2 += 1) {
          if (data[ind2].officeid === data[ind].officeid) {
            numberOfCandidates += 1;
          }
        }

        let electionDate = data[ind].date;
        if (!electionDate) {
          electionDate = 'Not set';
        } else {
          electionDate = new Date(electionDate).toDateString();
        }
        const payload = {
          image: fullData.logourl,
          officeId: fullData.id,
          officeName: fullData.name,
          numberOfCandidates,
          electionDate
        };

        dispatch({ type: SET_INTERESTED_OFFICE, payload });
        break;
      }
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

const fetchPageVotes = ({ id }) => async dispatch => {
  try {
    const { dataa } = (await axios.get(`/office/${id}/user-votes`)).data;
    let votes = [];
    for (let ind = 0; ind < dataa.length; ind += 1) {
      const userRes = await fetchUserByID(dataa[ind].candidateid);
      const userDets = userRes.data;
      const name = `${userDets.data[0].firstname} ${userDets.data[0].lastname}`;
      const officeId = dataa[ind].officeid;
      const partyId = userDets.data[0].partyid;
      const myCandidateId = dataa[ind].candidateid;
      let officeName = '';
      let partyName = '';
      let partyLogo = '';
      let result = 0;
      let resultStyle = 'won';
      let resultString = 'won';
      const officeResp = await fetchOfficeDetailsByID(officeId);
      const officeRes = officeResp.data;
      officeName = officeRes.data[0].name;
      
      const partyResp = await fetchPartyByID(partyId);
      const partyRes = partyResp.data;
      partyName = partyRes.data[0].name;
      partyLogo = partyRes.data[0].logourl;
      
      const resultResp = await collateResult(officeId);
      const resultRes = resultResp.data;
      let winningCandidate;
      let winningCandidateVote = 0;
      for (let rInd = 0; rInd < resultRes.data.length; rInd += 1) {
        if (resultRes.data[rInd].candidateid === myCandidateId) {
          result = resultRes.data[rInd].count;
        }

        if (resultRes.data[rInd].count > winningCandidateVote) {
          winningCandidate = resultRes.data[rInd].candidateid;
          winningCandidateVote = resultRes.data[rInd].count;
        }

        if (winningCandidate === myCandidateId) {
          resultStyle = 'won';
          resultString = 'won';
        } else {
          resultStyle = 'lost';
          resultString = 'lost';
        }

        const today = new Date().toDateString();
        const elecDate = new Date(dataa[ind].createdon).toDateString();
        if (today === elecDate) {
          if (resultString === 'won') {
            resultString = 'wining';
          } else if (resultString === 'lost') {
            resultString = 'losing';
          }
        }
      }

      const votesObject = {
        partyLogo,
        name,
        partyName,
        officeName,
        result,
        resultStyle,
        resultString
      };
      votes.push(votesObject);
      if (ind === dataa.length - 1) {
        dispatch({ type: SET_USER_VOTES, payload: votes });
      }
    }
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
  }
};

export { fetchInterestedOffice, fetchPageVotes };
