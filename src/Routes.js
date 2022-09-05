import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ScaleLoader } from "react-spinners";
import PrivateRoute from "./Screens/PrivateRoute";

const Super = lazy(() => import("./Screens/SuperAdmin"));
const Admin = lazy(() => import("./Screens/Admin"));
const Login = lazy(() => import("./Screens/LoginForm"));
const Home = lazy(() => import("./Screens/Home"));
const PageNotFound = lazy(() => import("./Screens/PageNotFound"));
const AcceptInvite = lazy(() => import("./Screens/AcceptInvite"));
const Routes = () => {
  const [isAdmin, setIsAdmin] = useState();
  const location = useLocation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth-token"));
    setIsAdmin(data?.isAdmin);
  }, []);

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };
  // console.log("routes admin", isAdmin);

  const SuspenseLoading = () => {
    return (
      <>
        <div className="d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3">
          <div className="d-flex align-items-center flex-column px-4">
            <ScaleLoader color={"#000"} loading={true} />
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
        <Switch location={location} key={location.pathname}>
          <Route path={["/superAdmin", "/admin"]}>
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {/* {isAdmin === 2 ? 
              <Route
                path="/superAdmin"
                exact
                render={(props) => (
                  <PrivateRoute
                    path="/superAdmin"
                    {...props}
                    component={Super}
                    exact
                  />
                )}
              />
               : ''}  */}
              {/* {isAdmin === 1 ?  */}
              <Route
                path="/admin"
                exact
                render={(props) => (
                  <PrivateRoute
                    path="/admin"
                    {...props}
                    component={isAdmin === 1 ? Admin : Super}
                    exact
                  />
                )}
              />
              {/* : ''} */}
            </motion.div>
          </Route>
          <Route path="/" component={Home} exact />
          <Route path="/Home" component={Home} exact />
          <Route path="/Login" component={Login} exact />
          <Route path="/acceptInvite/:id" component={AcceptInvite} exact />
          <Route path="*" exact={true} component={PageNotFound} />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

export default Routes;
