import { LOGIN } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case LOGIN:
      return true;
  }
  return state;
}
