import React, { useState, useMemo } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import countryList from "react-select-country-list";

const Footer = () => {
  const [socialModal, setSocialModal] = useState(false);
  // const [value, setValue] = useState("");
  const email_config = require("../../config");
  const [signLoader, setsignLoader] = useState(false);

  const countryData = useMemo(() => countryList().getData(), []);

  const data = {
    label: "Palestine",
    value: "PS",
  };
  var options = countryData.filter(function (el) {
    return el.label !== "Israel" && el.label !== "Palestine, State of";
  });
  options.push(data);

  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    fromEmail: "no-reply@eis.sg",
    toEmail: "wecare@virtuus.world",
    phone: "",
    countryName: "",
  });

  // const changeHandler = e => {
  //   setValue(e)
  //   e.name = "countryName";
  //   setInputField({ ...inputField, [e.name]: e.label });
  // }

  // const inputsHandler = (e) => {
  //   e.name = ""
  //   setInputField({ ...inputField, [e.target.name]: e.target.value });
  // }

  const {
    register,
    handleSubmit,
    onBlur,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const submitButton = () => {
    // Execute Loader
    setsignLoader(true);

    // e.preventDefault();
    axios
      .post(`${email_config.url}/api/emailverify/signUpForBeta`, inputField)
      .then((response) => {
        console.log(response);
        reset({
          name: "",
          email: "",
          countryName: "",
          phone: "",
        });
        document.getElementById("modal-success").innerHTML =
          "<p class='thank-you-message'>You have successfully signed up to be part of change and making an impact to our precious world.</p>";

        // Terminate Loader
        setsignLoader(false);
      })
      .catch((error) => {
        console.log(error);
        document.getElementById("modal-success").innerHTML = error;
      });
  };

  return (
    <footer className="virtu-footer">
      <Modal
        show={socialModal}
        onHide={() => setSocialModal(false)}
        size="md"
        id="betaModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {signLoader && (
          <div className="sign-up-loader">
            <div className="loader-box">
              <img
                className="img-fluid"
                src="images/virtu_progressloader.gif"
                alt=""
              />
              <p>VIRTU</p>
            </div>
          </div>
        )}

        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="app-signup-form">
            <form class="modal-form" id="modal-success">
              <h2>Sign up for beta</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name *"
                  // onChange={inputsHandler} value={inputField.name}
                  {...register("name", {
                    required: "Name is required.",
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "Enter a valid name",
                    },
                    onBlur: onBlur,
                    onChange: (e) =>
                      setInputField({ ...inputField, name: e.target.value }),
                  })}
                />
                {errors.name && (
                  <p className="text-left mt-1 field-error">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email *"
                  // onChange={inputsHandler}
                  // value={inputField.email}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid e-mail address",
                    },
                    onBlur: onBlur,
                    onChange: (e) =>
                      setInputField({ ...inputField, email: e.target.value }),
                  })}
                />
                {errors.email && (
                  <p className="text-left mt-1 field-error">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  placeholder="Phone *"
                  maxLength="15"
                  // onChange={inputsHandler}
                  // value={inputField.phone}
                  {...register("phone", {
                    required: "Phone number is required.",
                    pattern: {
                      value: /^[ 0-9 ]*$/,
                      message: "Enter a valid phone number",
                    },
                    onBlur: onBlur,
                    onChange: (e) =>
                      setInputField({ ...inputField, phone: e.target.value }),
                  })}
                />
                {errors.phone && (
                  <p className="text-left mt-1 field-error">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <Controller
                  name="countryName"
                  control={control}
                  rules={{ required: true }}
                  render={(field) => {
                    return (
                      <Select
                        placeholder="Select Country *"
                        className="country-select"
                        onChange={(e) => {
                          field.field.onChange(e.value);
                          setInputField({
                            ...inputField,
                            countryName: e.value,
                          });
                        }}
                        options={options.map((country) => ({
                          value: country.label,
                          label: country.label,
                        }))}
                      />
                    );
                  }}
                />
                {errors.countryName && (
                  <p className="text-left mt-1 field-error">
                    Please select a country.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn"
                onClick={handleSubmit(submitButton)}
              >
                Sign Up
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-md-12 signup-beta">
            <h2>Sign up for beta</h2>
            <p>
              If you want to receive monthly updates from us, pop your email in the box.
            </p>
            <form className="signup-form col-12 col-md-12 text-center">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setSocialModal(true);
                }}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="col-md-12 col-lg-12 px-0 m-auto">
            <div className="row">
              <div className="col-md-4">
                <ul className="nav social-icons">
                  <li className="nav-item">
                    <a href="#/">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#/">
                      <i class="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#/">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 text-center">
                <p className="made-with">
                  Made with{" "}
                  <img class="img-fluid" src="/images/heart.png" alt="" /> in
                  the Middle East
                </p>
              </div>
              <div className="col-md-4">
                <p className="copyright">© 2022 VIRTU. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
