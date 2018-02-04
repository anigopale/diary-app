import { GOOGLE_SIGNIN, LOGOUT } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case GOOGLE_SIGNIN:
      return true;
      break;
    case LOGOUT:
      return false;
      break;
  }
  return state;
}
