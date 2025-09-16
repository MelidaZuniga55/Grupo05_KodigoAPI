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
          <div className="landing-section">
            <div className="landing-info">
              <h1>Transforma tu carrera con Kodigo</h1>
              <p>Descubre los mejores bootcamps de programación, diseño y análisis de datos.</p>
              <p>Desarrolla tu potencial y conviértete en el profesional que las empresas buscan.</p>
              <p>Para ver todos los bootcamps, inicia sesión o crea tu cuenta.</p>
            </div>

            <div className="landing-images">
              <img src="src/assets/images/img1.jpg" alt="Programador trabajando" />
              <img src="src/assets/images/img2.jpg" alt="Equipo programando" />
              <img src="src/assets/images/img3.jpg" alt="Aprendiendo a programar" />
              <img src="src/assets/images/img4.jpg" alt="Estudiantes aprendiendo" />
            </div>
          </div>
        ) : (
          <>
           
          <div className="carousel-section">
  <h2>Lo que dicen nuestros estudiantes</h2>
  <div className="carousel">
    <div className="carousel-item">
      <img src="src\assets\images\testi1.jpg" alt="Juan" className="carousel-img" />
      <p>Juan: “Aprendí Java en 3 meses, increíble experiencia!”</p>
    </div>
    <div className="carousel-item">
      <img src="src\assets\images\testi2.jpg" alt="Maria" className="carousel-img" />
      <p>Maria: “Los instructores son súper claros y atentos.”</p>
    </div>
  </div>
</div>


            <div className="more-bootcamps">
              <h3>Descubre todos nuestros bootcamps y potencia tu carrera</h3>
              <div className="cards-container">
                {bootcamps
                .filter((bc) => bc.active)
                .map((bc) => (
                  <BootcampCard
                    key={bc.id}
                    name={bc.name}
                    description={bc.description}
                    technologies={bc.technologies}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};
