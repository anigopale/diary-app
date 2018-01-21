import { combineReducers } from 'redux';
import user from './user-reducer';
import password from './password-reducer';

const rootReducer = combineReducers({
  user: user,
  key: password
});

export default rootReducer;
