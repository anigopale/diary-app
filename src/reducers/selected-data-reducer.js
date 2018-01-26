import { SELECT_DATA } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_DATA:
      return action.payload;
  }
  return state
}
