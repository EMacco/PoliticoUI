const extractCandidateInfoFromOffice = (candidates, officeId, userId) => {
  let count = 0;
  let isCandidate = false;
  let electionDate = 'Not set';

  for (let ind = 0; ind < candidates.length; ind += 1) {
    if (candidates[ind].officeid === officeId) {
      if (
        candidates[ind].candidateid === userId &&
        officeId === candidates[ind].officeid
      ) {
        isCandidate = true;
      }

      if (candidates[ind].date) {
        electionDate = candidates[ind].date;
      }
      count += 1;
    }
  }

  return { count, isCandidate, electionDate };
};

const checkIfUserExpressedInterest = (interests, officeId, userId) => {
  let isInterested = false;
  for (let ind = 0; ind < interests.length; ind += 1) {
    // Check if current user has expressed interest
    if (
      interests[ind].candidateid === userId &&
      officeId === interests[ind].officeid
    ) {
      isInterested = true;
    }
  }
  return isInterested;
};

export { extractCandidateInfoFromOffice, checkIfUserExpressedInterest };