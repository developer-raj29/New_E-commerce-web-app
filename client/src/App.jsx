import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeature from "./pages/admin-view/feature";
import AdminProduct from "./pages/admin-view/product";
import AdminOrder from "./pages/admin-view/order";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import AuthRegister from "./pages/auth/register";
import AuthLogIn from "./pages/auth/login";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { LoaderCircle } from "lucide-react";

const App = () => {
  // const isAuthenticated = false;
  // const user = null;
  // {
  //   name: "Raj",
  //   role: "user",
  // };

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading) return (
    <div>
      Loading...
      <LoaderCircle />
    </div>
  );

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>App Header Component</h1> */}

      <Routes>
        {/* Authentication-View */}
        <Route
          path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<AuthLogIn />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin-view */}
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProduct />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="features" element={<AdminFeature />} />
        </Route>

        {/* Shopping-view*/}
        <Route path="/shop" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckAuth>}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Un-auth Page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
