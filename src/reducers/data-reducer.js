import { FETCH_DATA } from '../actions/types';

export function(state = [], action) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload
      break;
  }
  return state;
}
