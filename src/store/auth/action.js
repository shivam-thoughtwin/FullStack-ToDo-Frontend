import Cookies from "js-cookie";
import { authTypes } from "./types";
import { Post } from "../../utils/apiServices";
import { toast } from "react-toastify";

export const loginUser = (values, navigate, track) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.LOGIN_REQUEST });
    const res = await Post("/login", values);
    dispatch({ type: authTypes.LOGIN_FINISH });
    Cookies.set("todoToken", res.data.token);
    toast.success(res.data.msg);
    track('Login', 'label');
    navigate("/");
  } catch (err) {
    dispatch({ type: authTypes.LOGIN_FAIL });
    track('Login failed', 'label');
  }
};

export const registerUser = (values, navigate, track) => async (dispatch) => {
  try {
    dispatch({ type: authTypes.SIGNUP_REQUEST });
    const res = await Post("/create-user", values);
    dispatch({ type: authTypes.LOGIN_FINISH });
    Cookies.set("todoToken", res.data.token);
    toast.success(res.data.msg);
    track('Signup', 'label');
    navigate("/");
  } catch (err) {
    dispatch({ type: authTypes.SIGNUP_FAIL });
    track('Signup failed', 'label');
  }
};
