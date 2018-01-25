import { combineReducers } from 'redux';
import user from './user-reducer';
import auth from './auth-reducer';
import date from './date-reducer';

const rootReducer = combineReducers({
  user: user,
  loggedin: auth,
  date: date
});

export default rootReducer;
