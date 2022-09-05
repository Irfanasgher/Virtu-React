import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import { ClimbingBoxLoader } from 'react-spinners';
// import Cookies from 'js-cookie';
import { withRouter } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Login = lazy(() => import("./Screens/LoginForm"));
const Home = lazy(() => import("./Screens/Home"));
const AcceptInvite = lazy(() => import("./Screens/AcceptInvite"));

const RoutesLogin = (props) => {
  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ScaleLoader color={"#fff"} loading={true} />
          </div>
          <div className="text-muted font-size-xl text-center pt-3">
            Please wait while we load the live preview examples
            <span className="font-size-lg d-block text-dark">
              This live preview instance can be slower than a real production
              build!
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <AnimatePresence>
      <Suspense fallback={<SuspenseLoading />}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Home" component={Home} exact />
          <Route path="/Login" component={Login} exact />
          <Route path="/acceptInvite/:id" component={AcceptInvite} exact />
          {/* <Route path='*' exact={true} component={Home} /> */}
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

export default withRouter(RoutesLogin);
