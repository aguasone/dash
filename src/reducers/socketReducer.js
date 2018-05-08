import {
  SOCKET_STATE,
} from "../actions/types";

export default function(
  state = {
    socket: {},
  },
  action
) {
  switch (action.type) {
    case SOCKET_STATE:
      return { ...state, socket: action.payload };
    default:
      return state;
  }
}
