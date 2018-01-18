import { SET_PASS,RESET_APP } from '../actions/types';

export default function (state=false, action) {
  switch (action.type) {
    case SET_PASS:
      return action.payload;
    case RESET_APP:
      return action.payload;
  }
  return state;
}
