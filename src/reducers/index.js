import { combineReducers } from "redux";
import faceReducer from "./faceReducer";
import socketReducer from "./socketReducer";

const rootReducer = combineReducers({
  face: faceReducer,
  socket: socketReducer

});

export default rootReducer;
