import React, { useLayoutEffect, useState, useRef, useMemo } from "react";
// import ReactDOM from "react-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import countryList from "react-select-country-list";
import angel from "../../images/angel-pop.png";
import mblAngel from "../../images/mbl-angel-pop.jpg";

<script>$(document).ready(function(){})</script>;
// const { useLayoutEffect, useEffect, useState, useRef } = React;

const Navbar = () => {
  const [socialModal, setSocialModal] = useState(false);
  const [signLoader, setsignLoader] = useState(false);
  const [angelModal, setangelModal] = useState(false);
  const ref = useRef();
  let [check] = useState(true);
  const sticky = useStickyHeader(50);
  const headerClasses = `virtu-header ${
    sticky && check ? "sticky-header fadeInDown animated" : ""
  }`;
  // const { clientHeight } = ref;

  // const checkChange = (value) => {
  //   setCheck(value);
  // };

  const toggleClass = () => {
    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("noscroll");
  };

  // const [value, setValue] = useState("");
  const email_config = require("../../config");

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

  // const submitButton = (e) => {
  //   e.preventDefault();
  //   console.log( inputField );
  // }

  return (
    <header ref={ref} className={headerClasses}>
      <Modal
        show={angelModal}
        onHide={() => setangelModal(false)}
        size="md"
        id="angelModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <div className="angel-modal">
            <div className="col-md-12 col-lg-6 p-0">
              <div className="angel-pop-image">
                <img className="img-fluid mbl-hide" src={angel} alt="" />
                <img className="img-fluid desk-hide" src={mblAngel} alt="" />
              </div>
            </div>
            <div className="col-md-12 col-lg-6 p-0 text-center">
              <div className="be-change">
                <h2>Be the change you want to</h2>
                <h2 className="see-in">see in the world.</h2>
                <p>
                  We're looking for an Angel investor and mentor to join the
                  team.
                </p>
                <p>
                  Want to help build an ethical, friendly and secure social
                  media platform for a brighter tomorrow?
                </p>
                <h4>Send us an Email at</h4>
                <Link to="">mohamed.mekki@virtuus.world</Link>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-dark px-0">
              <Link to="/" className="navbar-brand logo">
                <img className="img-fluid" src="images/logo.png" alt="logo" />
              </Link>
              <button
                className="navbar-toggler collapsed toogle-btn open-menu"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSideNav"
                aria-controls="navbarSideNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={toggleClass}
              >
                <span> </span>
                <span> </span>
                <span> </span>
              </button>
              <div
                className="collapse navbar-collapse header-menu"
                id="navbarSideNav"
              >
                <div className="close-menu">
                  <Link onClick={toggleClass}>
                    <img
                      className="img-fluid open-menu"
                      src="images/cancel.png"
                      alt="cancel"
                      data-toggle="collapse"
                      data-target="#navbarSideNav"
                      aria-controls="navbarSideNav"
                    />
                  </Link>
                </div>
                <ul className="navbar-nav ml-auto nav-menu">
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#navbarSideNav"
                    aria-controls="navbarSideNav"
                  >
                    <a className="nav-link" href="#about" onClick={toggleClass}>
                      About VIRTU
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#navbarSideNav"
                    aria-controls="navbarSideNav"
                  >
                    <a
                      className="nav-link"
                      href="#features"
                      onClick={toggleClass}
                    >
                      Features
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#navbarSideNav"
                    aria-controls="navbarSideNav"
                  >
                    <a
                      className="nav-link"
                      href="#showcase"
                      onClick={toggleClass}
                    >
                      Showcase
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#navbarSideNav"
                    aria-controls="navbarSideNav"
                  >
                    <Link
                      className="nav-link"
                      onClick={() => {
                        setangelModal(true);
                        toggleClass();
                      }}
                    >
                      Angel
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#navbarSideNav"
                    aria-controls="navbarSideNav"
                  >
                    <Link
                      className="nav-link"
                      onClick={() => {
                        setSocialModal(true);
                        toggleClass();
                      }}
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

function useStickyHeader(offset = 0) {
  const [stick, setStick] = useState(false);

  const handleScroll = () => {
    setStick(window.scrollY > offset);
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return stick;
}

export default Navbar;
