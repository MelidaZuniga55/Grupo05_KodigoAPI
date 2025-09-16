import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../Navbar/navbar.css"; 

export const Navbar = ({ isLoggedIn, onLogout }) => {
  
  const handleLogout = () => {
    Swal.fire({
      title: "¿Seguro que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        Swal.fire("Sesión cerrada", "Has cerrado sesión correctamente.", "success");
      }
    });
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img
            src="/LogoKodigo.png"
            alt="Logo Kodigo"
          />
        </Link>
      </div>

      {/* Botones */}
      <div className="nav-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn login-btn">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn register-btn">
              Crear cuenta
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="btn dashboard-btn">
              Dashboard
            </Link>
            <button className="btn logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
