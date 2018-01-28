import { SET_DATE, DELETE_DATE, LOGOUT } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_DATE:
      return action.payload;
      break;
    case DELETE_DATE:
      return {}
      break;
    case LOGOUT:
        return {};
        break;
  }
  return state;
}
