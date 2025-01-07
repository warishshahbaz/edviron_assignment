import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";


const App = () => {
  // const [users, setUsers] = useState([]); // Mock database for users
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const registerHandler = (user) => {
  //   const userExists = users.some((u) => u.username === user.username);
  //   if (!userExists) {
  //     setUsers([...users, user]);
  //     return true; // Registration successful
  //   }
  //   return false; // Username already exists
  // };

  // const loginHandler = (credentials) => {
  //   const user = users.find(
  //     (u) => u.username === credentials.username && u.password === credentials.password
  //   );
  //   if (user) {
  //     setIsAuthenticated(true);
  //     return true;
  //   }
  //   return false;
  // };

  const logoutHandler = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/dashboard"
          element={

            <Dashboard onLogout={logoutHandler} />

          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
