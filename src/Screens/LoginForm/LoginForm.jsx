import React from "react";
import { Formik } from "formik";
// import toast from "react-toast-notification";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginUser } from "../../actions";

// import * as Yup from "yup";
import "./LoginForm.scss";

const LoginForm = () => {
  const history = useHistory();
  const { path_name } = useSelector((state) => state.UserLoggedIn);
  if (path_name) {
    history.push(path_name);
  }
  const initialValues = {
    email: "",
    password: "",
  };

  //   const validationSchema = Yup.object().shape({
  //     email: Yup.string().email("Invalid email address").required("Required"),
  //     password: Yup.string().required("Required"),
  //   });

  const validate = (values) => {
    let errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Name is required";
    }
    // else if (!regex.test(values.email)) {
    //   errors.email = "Invalid Email";
    // }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };
  const dispatch = useDispatch();

  const submitForm = (values) => {
    console.log(values);
    // toast.info("Processing ...");
    const data = {
      email: values.email,
      password: values.password,
      history,
    };
    dispatch(loginUser(data));
  };

  return (
    <div className="align">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submitForm}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty,
          } = formik;
          return (
            <div className="grid">
              <div className="register">
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit} className="form">
                  <div className="form__field">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  </div>
                  <div className="form__field">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <span className="error">{errors.password}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                    disabled={!(dirty && isValid)}
                  >
                    Sign In
                  </button>
                  {/* <div class="form__field">
                    <input type="submit" value="Sign In" />
                  </div> */}
                </form>
                <p>Enter Credential to Proceed</p>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default compose(withRouter, connect(null, { loginUser }))(LoginForm);
