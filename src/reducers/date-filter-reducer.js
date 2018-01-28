import { SET_FILTER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
      break;
  }
  return state;
}
