import config from "../config/config";
import React from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null,
      isAdmin: "",
    };
  }
  // changestate() {}
  componentDidMount() {
    // console.log(localStorage.getItem('auth-token'));
    axios
      .get(
        config.BASEURL + "/api/closeGroup/verify",
        {
          headers: {
            "auth-token": JSON.parse(localStorage.getItem("auth-token"))
              ?.authToken,
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(this.state.isLoggedIn);
        const data = JSON.parse(localStorage.getItem("auth-token"));
        console.log("asjdfksadjkdfj", data.isAdmin);
        this.setState({ isAdmin: data?.isAdmin });

        this.setState({ isLoggedIn: true });
        console.log(this.state.isLoggedIn);
      })
      .catch((error) => {
        console.log("error prompt", error);
        this.setState({ isLoggedIn: false });
      });
  }

  render() {
    if (this.state.isLoggedin === null) {
      return "loading ......";
    } else {
      if (this.state.isLoggedIn === false) {
        return (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      } else {
        // alert("here");
        return (
          <Route
            path={this.props.path}
            component={this.props.component}
            exact={this.props.exact}
          />
        );
      }
    }
  }
}

export default PrivateRoute;
