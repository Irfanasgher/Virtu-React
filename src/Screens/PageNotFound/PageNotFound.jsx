import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.scss";
const PageNotFound = () => {
  return (
    <div
      id="pageNotFound"
      className="d-flex align-items-center justify-content-center"
    >
      <div class="text-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <Link to="/">
          <button class="btn green">HOME</button>
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
