import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  console.log("Pathname : " , location.pathname, ":", "isAuthenticated: ", isAuthenticated);

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  console.log("Pathname : " , location.pathname, ":", "isAuthenticated: ", isAuthenticated);

  // if isAuthenticated is true or inside pathname /login or /register is include then this condin run
  if ( isAuthenticated && location.pathname.includes("/login") || location.pathname.includes("/register") ) {
    if (user?.role === "admin") {
      console.log("admin");
      return <Navigate to="/admin/dashboard" />;
    } else {
      console.log("user");
      return <Navigate to="/shop/home" />;
    }
  }
  console.log("Pathname : " , location.pathname, ":", "isAuthenticated: ", isAuthenticated);

  if ( isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin") ) {
    return <Navigate to="/unauth-page" />;
  }

  console.log("Pathname : " , location.pathname, ":", "isAuthenticated: ", isAuthenticated);

  if ( isAuthenticated && user?.role === "admin" && location.pathname.includes("shop") ) {
    return <Navigate to="/admin/dashboard" />;
  }
  console.log("Pathname : " , location.pathname, ":", "isAuthenticated: ", isAuthenticated);
 
  return <>{children}</>;
};

export default CheckAuth;
