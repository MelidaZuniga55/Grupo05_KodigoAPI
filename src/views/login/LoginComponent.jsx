import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const LoginComponent = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });

      
      const token = response.data.token;
      onLogin(token);

     
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/logoKodigo.jpeg" alt="logo" />
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="login-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className="login-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Crea una aquí</Link>
        </p>
      </div>
      <div className="login-bg"></div>
    </div>
  );
};

export default LoginComponent;
