import { SET_PASS,RESET_APP } from '../actions/types';

export default function (state=false, action) {
  switch (action.type) {
    case SET_PASS:
      return true;
    case RESET_APP:
      return false;
  }
  return state;
}
