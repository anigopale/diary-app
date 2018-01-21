import { USER } from '../actions/types';

export default function(state="", action) {
  console.log("action reached:", action.payload);
  switch (action.type) {
    case USER:
      return action.payload;
  }
  return state;
}
