import React, { useState, useMemo } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import countryList from "react-select-country-list";

const Banner = () => {
  const [socialModal, setSocialModal] = useState(false);
  const [signLoader, setsignLoader] = useState(false);


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

  // const changeHandler = (e) => {
  //   setValue(e);
  //   e.name = "countryName";
  //   setInputField({ ...inputField, [e.name]: e.label });
  // };

  // const inputsHandler = (e) => {
  //   e.name = "";
  //   setInputField({ ...inputField, [e.target.name]: e.target.value });
  // };

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

    console.log(errors);
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
    <section className="banner-bg">
      
      <Modal
        show={socialModal}
        onHide={() => setSocialModal(false)}
        size="md"
        id="betaModal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

      {signLoader &&
          <div className="sign-up-loader">
            <div className="loader-box">
              <img className="img-fluid" src="images/virtu_progressloader.gif" alt="" />
              <p>VIRTU</p>
           </div>
        </div>
      }
      
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
          <div className="col-md-12 banner-info">
            <h1>
              Welcome to <br /> virtu
            </h1>
            <p>
            Join the world's first virtual nation powered by an ethical and{" "}
              <br /> a kinder social network for a better and refined virtuous world
            </p>
            <button
              // type="submit"
              className="btn"
              onClick={() => {
                setSocialModal(true);
              }}
            >
              Sign up for beta
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      {/* <div
        className="modal fade"
        id="betaModal"
        tabIndex="-1"
        aria-labelledby="betaModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <img src="images/close-icon.png" alt="" />
                </span>
              </button>
            </div>
            <div className="modal-body app-download-icons">
              <a
                href="https://play.google.com/store/apps/details?id=com.evolve.virtu"
                target="_blank"
                rel="noreferrer"
              >
                <img className="img-fluid" src="images/andriod.png" alt="" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.evolve.virtu"
                target="_blank"
                rel="noreferrer"
              >
                <img className="img-fluid" src="images/ios.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- Modal --> */}
    </section>
  );
};
export default Banner;
