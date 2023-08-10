import { authTypes } from "./types";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case authTypes.LOGIN_FINISH:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        error: null,
      };
    case authTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        error: action.payload,
      };
      case authTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case authTypes.SIGNUP_FINISH:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        error: null,
      };
    case authTypes.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
