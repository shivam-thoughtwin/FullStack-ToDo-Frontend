import { userTypes } from "./types";

const initialState = {
  isLoading: false,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.GET_ME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case userTypes.GET_ME_FINISH:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case userTypes.GET_ME_FAIL:
      return {
        ...state,
        isLoading: false,
        user: {},
      };
    default:
      return { ...state };
  }
};
