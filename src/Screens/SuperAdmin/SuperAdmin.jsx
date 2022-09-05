import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getCausesList,
  updateCauseById,
  getAllCauses,
  addCause,
  getListOfCitizens,
  addAdminToCause,
} from "../../actions";
import { Row, Col, Label, FormGroup, Input } from "reactstrap";
import "./SuperAdmin.scss";
const SuperAdmin = () => {
  const [modalShow, setModalShow] = useState(false);
  const [showAddCauseModal, setShowAddCauseModal] = useState(false);
  const [adminCauseModal, setAdminCauseModal] = useState(false);
  const [causeID, setCauseID] = useState(0);
  const [itemName, setItemName] = useState();
  const [itemDetail, setItemDetail] = useState();
  const [citizenName, setCitizenName] = useState();
  // const [selectedValue, setSelectedValue] = useState(1);
  const [image, setImage] = useState();
  // const [image1, setImage1] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCausesList());
    dispatch(getAllCauses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalShow = (item) => {
    // console.log("id", item);
    setCauseID(item.id);
    setItemName(item.causeName);
    setItemDetail(item.causeDetail);
    setModalShow(true);
  };

  const updateCause = () => {
    const data = {
      causeName: itemName,
      causeDetail: itemDetail,
    };

    dispatch(updateCauseById(data, causeID));
    setModalShow(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        console.log("base url", baseURL);
        resolve(baseURL);
        // setImage(baseURL);
      };
      // console.log("file info", fileInfo);
    });
  };

  const handleFileInputChange = (e) => {
    // setImage(e.target.value);

    getBase64(e.target.files[0])
      .then((result) => {
        const str = result.replaceAll("data:image/jpeg;base64,", "");
        setImage(str);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // image?.replace("data:image/jpeg;base64,", "");
  console.log("change", image);
  const submitForm = (values) => {
    // toast.info("Processing ...");
    // just an example
    const data = {
      causeTypeId: values.causeType,
      causeName: values.causeName,
      causeDetail: values.cuaseDetail,
      causeColor: values.causeColor,
      causeIconUrl: image,
    };
    dispatch(addCause(data));
    setShowAddCauseModal(false);
  };

  const handleSearch = () => {
    console.log("citizenName", citizenName);
    const data = {
      citizenName: citizenName,
    };
    dispatch(getListOfCitizens(data));
    document.getElementById("browser").value = "";
  };

  const handleAddAdminToCause = (values) => {
    const result = listOfCitizens?.filter((data) => data.email === citizenName);
    const citizen = result[0];

    const data = {
      causeId: values.closeCause,
      citizenProfileId: citizen.citizenId,
      citizenName: citizen.citizenName,
      email: citizen.email,
    };

    dispatch(addAdminToCause(data));
    setAdminCauseModal(false);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    history.push("/");
    console.log("logout clear");
  };
  const { causesData } = useSelector((state) => state.CausesReducer);
  const { causeTypeData } = useSelector((state) => state.CausesReducer);
  const { listOfCitizens } = useSelector((state) => state.CausesReducer);
  const { userData } = useSelector((state) => state.UserLoggedIn);

  console.log("listOfCitizens", listOfCitizens);
  console.log("citizenName", citizenName);
  console.log("file info", image);
  console.log("userData", userData);

  const initialValues = {
    causeType: "",
    causeName: "",
    cuaseDetail: "",
    causeColor: "",
    causeIcon: "",
  };

  const validate = (values) => {
    let errors = {};
    if (!values.causeType) {
      errors.causeType = "Type is required";
    }
    if (!values.causeName) {
      errors.causeName = "Name is required";
    }
    if (!values.cuaseDetail) {
      errors.cuaseDetail = "Detail is required";
    }
    if (!values.causeColor) {
      errors.causeColor = "Color is required";
    }
    if (!values.causeIcon) {
      errors.causeIcon = "Icon is required";
    }

    return errors;
  };
  const initialValues1 = {
    closeCause: "",
    citizenEmail: "",
  };

  const validate1 = (values) => {
    let errors = {};
    if (!values.closeCause) {
      errors.closeCause = "Cause is required";
    }
    if (!values.citizenEmail) {
      errors.citizenEmail = "Please Select Citizen Email";
    }

    return errors;
  };

  return (
    <div id="admin">
      <div>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Cause
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      Cause Name
                    </Label>
                    <Input
                      type="text"
                      name=""
                      id=""
                      onChange={(e) => {
                        setItemName(e.target.value);
                      }}
                      value={itemName}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label className="font-weight-bold" for="">
                      Cause Detail
                    </Label>
                    <Input
                      type="textarea"
                      name=""
                      id=""
                      onChange={(e) => {
                        setItemDetail(e.target.value);
                      }}
                      value={itemDetail}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={updateCause}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div
        className=" p-3 shadow bg-white"
        style={{ borderRadius: "20px", width: "90%", height: "80vh" }}
      >
        <div
          className="p-5 bg-white"
          style={{ borderRadius: "20px", height: "90%", overflowY: "scroll" }}
        >
          <ul
            id="myTab"
            role="tablist"
            className="nav nav-tabs nav-pills flex-column flex-sm-row text-center bg-light border-0 rounded-nav"
          >
            <li className="nav-item flex-sm-fill">
              <a
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                className="nav-link border-0 text-uppercase font-weight-bold active"
              >
                Genaral
              </a>
            </li>
            <li className="nav-item flex-sm-fill">
              <a
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                className="nav-link border-0 text-uppercase font-weight-bold"
              >
                Main
              </a>
            </li>
            <li className="nav-item flex-sm-fill">
              <a
                id="contact-tab"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
                className="nav-link border-0 text-uppercase font-weight-bold"
              >
                Close
              </a>
            </li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
              className="tab-pane fade px-4 pt-5 show active"
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Name</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Color</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {causesData?.map((item, index) => {
                    return (
                      <>
                        {item.causeTypeId === 1 && (
                          <tr style={{ width: "100%" }} key={index}>
                            <td>
                              <div
                                className={
                                  "d-flex align-items-center justify-content-center"
                                }
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "15px",
                                  background: `#${item.causeColor}`,
                                  border: "1px",
                                  borderColor: "gray",
                                  borderStyle: "solid",
                                }}
                              >
                                <img
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    objectFit: "contain",
                                  }}
                                  src={`data:image/jpeg;base64,${item.causeIconUrl}`}
                                  alt="icon"
                                />
                              </div>
                            </td>
                            <td>{item.causeName}</td>
                            <td>{item.causeDetail}</td>
                            <td>
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  background: `#${item.causeColor}`,
                                  border: "1px",
                                  borderColor: "gray",
                                  borderStyle: "solid",
                                }}
                              ></div>
                            </td>
                            <td>
                              <Button onClick={() => handleModalShow(item)}>
                                Edit
                              </Button>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
              className="tab-pane fade px-4 py-5"
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Name</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Color</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {causesData?.map((item, index) => {
                    return (
                      <>
                        {item.causeTypeId === 2 && (
                          <tr style={{ width: "100%" }} key={index}>
                            <td>
                              <div
                                className={
                                  "d-flex align-items-center justify-content-center"
                                }
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "15px",
                                  background: `#${item.causeColor}`,
                                  border: "1px",
                                  borderColor: "gray",
                                  borderStyle: "solid",
                                }}
                              >
                                <img
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    objectFit: "contain",
                                  }}
                                  src={`data:image/jpeg;base64,${item.causeIconUrl}`}
                                  alt="icon"
                                />
                              </div>
                            </td>
                            <td>{item.causeName}</td>
                            <td>{item.causeDetail}</td>
                            <td>
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  background: `#${item.causeColor}`,
                                  border: "1px",
                                  borderColor: "gray",
                                  borderStyle: "solid",
                                }}
                              ></div>
                            </td>
                            <td>
                              <Button onClick={() => handleModalShow(item)}>
                                Edit
                              </Button>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
              className="tab-pane fade px-4 py-5"
            >
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Icon</th>
                    <th scope="col">Name</th>
                    <th scope="col">Detail</th>
                    <th scope="col">Color</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {causesData?.map((item, index) => {
                    // console.log("icon", item);
                    return (
                      <>
                        {item.causeTypeId === 3 && (
                          <tr style={{ width: "100%" }} key={index}>
                            <td>
                              <div
                                className={
                                  "d-flex align-items-center justify-content-center"
                                }
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "15px",
                                  background: `#${item.causeColor}`,
                                  border: "1px",
                                  borderColor: "gray",
                                  borderStyle: "solid",
                                }}
                              >
                                <img
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    objectFit: "contain",
                                  }}
                                  src={`data:image/png;base64,${item.causeIconUrl}`}
                                  alt="icon"
                                />
                              </div>
                            </td>
                            <td>{item.causeName}</td>
                            <td>{item.causeDetail}</td>
                            <td>
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  background: `#${item.causeColor}`,
                                  border: "1px",
                                  borderColor: "gray",
                                  borderStyle: "solid",
                                }}
                              ></div>
                            </td>
                            <td>
                              <Button onClick={() => handleModalShow(item)}>
                                Edit
                              </Button>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={"d-flex"}>
          <div className="pl-5 pt-4">
            <Button onClick={() => setShowAddCauseModal(true)}>
              Add Cause
            </Button>
          </div>
          <div className="pl-3 pt-4">
            <Button onClick={() => setAdminCauseModal(true)}>
              Add Admin To Cause
            </Button>
          </div>
          <div className="pl-3 pt-4">
            {/* <Link to="/"> */}
            <Button onClick={handleLogout}>Logout</Button>
            {/* </Link> */}
          </div>
        </div>
        <Modal
          show={showAddCauseModal}
          onHide={() => setShowAddCauseModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Cause
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md="6">
                        <Form.Select
                          style={{ textTransform: "capitalize" }}
                          // onChange={handleSelect}
                          name="causeType"
                          onChange={handleChange}
                          value={values.causeType}
                          onBlur={handleBlur}
                          error={errors.causeType}
                        >
                          <option></option>
                          {causeTypeData?.map((item, index) => {
                            return (
                              <option
                                value={item.id}
                                key={index}
                                style={{ textTransform: "capitalize" }}
                              >
                                {item.causeTypeName}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {errors.causeType && touched.causeType && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginTop: "0.5rem",
                            }}
                          >
                            {errors.causeType}
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row className={"mt-3"}>
                      <Col md="6">
                        <Input
                          type="text"
                          name="causeName"
                          placeholder={"Cause Name"}
                          onChange={handleChange}
                          value={values.causeName}
                          onBlur={handleBlur}
                          error={errors.causeName}
                        />
                        {errors.causeName && touched.causeName && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginTop: "0.5rem",
                            }}
                          >
                            {errors.causeName}
                          </div>
                        )}
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="causeColor"
                          placeholder={"Cause Color"}
                          onChange={handleChange}
                          value={values.causeColor}
                          onBlur={handleBlur}
                          error={errors.causeColor}
                        />
                        {errors.causeColor && touched.causeColor && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginTop: "0.5rem",
                            }}
                          >
                            {errors.causeColor}
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row className={"mt-3"}>
                      <Col md="6">
                        <Input
                          type="textarea"
                          name="cuaseDetail"
                          placeholder={"Cause Detail"}
                          onChange={handleChange}
                          value={values.cuaseDetail}
                          onBlur={handleBlur}
                          error={errors.cuaseDetail}
                        />
                        {errors.cuaseDetail && touched.cuaseDetail && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginTop: "0.5rem",
                            }}
                          >
                            {errors.cuaseDetail}
                          </div>
                        )}
                      </Col>
                      <Col md="6">
                        <Input
                          type="file"
                          accept="image/jpeg"
                          name="causeIcon"
                          placeholder={"Company Name"}
                          // onChange={handleChange}
                          onChange={(e) => {
                            handleFileInputChange(e);
                            handleChange(e);
                          }}
                          value={values.causeIcon}
                          onBlur={handleBlur}
                          error={errors.causeIcon}
                        />
                        {errors.causeIcon && touched.causeIcon && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginTop: "0.5rem",
                            }}
                          >
                            {errors.causeIcon}
                          </div>
                        )}
                      </Col>
                      <div className="mt-4">
                        <Button
                          // variant="primary"
                          type="submit"
                          className={!(dirty && isValid) ? "disabled-btn" : ""}
                          disabled={!(dirty && isValid)}
                        >
                          Save
                        </Button>
                      </div>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </Modal.Body>
        </Modal>
        <Modal
          show={adminCauseModal}
          onHide={() => setAdminCauseModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Admin
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues1}
              validate={validate1}
              onSubmit={handleAddAdminToCause}
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
                  <Form onSubmit={handleSubmit}>
                    <Row className={"mt-3"}>
                      <Col md="6">
                        <Form.Select
                          style={{ textTransform: "capitalize" }}
                          // onChange={handleSelect}
                          name="closeCause"
                          onChange={handleChange}
                          value={values.closeCause}
                          onBlur={handleBlur}
                          error={errors.closeCause}
                        >
                          <option></option>
                          {causesData?.map((item, index) => {
                            return (
                              <>
                                {item.causeTypeId === 3 && (
                                  <option
                                    value={item.id}
                                    key={index}
                                    style={{ textTransform: "capitalize" }}
                                    className="d-flex justify-content-between"
                                  >
                                    {item.causeName}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </Form.Select>
                        {errors.closeCause && touched.closeCause && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "14px",
                              marginTop: "0.5rem",
                            }}
                          >
                            {errors.closeCause}
                          </div>
                        )}
                      </Col>
                      <Col md="6">
                        <div style={{ width: "100%" }}>
                          <input
                            list="browsers"
                            name="citizenEmail"
                            id="browser"
                            style={{ width: "78%", height: "37px" }}
                            onChange={(e) => {
                              setCitizenName(e.target.value);
                              handleChange(e);
                            }}
                            // value={values.citizenEmail}
                            onBlur={handleBlur}
                            error={errors.citizenEmail}
                          />
                          {errors.citizenEmail && touched.citizenEmail && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "14px",
                                marginTop: "0.5rem",
                              }}
                            >
                              {errors.citizenEmail}
                            </div>
                          )}
                          <datalist id="browsers">
                            {listOfCitizens?.map((item, index) => {
                              return (
                                <option
                                  // value={item.citizenId}
                                  key={index}
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.email}
                                </option>
                              );
                            })}
                          </datalist>
                          <Button
                            type="submit"
                            onClick={handleSearch}
                            style={{ width: "22%", height: "36px" }}
                          >
                            Search
                          </Button>
                        </div>
                      </Col>
                      <div className="mt-4">
                        <Button
                          type="submit"
                          className={!(dirty && isValid) ? "disabled-btn" : ""}
                          disabled={!(dirty && isValid)}
                        >
                          Make Admin
                        </Button>
                      </div>
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};
export default SuperAdmin;
