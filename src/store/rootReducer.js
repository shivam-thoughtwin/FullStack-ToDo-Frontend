import { combineReducers } from "redux";

import { authReducer } from "./auth/reducer";
import { userReducer } from "./user/reducer";
import { todoReducer } from "./todo/reducer";

export default combineReducers({
  authReducer,
  userReducer,
  todoReducer,
});
