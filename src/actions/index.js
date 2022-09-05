import config from "../config/config";
// import lodash from "lodash";
import axios from "axios";
// import Cookies from "js-cookie";

// -------------------------Login USER Actions---------------------------------

export const loginUser = (payload) => {
  // console.log(payload.history);
  // console.log("loginUser action called");
  return async function (dispatch) {
    return await axios
      .post(`${config.BASEURL}/api/closeGroup/webLogin`, payload, config.hd, {
        withCredentials: true,
      })
      .then(({ data }) => {
        localStorage.setItem("auth-token", JSON.stringify(data));
        dispatch(loginUserSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginUserFail({ msg: "ERROR" }));
      });
  };
};

export const loginUserSuccess = (data) => {
  console.log("Login Data", data);
  return {
    type: "SUCCESSFUL",
    payload: data,
  };
};

export const loginUserFail = (msg) => {
  return {
    type: "FAILED",
    payload: msg,
  };
};

// -----------------------------------End-----------------------------------

// --------------------------Get CAUSES List--------------------------

export const getCausesList = () => {
  // console.log("Get Organization Called");
  return async function (dispatch) {
    return await axios
      .get(`${config.BASEURL}/api/cause/getallcauses`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(getCausesListSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCausesListSuccess = (data) => {
  return {
    type: "CAUSES_LIST_FETCHED_SUCCESSFUL",
    payload: data,
  };
};

//-------------------------------End----------------------------------------

// --------------------------Get CAUSES List--------------------------

export const updateCauseById = (payload, id) => {
  // console.log("Get Organization Called");
  return async function (dispatch) {
    return await axios
      .put(`${config.BASEURL}/api/closeGroup/updateCause/${id}`, payload, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(updateCauseByIdSuccess(data));
        dispatch(getCausesList());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateCauseByIdSuccess = (data) => {
  alert("Cause updated SuccessFully");
  return {
    type: "CAUSE_UPDATE_SUCCESSFUL",
    payload: data,
  };
};

//-------------------------------End----------------------------------------

//-----------------------------GET ALL CAUSES BY TYPES----------------------

export const getAllCauses = (payload) => {
  return async function (dispatch) {
    return await axios
      .get(`${config.BASEURL}/api/causeTypes/getCauseTypes`, {
        withCredentials: true,
      })

      .then(({ data }) => {
        dispatch(getAllCausesSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getAllCausesSuccess = (data) => {
  return {
    type: "GET_ALL_CAUSES_FETCHED_SUCCESSFUL",
    payload: data,
  };
};

//=----------------------------END--------------------------------------------

//-----------------------ADD CAUSE-----------------------------------

export const addCause = (payload) => {
  return async function (dispatch) {
    return await axios
      .post(`${config.BASEURL}/api/cause/`, payload, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(paddCauseSuccess(data));
        dispatch(getCausesList());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const paddCauseSuccess = (data) => {
  alert("Cause added Succefully");
  return {
    type: "CAUSE_ADDED_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------

//-----------------------getListOfCitizens-----------------------------------

export const getListOfCitizens = (payload) => {
  return async function (dispatch) {
    return await axios
      .post(`${config.BASEURL}/api/closeGroup/getListOfCitizens`, payload, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(getListOfCitizensSuccess(data));
        dispatch(getCausesList());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getListOfCitizensSuccess = (data) => {
  // alert("Succefully added a Cause");
  return {
    type: "LIST_OF_CITIZENS_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------

//-----------------------addAdminToCause-----------------------------------

export const addAdminToCause = (payload) => {
  return async function (dispatch) {
    return await axios
      .post(`${config.BASEURL}/api/closeGroup/addCauseToCitizen`, payload, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(addAdminToCauseSuccess(data));
        dispatch(getCausesList());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const addAdminToCauseSuccess = (data) => {
  alert("Admin added");
  return {
    type: "ADD_ADMIN_TO_CAUSE_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------

//-----------------------getAllCloseCauses-----------------------------------

export const getAllCloseCauses = (payload) => {
  return async function (dispatch) {
    return await axios
      .get(`${config.BASEURL}/api/closeGroup/getAll/${payload}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(getAllCloseCausesSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const getAllCloseCausesSuccess = (data) => {
  return {
    type: "GET_ALL_CLOSE_CAUSE_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------

//-----------------------deleteCauseByAdmin-----------------------------------

export const deleteCauseByAdmin = (id, payload) => {
  return async function (dispatch) {
    return await axios
      .delete(`${config.BASEURL}/api/closeGroup/delete/${id}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log("delete", data);
        dispatch(deleteCauseByAdminSuccess(data));
        dispatch(getAllCloseCauses(payload));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const deleteCauseByAdminSuccess = (data) => {
  alert(data.message);
  return {
    type: "DELETE_CAUSE_BY_ADMIN_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------

//-----------------------sendInvite-----------------------------------

export const invitePeople = (payload) => {
  return async function (dispatch) {
    return await axios
      .post(`${config.BASEURL}/api/closeGroup/sendInvite`, payload, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(invitePeopleSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const invitePeopleSuccess = (data) => {
  alert(data.message);
  return {
    type: "INVITE_PEOPLE_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------

//-----------------------acceptInvite-----------------------------------

export const acceptInvite = (payload) => {
  return async function (dispatch) {
    return await axios
      .post(`${config.BASEURL}/api/closeGroup/acceptInvite`, payload, {
        withCredentials: true,
      })
      .then(({ data }) => {
        dispatch(acceptInviteSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const acceptInviteSuccess = (data) => {
  alert(data.message);
  return {
    type: "INVITE_ACCEPT_SUCCESSFUL",
    payload: data,
  };
};

//-----------------------END-----------------------------
