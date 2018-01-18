import { combineReducers } from 'redux';
import passwordStatusReducer from './password-status-reducer';
import loginStatusReducer from './login-status-reducer';

const rootReducer = combineReducers({
  passSet: passwordStatusReducer,
  login: loginStatusReducer
});

export default rootReducer;
