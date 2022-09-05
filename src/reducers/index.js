import { combineReducers } from "redux";
import UserLoggedIn from "./UserLoggedIn";
import { CausesReducer } from "./CausesReducer";
import { AdminReducer } from "./AdminReducer";

const rootReducers = combineReducers({
  UserLoggedIn,
  CausesReducer,
  AdminReducer,
});

export default rootReducers;
