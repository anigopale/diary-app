import { combineReducers } from 'redux';
import passwordStatusReducer from './password-status-reducer';

const rootReducer = combineReducers({
  passSet: passwordStatusReducer
});

export default rootReducer;
