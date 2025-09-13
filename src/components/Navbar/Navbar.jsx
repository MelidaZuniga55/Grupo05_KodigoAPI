import React from "react";
import "../Navbar/navbar.css"; 

export const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="public\Screenshot_2025-09-13_000547-removebg-preview.png" alt="Logo Kodigo" />
      </div>

      {/* Botones */}
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <button className="btn login-btn">Iniciar sesión</button>
            <button className="btn register-btn">Crear cuenta</button>
          </>
        ) : (
          <button className="btn logout-btn" onClick={onLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};
