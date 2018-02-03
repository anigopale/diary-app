import { combineReducers } from 'redux';
import user from './user-reducer';
import auth from './auth-reducer';
import date from './date-reducer';
import data from './data-reducer';
import selected_data from './selected-data-reducer';
import calendar from './calendar-reducer';
import date_filter from './date-filter-reducer';
import search_term from './search-term-reducer';

const rootReducer = combineReducers({
  user,
  loggedin: auth,
  date,
  data,
  selected_data,
  calendar,
  date_filter,
  search_term
});

export default rootReducer;
