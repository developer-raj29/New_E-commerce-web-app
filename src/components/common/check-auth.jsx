import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ children }) => {
  const location = useLocation();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log(
    "user: ",
    user,
    "isAuthenticated: ",
    isAuthenticated,
    "isloading: ",
    isLoading
  );

  console.log(
    "location.pathname: ",
    location.pathname,
    "isAuthenticated: ",
    isAuthenticated
  );

  if (location.pathname === "/") {
    if (isLoading) {
      return <Loader />; // Show a loading state instead of redirecting
    } else if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }

    console.log(user?.role === "admin" ? "1 /admin/dashboard" : "1 /shop/home");
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
      />
    );
  }

  console.log(
    "location.pathname: ",
    location.pathname,
    "isAuthenticated: ",
    isAuthenticated
  );

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    console.log(user?.role === "admin" ? "2 /admin/dashboard" : "2 /shop/home");

    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"}
      />
    );
  }

  console.log(location.pathname, isAuthenticated);

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    console.log(user?.role === "admin" ? "3 /admin/dashboard" : "3 /shop/home");
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
