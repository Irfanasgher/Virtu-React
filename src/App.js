import React from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import Routes from "./Routes";
// import RoutesLogin from "./RoutesLogin";
import ScrollToTop from "./utils/ScrollToTop";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ScrollToTop>
          {/* <RoutesLogin /> */}
          <Routes />
        </ScrollToTop>
        <ToastContainer
          enableMultiContainer
          containerId={"A"}
          position={toast.POSITION.BOTTOM_LEFT}
          npm
        />
        <ToastContainer
          enableMultiContainer
          containerId={"B"}
          position={toast.POSITION.TOP_RIGHT}
        />
        <ToastContainer
          enableMultiContainer
          containerId={"C"}
          position={toast.POSITION.BOTTOM_CENTER}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
