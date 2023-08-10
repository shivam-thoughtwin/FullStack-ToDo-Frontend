import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { registerUser } from "../../store/auth/action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faSpinner,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import "../../pages/AuthPage/auth.scss";
import useGAEventTracker from "../../hooks/useGAEventsTracker";

const signupSchema = Yup.object({
  username: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email formate").required("Email required"),
  password: Yup.string()
    .required("Password required")
    .min(8, "Minimum 8 characters"),
});

const SignupForm = () => {
  const [visible, setVisible] = useState(false);

  const { isLoading } = useSelector((state) => state.authReducer);
  const GAEventTracker = useGAEventTracker("Auth");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
      },
      validationSchema: signupSchema,
      onSubmit(values) {
        dispatch(registerUser(values, navigate, GAEventTracker));
      },
    });
  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <h2 className="title">Sign up</h2>

      <div
        className={
          errors.username && touched.username
            ? "err-input-field"
            : "input-field"
        }
      >
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          type="text"
          name="username"
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          placeholder={
            errors.username && touched.username ? errors.username : "Username"
          }
        />
      </div>

      <div
        className={
          errors.email && touched.email ? "err-input-field" : "input-field"
        }
      >
        <span>
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          type="email"
          name="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          placeholder={errors.email && touched.email ? errors.email : "Email"}
        />
      </div>

      <div
        className={
          errors.password && touched.password
            ? "err-input-field"
            : "input-field"
        }
      >
        <span>
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type={visible ? "text" : "password"}
          name="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          autoComplete="off"
          placeholder={
            errors.password && touched.password ? errors.password : "Password"
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

      <button type="submit" className="btn solid">
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        ) : (
          "Sign up"
        )}
      </button>

      <p className="social-text">Or sign up with Google</p>

      <div className="social-media">
        <a href="#!" className="social-icon">
          <FontAwesomeIcon icon={faGoogle} />
        </a>
      </div>
    </form>
  );
};

export default SignupForm;
