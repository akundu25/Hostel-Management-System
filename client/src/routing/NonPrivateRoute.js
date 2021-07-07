import React from "react";
import { Redirect, Route } from "react-router-dom";

const NonPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const userType = localStorage.getItem("userType");
        if (userType === "student") return <Redirect to="/student-dashboard" />;
        else if (userType === "admin")
          return <Redirect to="/admin-dashboard" />;
        else if (userType === "warden")
          return <Redirect to="/warden-dashboard" />;
        else return <Component {...props} />;
      }}
    />
  );
};

export default NonPrivateRoute;
