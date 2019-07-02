import { SET_CURRENT_USER, GET_ERRORS, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, isAuthenticated: true, user: action.payload, errors: {} };
    case GET_ERRORS:
      return { ...state, errors: action.payload };
    case CLEAR_CURRENT_PROFILE:
      return { ...state, isAuthenticated: false, user: {} };
    default:
      return state;
  }
};

export default authReducer;
