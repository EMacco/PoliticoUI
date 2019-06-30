import { statement } from '@babel/template';

import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validations/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, isAuthenticated: true, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
