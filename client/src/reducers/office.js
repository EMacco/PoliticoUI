import { SET_GOVERNMENT_OFFICES, CLEAR_OFFICES } from '../actions/types';

const initialState = {
  offices: []
};

const officeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GOVERNMENT_OFFICES:
      return { ...state, offices: action.payload };
    case CLEAR_OFFICES:
      return { ...state, offices: [] };
    default:
      return state;
  }
};

export default officeReducer;
