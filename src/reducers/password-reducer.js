import { PASSWORD } from '../actions/types';

export default function(state="", action) {
  console.log(action.payload);
  switch (action.type) {
    case PASSWORD:
      return action.payload
  }
  return state
}
