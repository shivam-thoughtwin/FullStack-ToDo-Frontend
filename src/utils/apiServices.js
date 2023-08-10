import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { checkIsSessionExpired } from "./utils";

const apiBaseURL = process.env.REACT_APP_URL_API;

const removeUnauthorizedUser = () => {
  Cookies.remove("todoToken");
  window.location.href = "/login";
};

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("todoToken");
    config.url = `${apiBaseURL}${config.url}`;
    if (token) {
      const userInfo = jwtDecode(token);
      if (userInfo?.exp && checkIsSessionExpired(userInfo?.exp)) {
        removeUnauthorizedUser();
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { status } = await error?.response;
    switch (status) {
      case 304:
        toast.error(error.response.data.msg);
        break;
      case 401:
        removeUnauthorizedUser();
        break;
      case 403:
        toast.error("You are not allowed to do that.");
        break;
      case 409:
        toast.error(error.response.data.msg);
        break;
      case 404:
        toast.error(error.response.data.msg);
        break;
      case 500:
        toast.error("Internal Server Error");
        break;
      default:
        break;
    }
  }
);

export const Post = async (url, values) => {
  return axios.post(`${url}`, values);
};

export const Put = async (url, value) => {
  return axios.put(`${url}`, value);
};

export const Get = async (url) => {
  return axios.get(`${url}`);
};

export const Delete = async (url) => {
  return axios.delete(`${url}`);
};
