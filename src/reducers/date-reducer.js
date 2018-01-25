import { SET_DATE } from '../actions/types';

export default function(state = {}, action) {
  console.log("date reducer,",action.payload);
  switch (action.type) {
    case SET_DATE:
      return action.payload;
      break;
  }
  return state;
}
