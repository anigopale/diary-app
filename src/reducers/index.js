import { combineReducers } from 'redux';
import user from './user-reducer';
import auth from './auth-reducer';
import date from './date-reducer';
import data from './data-reducer';

const rootReducer = combineReducers({
  user,
  loggedin: auth,
  date,
  data
});

export default rootReducer;
