import { SET_FILTER, LOGOUT, DELETE_DATE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
      break;
    case DELETE_DATE:
      return {};
      break;
    case LOGOUT:
      return {};
      break;
  }
  return state;
}
