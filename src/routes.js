import React from "react";
import { isAuthenticated } from "./auth";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";

import { Route, Switch, Redirect } from "react-router-dom";

/*
======================================================================================
MODIFICAÇÃO

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//       )
//     }
//   />
// );
======================================================================================
*/

const Routes = () => (
  <Switch>
    {/* MODIFICAÇÃO */}
    {/* <PrivateRoute path="/home" component={() => <Home />} /> */}
    <Route path="/home" component={() => <Home />} />
    <Route exact path="/" component={() => <Login />} />
  </Switch>
);

export default Routes;
