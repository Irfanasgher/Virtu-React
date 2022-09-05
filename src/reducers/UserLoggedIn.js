let defaultState = {
  shopId: null,
  user_email: null,
  user_fname: null,
  user_lname: null,
  path_name: null,
  userData: null,
};

const UserLoggedIn = (state = defaultState, action) => {
  switch (action.type) {
    // case "LOGIN_USER":
    //     return {
    //         shopId: action.payload.shopId,
    //         user_email: action.payload.user_email,
    //         user_fname: action.payload.user_fname,
    //         user_lname: action.payload.user_lname,
    //         path_name: action.payload.path_name
    //     };
    case "SUCCESSFUL":
      return {
        ...state,
        userData: action.payload,
        path_name: "/admin" ,
        // path_name: action.payload.isAdmin == 1 ? "/admin" : "/superAdmin",
      };
    case "FAILED":
      return {
        ...state,
        user_email: "error@gmail.com",
      };
    default:
      return state;
  }
};

export default UserLoggedIn;
