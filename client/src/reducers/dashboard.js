import { SET_INTERESTED_OFFICE, SET_USER_VOTES, CLEAR_DASHBOARD, GET_ERRORS } from '../actions/types';

const initialState = {
  interests: {},
  votes: []
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INTERESTED_OFFICE:
      return { ...state, interests: action.payload };
    case SET_USER_VOTES:
      return { ...state, votes: action.payload };
    case CLEAR_DASHBOARD:
        return { ...state, interests: {}, votes: [] };
    default:
      return state;
  }
};

export default dashboardReducer;
