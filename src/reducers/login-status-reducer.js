import { USER_LOGIN } from '../actions/types';

export default function(state=false, action) {
  switch (action.type) {
    case USER_LOGIN:
      return true;
  }
  return state;
}
