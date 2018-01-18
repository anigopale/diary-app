import { SET_PASS } from '../actions/types';

export default function (state=false, action) {
  switch (action.type) {
    case SET_PASS:
      return true;
  }
  return state;
}
