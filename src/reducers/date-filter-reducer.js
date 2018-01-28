import { SET_FILTER, LOGOUT, DELETE_FILTER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
      break;
    case DELETE_FILTER:
      return {};
      break;
    case LOGOUT:
      return {};
      break;
  }
  return state;
}
