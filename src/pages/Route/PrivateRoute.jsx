import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  let auth = true;
  // let auth = false;

  return auth ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default PrivateRoute;
