import { LOGIN, LOGOUT } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case LOGIN:
      return true;
      break;
    case LOGOUT:
      return false;
      break;
  }
  return state;
}
