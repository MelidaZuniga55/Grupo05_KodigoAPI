import { useEffect, useState } from "react";
import axios from "axios";
import { BootcampCard } from "./BootCampCard";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Style/homePage.css";

export const HomePage = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const fetchBootcamps = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/bootcamps/all",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBootcamps(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener bootcamps");
      }
    };

    fetchBootcamps();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setBootcamps([]);
    setError("");
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="home-container">
        {!isLoggedIn && (
          <div className="landing-info">
            <h1 className="title">Bienvenido a Kodigo Bootcamps</h1>
            <p>Descubre los mejores bootcamps de programación, diseño y análisis de datos.</p>
            <p>Para ver todos los bootcamps, inicia sesión o crea tu cuenta.</p>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {isLoggedIn && (
          <div className="cards-container">
            {bootcamps.map((bc) => (
              <BootcampCard
                key={bc.id}
                name={bc.name}
                description={bc.description}
                technologies={bc.technologies}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
