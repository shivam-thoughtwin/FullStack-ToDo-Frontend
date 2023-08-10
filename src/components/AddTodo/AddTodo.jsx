import React, { useEffect, useState, useRef } from "react";
import { FaPlus, FaPen, FaTrashAlt, FaCheck } from "react-icons/fa";
import "./AddTodo.scss";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user/action";
import {
  addTodos,
  completeTodo,
  deleteAllTodos,
  deleteSingleTodo,
  editTodo,
  getAllTodos,
} from "../../store/todo/action";
import swal from "sweetalert";
import Tooltip from "@mui/material/Tooltip";
import useGAEventTracker from "../../hooks/useGAEventsTracker";

function AddTodo() {
  const [id, setId] = useState("");
  const [todo, setTodo] = useState("");
  const [isAddClick, setIsAddClick] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);

  const GAEventTracker = useGAEventTracker("Editing");

  const plusRef = useRef();

  const { user } = useSelector((state) => state.userReducer);
  const { allTodos } = useSelector((state) => state.todoReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTodos());
  }, [isAddClick, dispatch]);

  const handleAddTodo = async () => {
    dispatch(addTodos({ todo }, GAEventTracker));
    setIsAddClick(!isAddClick);
    setTodo("");
  };

  const handleDeleteTodo = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this todo!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSingleTodo(id, GAEventTracker));
        setIsAddClick(!isAddClick);
      }
    });
  };

  const handleEditTodo = async () => {
    const body = {
      todo,
      id,
    };
    dispatch(editTodo(body));
    setTodo("");
    setIsAddClick(!isAddClick);
    setIsEditClick(false);
  };

  const handleEditClick = (toDo, id) => {
    setTodo(toDo);
    setId(id);
    setIsEditClick(true);
  };

  const handleDeleteAllTodos = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your todos!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAllTodos());
        setIsAddClick(!isAddClick);
      }
    });
  };

  const handleCompleteClick = (id) => {
    dispatch(completeTodo({ id }));
    setIsAddClick(!isAddClick);
  };

  const handleKeyPress = (e) => {
    if (todo.length > 0) {
      if (e.key === "Enter") {
        plusRef.current.click();
      }
    } else {
      setIsEditClick(false);
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <header>
          <span>{user?.username}'s todo list</span>
        </header>
        <div className="inputField">
          <input
            type="text"
            value={todo}
            placeholder="Add your new todo"
            onChange={(e) => setTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button
            onClick={isEditClick ? handleEditTodo : handleAddTodo}
            disabled={todo.length > 0 ? false : true}
            ref={plusRef}
          >
            <FaPlus />
          </button>
        </div>
        <ul className="todoList">
          {allTodos?.map((obj, idx) => {
            return (
              <li key={idx}>
                {obj?.isCompleted ? <del>{obj.todo}</del> : obj.todo}
                {!obj?.isCompleted && (
                  <Tooltip title="Complete" placement="top">
                    <span
                      className="completed"
                      onClick={() => handleCompleteClick(obj._id)}
                    >
                      <FaCheck />
                    </span>
                  </Tooltip>
                )}

                {!obj?.isCompleted && (
                  <Tooltip title="Update" placement="top">
                    <span
                      className="update"
                      onClick={() => handleEditClick(obj.todo, obj._id)}
                    >
                      <FaPen />
                    </span>
                  </Tooltip>
                )}

                <Tooltip title="Delete" placement="top">
                  <span
                    className="delete"
                    onClick={() => handleDeleteTodo(obj._id)}
                  >
                    <FaTrashAlt />
                  </span>
                </Tooltip>
              </li>
            );
          })}
        </ul>
        <div className="footer">
          <span>
            You have{" "}
            <b>{allTodos.filter((obj) => !obj?.isCompleted)?.length}</b> pending{" "}
            {allTodos.filter((obj) => !obj?.isCompleted)?.length > 1
              ? "tasks"
              : "task"}
          </span>
          <button
            onClick={handleDeleteAllTodos}
            disabled={!(allTodos?.length > 0)}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTodo;
