import React, { useState } from "react";

import auth from "../../assets/svg/auth.svg";
import auth2 from "../../assets/svg/auth2.svg";

import "./auth.scss";
import SignupForm from "../../components/SignupForm/SignupForm";
import LoginForm from "../../components/LoginForm/LoginForm";

const Auth = () => {
  const [togglePanel, setTogglePanel] = useState(true);

  return (
    <div className={togglePanel ? "container" : "container sign-up-mode"}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In */}
          <LoginForm />

          {/* Sign Up */}
          <SignupForm />
        </div>
      </div>

      <div className="panels-container">
        {/* Left Panel */}
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Logged in users can access the benefits of our website resources.
              You can manage your daily routine and done your work on time.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setTogglePanel((prev) => !prev)}
            >
              Sign up
            </button>
          </div>

          <img src={auth} alt="..." className="image" />
        </div>

        {/* Right Panel  */}
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Logged in users can access the benefits of our website resources.
              You can manage your daily routine and done your work on time.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setTogglePanel((prev) => !prev)}
            >
              Sign in
            </button>
          </div>

          <img src={auth2} alt="..." className="image" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
