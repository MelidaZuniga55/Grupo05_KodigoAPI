import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./dashboard.css";

export default function DashboardComponent() {
  const [bootcamps, setBootcamps] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newBootcamp, setNewBootcamp] = useState({ name: "", description: "", technologies: "" });
  const [editingBootcamp, setEditingBootcamp] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Verificar token
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBootcamps();
  }, [token, navigate]);

  // Traer todos los bootcamps
  const fetchBootcamps = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/bootcamps/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBootcamps(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al obtener los bootcamps. Por favor inicia sesión nuevamente.");
    }
  };

  // Crear nuevo bootcamp
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/bootcamps/create",
        { ...newBootcamp, technologies: newBootcamp.technologies.split(",") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message);
      setNewBootcamp({ name: "", description: "", technologies: "" });
      fetchBootcamps();
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear bootcamp");
    }
  };

  // Editar bootcamp
  const handleEdit = (bootcamp) => {
    setEditingBootcamp({ ...bootcamp, technologies: bootcamp.technologies.join(",") });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { id, name, description, technologies } = editingBootcamp;
      const res = await axios.put(
        `http://localhost:3000/api/auth/bootcamps/update/${id}`,
        { name, description, technologies: technologies.split(",") },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.message);
      setEditingBootcamp(null);
      fetchBootcamps();
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar bootcamp");
    }
  };

  // Desactivar bootcamp
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/auth/bootcamps/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(res.data.message);
      fetchBootcamps();
    } catch (err) {
      setError(err.response?.data?.message || "Error al desactivar bootcamp");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard de Bootcamps</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Formulario de crear nuevo bootcamp */}
      <form className="bootcamp-form" onSubmit={editingBootcamp ? handleUpdate : handleCreate}>
        <h2>{editingBootcamp ? "Editar Bootcamp" : "Crear Nuevo Bootcamp"}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={editingBootcamp ? editingBootcamp.name : newBootcamp.name}
          onChange={(e) =>
            editingBootcamp
              ? setEditingBootcamp({ ...editingBootcamp, name: e.target.value })
              : setNewBootcamp({ ...newBootcamp, name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={editingBootcamp ? editingBootcamp.description : newBootcamp.description}
          onChange={(e) =>
            editingBootcamp
              ? setEditingBootcamp({ ...editingBootcamp, description: e.target.value })
              : setNewBootcamp({ ...newBootcamp, description: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Tecnologías (separadas por coma)"
          value={editingBootcamp ? editingBootcamp.technologies : newBootcamp.technologies}
          onChange={(e) =>
            editingBootcamp
              ? setEditingBootcamp({ ...editingBootcamp, technologies: e.target.value })
              : setNewBootcamp({ ...newBootcamp, technologies: e.target.value })
          }
          required
        />
        <button type="submit">{editingBootcamp ? "Actualizar" : "Crear"}</button>
        {editingBootcamp && (
          <button type="button" onClick={() => setEditingBootcamp(null)}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de bootcamps */}
      <div className="bootcamps-grid">
        {bootcamps.map((bootcamp) => (
          <div key={bootcamp.id} className="bootcamp-card">
            <h3>{bootcamp.name}</h3>
            <p>{bootcamp.description}</p>
            <p>
              <strong>Tecnologías:</strong> {bootcamp.technologies.join(", ")}
            </p>
            <p>
              <strong>Estado:</strong> {bootcamp.active ? "Activo" : "Inactivo"}
            </p>
            <button onClick={() => handleEdit(bootcamp)}>Editar</button>
            <button onClick={() => handleDelete(bootcamp.id)}>Desactivar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
