import { SELECT_DATA, DELETE_SELECTED, LOGOUT } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_DATA:
      return action.payload;
    break;
    case DELETE_SELECTED:
      return {};
    break;
    case LOGOUT:
      return {};
      break;
  }
  return state;
}
