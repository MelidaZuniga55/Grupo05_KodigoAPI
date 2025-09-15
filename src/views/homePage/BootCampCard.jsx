
import "./Style/bootCampCard.css"; 

export const BootcampCard = ({ name, description, technologies }) => {
  return (
    <div className="bootcamp-card">
      <img src="/logoCards.png" alt="kodigoLogo" />
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="techs">
        {technologies.map((tech, index) => (
          <span key={index}>{tech}</span>
        ))}
      </div>
    </div>
  );
};
