import { FETCH_DATA, LOGOUT } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload.data
      break;
    case LOGOUT:
      return [];
      break;
  }
  return state;
}
