import { combineReducers } from 'redux';
import user from './user-reducer';
import auth from './auth-reducer';

const rootReducer = combineReducers({
  user: user,
  loggedin: auth
});

export default rootReducer;
