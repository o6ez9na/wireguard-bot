import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = getCookie("access");

  if (!isAuthenticated) {
    return <Navigate to="/authorization" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
