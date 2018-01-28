import { SELECT_DATA, DELETE_SELECTED } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_DATA:
      return action.payload;
    break;
    case DELETE_SELECTED:
      return {};
  }
  return state;
}
