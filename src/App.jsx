import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import InitialNavBar from "./sharedComponents/InitialNavBar";
import UserDashboard from "./pages/User/UserDashboard";
import OrgDashboard from "./pages/Org/OrgDashboard";
import axios from "axios";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          setAuthenticated(false);
          return;
        }
        const response = await axios.post(
          "http://localhost:5000/users/validateToken",
          { token: jwt }
        );
        if (response.data.message === "authorized") {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        alert("Unauthorized");
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<InitialNavBar />} />
        <Route
          path="/userDashboard"
          element={authenticated ? <UserDashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/orgDashboard"
          element={authenticated ? <OrgDashboard /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

