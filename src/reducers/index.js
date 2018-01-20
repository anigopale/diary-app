import { combineReducers } from 'redux';
import passwordStatusReducer from './password-status-reducer';
import loginStatusReducer from './login-status-reducer';
import user from './user-reducer';

const rootReducer = combineReducers({
  passSet: passwordStatusReducer,
  login: loginStatusReducer,
  user: user
});

export default rootReducer;
