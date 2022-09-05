// import { getAllCompanyData } from "../actions";

let defaultState = {
  path_name: null,
  causes: [],
};

export const CausesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CAUSES_LIST_FETCHED_SUCCESSFUL":
      return {
        ...state,
        causesData: action.payload,
      };
    case "COMPANY_LIST_POSTED_SUCCESSFUL":
      return {
        ...state,
        companyId: action.payload.id_company,
      };
    case "CAUSE_UPDATE_SUCCESSFUL":
      return {
        ...state,
        causeUpdateSuccess: action.payload,
      };
    case "GET_ALL_CAUSES_FETCHED_SUCCESSFUL":
      return {
        ...state,
        causeTypeData: action.payload,
      };
    case "CAUSE_ADDED_SUCCESSFUL":
      return {
        ...state,
        causeAddedData: action.payload,
      };
    case "LIST_OF_CITIZENS_SUCCESSFUL":
      return {
        ...state,
        listOfCitizens: action.payload,
      };
    case "ADD_ADMIN_TO_CAUSE_SUCCESSFUL":
      return {
        ...state,
        addAdminToCauseData: action.payload,
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
