import { toast } from "react-toastify";
import { Delete, Get, Post, Put } from "../../utils/apiServices";
import { todoTypes } from "./types";

export const addTodos = (work, track) => async (dispatch) => {
  try {
    dispatch({ type: todoTypes.ADD_TODO_REQUEST });
    const res = await Post("/create-todo", work);
    dispatch({ type: todoTypes.ADD_TODO_FINISH });
    track('Add Todo', work.todo);
    toast.success(res.data.msg);
  } catch (err) {
    dispatch({ type: todoTypes.ADD_TODO_FAIL });
    track('Faild to add Todo', work.todo);
  }
};

export const getAllTodos = () => async (dispatch) => {
  try {
    dispatch({ type: todoTypes.GET_TODO_REQUEST });
    const res = await Get("/all-todo");
    dispatch({
      type: todoTypes.GET_TODO_FINISH,
      payload: res.data.todos,
    });
  } catch (err) {
    dispatch({ type: todoTypes.GET_TODO_FAIL });
  }
};

export const editTodo = (values) => async (dispatch) => {
  try {
    dispatch({ type: todoTypes.EDIT_TODO_REQUEST });
    const res = await Put("/edit-todo", values);
    dispatch({ type: todoTypes.ADD_TODO_FINISH });
    toast.success(res.data.msg);
  } catch (err) {
    dispatch({ type: todoTypes.EDIT_TODO_FAIL });
  }
};

export const deleteSingleTodo = (id, track) => async (dispatch) => {
  try {
    dispatch({ type: todoTypes.DELETE_TODO_REQUEST });
    const res = await Delete(`/delete-todo/${id}`);
    dispatch({ type: todoTypes.DELETE_TODO_FINISH });
    // track('Delete Todo',);
    console.log("Delete", res);
    toast.error(res.data.msg);
  } catch (err) {
    dispatch({ type: todoTypes.DELETE_TODO_FAIL });
  }
};

export const deleteAllTodos = (idArray) => async (dispatch) => {
  try {
    dispatch({ type: todoTypes.DELETE_TODO_REQUEST });
    const res = await Delete("/delete-all", idArray);
    dispatch({ type: todoTypes.DELETE_TODO_FINISH });
    toast.success(res.data.msg);
  } catch (err) {
    dispatch({ type: todoTypes.DELETE_TODO_FAIL });
  }
};

export const completeTodo = (value) => async (dispatch) => {
  try {
    dispatch({ type: todoTypes.COMPLETE_TODO_REQUEST });
    const res = await Put("/todo-complete", value);
    dispatch({ type: todoTypes.COMPLETE_TODO_FINISH });
    toast.success(res.data.msg);
  } catch (err) {
    dispatch({ type: todoTypes.COMPLETE_TODO_FAIL });
  }
};
