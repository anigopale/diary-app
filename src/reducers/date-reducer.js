import { SET_DATE, DELETE_DATE } from '../actions/types';

export default function(state = {}, action) {
  console.log(action.payload);
  switch (action.type) {
    case SET_DATE:
      return action.payload;
      break;
    case DELETE_DATE:
      return {}
      break;
  }
  return state;
}
