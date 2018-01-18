import { USER_LOGIN, USER_LOGOUT } from '../actions/types';

export default function(state=false, action) {
  switch (action.type) {
    case USER_LOGIN:
      return true;
    case USER_LOGOUT:
      return false;
  }
  return state;
}
