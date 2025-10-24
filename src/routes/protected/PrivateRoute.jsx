import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  if (!token) return <Navigate to={"/auth/login"} />;
  return children;
};

export default PrivateRoute;
