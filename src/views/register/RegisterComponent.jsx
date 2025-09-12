// src/views/register/RegisterComponent.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./register.css";

export default function RegisterComponent() {
  const [username, setUsername] = useState(""); // 👈 usamos username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,  // 👈 aquí mandamos el username
        password,
      });

      if (res.status === 201) {
        setSuccess("Usuario registrado correctamente ✅");
        setTimeout(() => navigate("/login"), 2000); // 👈 redirige al login
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al registrar el usuario ❌"
      );
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

        <div className="form-group">
          <label>Nombre de usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese un nombre de usuario"
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>

        <button type="submit">Registrarse</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}
