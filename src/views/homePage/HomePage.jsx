import { useEffect, useState } from "react";
import axios from "axios";
import { BootcampCard } from "./BootCampCard";
import "./Style/homePage.css";

export const HomePage = ({ isLoggedIn }) => {
  const [bootcamps, setBootcamps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBootcamps = async () => {
      const token = localStorage.getItem("token");
      if (!token || !isLoggedIn) return;

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

  return (
    <div className="home-root">
      <div className="home-container">
        {!isLoggedIn ? (
          <div className="landing-info">
            <h1>Bienvenido a Kodigo Bootcamps</h1>
            <p>Descubre los mejores bootcamps de programación, diseño y análisis de datos.</p>
            <p>Para ver todos los bootcamps, inicia sesión o crea tu cuenta.</p>
          </div>
        ) : (
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
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
