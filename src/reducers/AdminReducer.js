// import { getAllCompanyData } from "../actions";

let defaultState = {
  path_name: null,
  causes: [],
};

export const AdminReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_ALL_CLOSE_CAUSE_SUCCESSFUL":
      return {
        ...state,
        closeCausesData: action.payload,
      };
    case "DELETE_CAUSE_BY_ADMIN_SUCCESSFUL":
      return {
        ...state,
        deleteCauseData: action.payload,
      };
    case "INVITE_PEOPLE_SUCCESSFU":
      return {
        ...state,
        invitePeopleData: action.payload,
      };
    case "INVITE_ACCEPT_SUCCESSFUL":
      return {
        ...state,
        inviteAcceptData: action.payload,
      };
    case "FAILED":
      return {
        ...state,
        alertt: alert("no list available"),
      };

    default:
      return state;
  }
};
