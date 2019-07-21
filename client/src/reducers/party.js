import { SET_POLITICAL_PARTIES } from '../actions/types';

const initialState = {
  parties: []
};

const partyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POLITICAL_PARTIES:
      return { ...state, parties: action.payload };
    default:
      return state;
  }
};

export default partyReducer;
