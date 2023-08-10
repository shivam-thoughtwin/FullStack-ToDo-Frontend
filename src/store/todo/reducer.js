import { todoTypes } from "./types";

const initialState = {
  isLoading: false,
  allTodos: [],
  error: null,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoTypes.ADD_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case todoTypes.ADD_TODO_FINISH:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case todoTypes.ADD_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        allTodos: null,
        error: action.payload,
      };

    case todoTypes.GET_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case todoTypes.GET_TODO_FINISH:
      return {
        ...state,
        isLoading: false,
        allTodos: action.payload,
        error: null,
      };
    case todoTypes.GET_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        allTodos: null,
        error: action.payload,
      };

    case todoTypes.EDIT_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case todoTypes.EDIT_TODO_FINISH:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case todoTypes.EDIT_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case todoTypes.DELETE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case todoTypes.DELETE_TODO_FINISH:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case todoTypes.DELETE_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case todoTypes.COMPLETE_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case todoTypes.COMPLETE_TODO_FINISH:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case todoTypes.COMPLETE_TODO_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
