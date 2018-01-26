import { FETCH_DATA } from '../actions/types';

export default function(state = [], action) {
  console.log("inside data reducer",action.payload);
  switch (action.type) {
    case FETCH_DATA:
      return action.payload
      break;
  }
  return state;
}
