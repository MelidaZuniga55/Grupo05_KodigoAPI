import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginComponent from "./views/login/LoginComponent";
import Register from "./views/register/RegisterComponent";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Bienvenido/a</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de registro como ruta inicial */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
