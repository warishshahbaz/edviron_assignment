import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";


const App = () => {
  const [users, setUsers] = React.useState([]); // Mock database for users
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const registerHandler = (user) => {
    const userExists = users.some((u) => u.username === user.username);
    if (!userExists) {
      setUsers([...users, user]);
      return true; // Registration successful
    }
    return false; // Username already exists
  };

  const loginHandler = (credentials) => {
    const user = users.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup onRegister={registerHandler} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={loginHandler} />}
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
