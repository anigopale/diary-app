import { SEARCH_TERM } from '../actions/types';

export default function(state = "", action) {
  switch (action.type) {
    case SEARCH_TERM:
      return action.payload
      break;

  }
  return state;
}
