import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import {
  getAllCloseCauses,
  deleteCauseByAdmin,
  invitePeople,
} from "../../actions";
import "./Admin.scss";

const Admin = () => {
  // alert(1223);
  const [userData, setUserData] = useState();
  const [adminId, setAdminId] = useState();
  const [causeId, setCauseId] = useState();
  const [inviteModal, setInviteModal] = useState(false);
  const [citizenEmail, setCitizenEmail] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setUserData(
      JSON.parse(window.localStorage.getItem("auth-token"))?.admin
        ?.citizenProfileId
    );
    setAdminId(JSON.parse(window.localStorage.getItem("auth-token"))?.isAdmin);
    userData && dispatch(getAllCloseCauses(userData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleDelete = (id) => {
    console.log("id", id);
    dispatch(deleteCauseByAdmin(id, userData));
  };

  const handleInvite = (id) => {
    setInviteModal(true);
    setCauseId(id);
    console.log("adminId", adminId);
  };
  console.log("causeId", causeId);

  const handleSearch = () => {
    console.log("citizenEmail", citizenEmail);
    var citizenEmailInVar = citizenEmail.replace(/[,]/g, "");
    var citizenEmailInArray = citizenEmailInVar.split(" ");
    console.log("array", citizenEmailInArray);

    const data = {
      causeId: causeId,
      adminId: adminId,
      emails: citizenEmailInArray,
    };

    console.log("all data", data);

    dispatch(invitePeople(data));
    setInviteModal(false);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    history.push("/");
    console.log("logout clear");
  };

  const { closeCausesData } = useSelector((state) => state.AdminReducer);
  const { listOfCitizens } = useSelector((state) => state.CausesReducer);

  console.log("closeCausesData", closeCausesData);
  console.log("listOfCitizens", listOfCitizens);
  console.log("userData", userData);

  const initialValues = {
    browser: "",
  };

  const validate = (values) => {
    let errors = {};
    if (!values.browser) {
      errors.browser = "Please Enter Email";
    }

    return errors;
  };

  return (
    <>
      <div id="mainAdmin">
        <div
          className=" p-5 shadow bg-white"
          style={{ borderRadius: "20px", width: "90%", height: "80vh" }}
        >
          <div
            className="p-5 bg-white"
            style={{ borderRadius: "20px", height: "90%" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Icon</th>
                  <th scope="col">Name</th>
                  <th scope="col">Detail</th>
                  <th scope="col">Color</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {closeCausesData?.map((item, index) => {
                  // console.log("item", item);
                  return (
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
                              width: "25px",
                              height: "25px",
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
                        <Button
                          onClick={() => {
                            handleInvite(item.id);
                          }}
                        >
                          Invite
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Modal
            show={inviteModal}
            onHide={() => setInviteModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Invite People
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Add People to invite</h6>
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSearch}
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
                        <Col md="12">
                          <div style={{ width: "100%" }}>
                            <input
                              list="browsers"
                              name="browser"
                              placeholder="Enter email..."
                              id="browser"
                              style={{ width: "82%", height: "37px" }}
                              onChange={(e) => {
                                setCitizenEmail(e.target.value);
                                handleChange(e);
                              }}
                              value={values.browser}
                              onBlur={handleBlur}
                              error={errors.browser}
                            />
                            {errors.browser && touched.browser && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "14px",
                                  marginTop: "0.5rem",
                                }}
                              >
                                {errors.browser}
                              </div>
                            )}
                            {/* <datalist id="browsers">
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
                            </datalist> */}
                            <Button
                              // onClick={handleSearch}
                              type="submit"
                              className={
                                !(dirty && isValid) ? "disabled-btn" : ""
                              }
                              disabled={!(dirty && isValid)}
                              style={{ width: "18%", height: "37px" }}
                            >
                              Invite Peaple
                            </Button>
                          </div>
                        </Col>
                        <div className="mt-4">
                          {/* <Button type="submit">Invite</Button> */}
                        </div>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Modal.Body>
          </Modal>
          <div className="pl-3 pt-4">
            {/* <Link to="/"> */}
            <Button onClick={handleLogout}>Logout</Button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
