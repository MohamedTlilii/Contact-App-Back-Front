import React from "react";
import { Navigate } from "react-router-dom";
function UserRoute({ children }) {
  let token = localStorage.getItem("token");
  let isBanned = localStorage.getItem("isBanned");
  let isUser = localStorage.getItem("isUser");

  if (token && isBanned === "false" && isUser === "true") {
    return <> {children} </>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default UserRoute;
