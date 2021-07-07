import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  redirectRoute,
  userType,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("userProfile") &&
        localStorage.getItem("userType") === userType ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectRoute} />
        )
      }
    />
  );
};

export default PrivateRoute;
