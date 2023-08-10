import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { loginUser } from "../../store/auth/action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faSpinner,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import "../../pages/AuthPage/auth.scss";
import useGAEventTracker from "../../hooks/useGAEventsTracker";

const validationSchema = Yup.object({
  logEmail: Yup.string()
    .email("Invalid email formate")
    .required("Email required"),
  logPassword: Yup.string()
    .required("Password required")
    .min(8, "Minimum 8 characters"),
});

const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const GAEventTracker = useGAEventTracker("Auth");

  const { isLoading } = useSelector((state) => state.authReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        logEmail: "",
        logPassword: "",
      },

      validationSchema,
      onSubmit(values) {
        dispatch(
          loginUser(
            { email: values.logEmail, password: values.logPassword },
            navigate,
            GAEventTracker
          )
        );
      },
    });
  return (
    <form onSubmit={handleSubmit} className="sign-in-form">
      <h2 className="title">Sign in</h2>

      {/* Email */}
      <div
        className={
          errors.logEmail && touched.logEmail
            ? "err-input-field"
            : "input-field"
        }
      >
        <span>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          type="email"
          name="logEmail"
          value={values.logEmail}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          placeholder={
            errors.logEmail && touched.logEmail ? errors.logEmail : "Email"
          }
        />
      </div>

      {/* Password  */}
      <div
        className={
          errors.logPassword && touched.logPassword
            ? "err-input-field"
            : "input-field"
        }
      >
        <span>
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type={visible ? "text" : "password"}
          name="logPassword"
          value={values.logPassword}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          placeholder={
            errors.logPassword && touched.logPassword
              ? errors.logPassword
              : "Password"
          }
        />
        <span
          className="pass_visible"
          onClick={() => setVisible((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faEye}
            style={visible ? { color: "#4481eb" } : ""}
          />
        </span>
      </div>

      {/* Button  */}
      <button type="submit" className="btn solid">
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        ) : (
          "Login"
        )}
      </button>

      <p className="social-text">Or sign in with Google</p>

      <div className="social-media">
        <a href="#!" className="social-icon">
          <FontAwesomeIcon icon={faGoogle} />
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
