import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useState } from "react";
import { HomePage } from "./views/homePage/HomePage";
import LoginComponent from "./views/login/LoginComponent";
import Register from "./views/register/RegisterComponent";

import DashboardComponent from "./views/dashboard/DashboardComponent"; // 👈 luego crearemos esta vista


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

        {/* Página de registro como ruta inicial */}
        <Route path="/" element={<Register />} />

        {/* Página de login */}
        <Route path="/login" element={<LoginComponent />} />

        {/* Dashboard protegido */}
        <Route path="/dashboard" element={<DashboardComponent />} />

        {/* Cualquier ruta desconocida redirige al registro */}


        {/* Página de registro como ruta inicial */}
        <Route path="/" element={<Register />} />

        <Route path="/login" element={<LoginComponent />} />

        {/* Dashboard protegido */}
        <Route path="/dashboard" element={<DashboardComponent />} />

        {/* Cualquier ruta desconocida redirige al registro */}

        {/* Home con navbar */}
        <Route
          path="/"
          element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />

        {/* Login y Register */}
        <Route
          path="/login"
          element={<LoginComponent onLogin={handleLogin} />}
        />
        <Route path="/register" element={<Register />} />



        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
