import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

import useGAEventTracker from "../../hooks/useGAEventsTracker";

import "./header.scss";
import { useSelector } from "react-redux";


const Header = () => {
  const navigate = useNavigate();
  const GAEventTracker = useGAEventTracker("Auth");
  const { user } = useSelector((state) => state.userReducer);

  ReactGA.set({
    name: user?.username,
    userEmail: user?.email,
  });

  const handleLogout = () => {
    Cookies.remove("todoToken");
    GAEventTracker("Logout", "Label");
    navigate("/auth");
  };
  return (
    <div className="header">
      <a href="#default" className="logo">
        TODO APP
      </a>
      <div className="header-right">
        <a className="active" href="#!" onClick={() => handleLogout()}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
