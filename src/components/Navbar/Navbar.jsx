import React from "react";
import { Link } from "react-router-dom"; 
import "../Navbar/navbar.css"; 

export const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/"> 
          <img
            src="/Screenshot_2025-09-13_000547-removebg-preview.png"
            alt="Logo Kodigo"
          />
        </Link>
      </div>

      {/* Botones */}
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            {/* Botón que lleva a Login */}
            <Link to="/login" className="btn login-btn">
              Iniciar sesión
            </Link>

            {/* Botón que lleva a Register */}
            <Link to="/register" className="btn register-btn">
              Crear cuenta
            </Link>
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
