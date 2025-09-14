import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoginComponent from "./views/login/LoginComponent";
import Register from "./views/register/RegisterComponent";
import DashboardComponent from "./views/dashboard/DashboardComponent"; // 👈 luego crearemos esta vista

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de registro como ruta inicial */}
        <Route path="/" element={<Register />} />

        {/* Página de login */}
        <Route path="/login" element={<LoginComponent />} />

        {/* Dashboard protegido */}
        <Route path="/dashboard" element={<DashboardComponent />} />

        {/* Cualquier ruta desconocida redirige al registro */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
