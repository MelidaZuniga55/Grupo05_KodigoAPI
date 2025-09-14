import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { HomePage } from "./views/homePage/HomePage";
import LoginComponent from "./views/login/LoginComponent";
import Register from "./views/register/RegisterComponent";
import DashboardComponent from "./views/dashboard/DashboardComponent";
import Layout from "./components/Layout";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Navbar */}
        <Route element={<Layout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/dashboard" element={<DashboardComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        </Route>

        {/* Rutas sin Navbar */}
        <Route path="/login" element={<LoginComponent onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
