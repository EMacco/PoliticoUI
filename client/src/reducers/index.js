import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardReducer from './dashboard';
import partiesReducer from './party';
import officesReducer from './office';

export default combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  parties: partiesReducer,
  offices: officesReducer
});
