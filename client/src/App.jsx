import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import LogIn from "./pages/auth/login";
import Register from "./pages/auth/register";

const App = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header Component</h1>

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
