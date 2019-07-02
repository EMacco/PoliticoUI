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

const uploadImage = (file, completionHandler) => {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dn4pokov0/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'y2xpulok';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  })
    .then(res => {
      completionHandler(true, res.data.secure_url);
    })
    .catch(err => {
      completionHandler(false, err);
    });
};

const updateProfilePicture = image => dispatch => {
  uploadImage(image, (success, url) => {
    if (success) {
      const userToken = userDetails.token;
      // Go ahead and create office
      updateUserProfilePicture(userToken, url, res => {
        // Check if it was successful
        if (res.status === 200) {
          // TODO Send the information to the server

          // TODO Update the store and stop showing 'uploading...'

          // YOU MIGHT HAVE TO REMOVE THE LOADING TEXT
          toast.success('Image uploaded');
        } else {
          // TODO Remove the uploading message
          toast.error('Error uploading image');
          dispatch({ UPDATE_PROFILE_PICTURE });
        }
      });
    }
  });
};

const fetchInterestedOffice = userDetails => dispatch => {
  axios
    .get('/offices/candidates')
    .then(res => {
      const { data } = res.data;
      for (let ind = 0; ind < data.length; ind += 1) {
        if (data[ind].candidateid === userDetails.user.id) {
          fetchOfficeDetailsByID(data[ind].officeid, res => {
            const fullData = res.data.data[0];

            // Get the number of candidates for this office
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
          });
          break;
        }
      }
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

const fetchPageVotes = ({ id }) => dispatch => {
  axios
    .get(`/office/${id}/user-votes`)
    .then(res => {
      const { dataa } = res.data;
      let votes = [];
      for (let ind = 0; ind < dataa.length; ind += 1) {
        fetchUserByID(dataa[ind].candidateid, userRes => {
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
          fetchOfficeDetailsByID(officeId, officeResp => {
            const officeRes = officeResp.data;
            officeName = officeRes.data[0].name;

            fetchPartyByID(partyId, partyResp => {
              const partyRes = partyResp.data;
              partyName = partyRes.data[0].name;
              partyLogo = partyRes.data[0].logourl;

              collateResult(officeId, resultResp => {
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
                  // Dispatch to the reduc store
                  dispatch({ type: SET_USER_VOTES, payload: votes });
                }
              });
            });
          });
        });
      }
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: { global: err.response.data.error } });
    });
};

export { updateProfilePicture, fetchInterestedOffice, fetchPageVotes };
