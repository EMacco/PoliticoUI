import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardReducer from './dashboard';

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer
});
