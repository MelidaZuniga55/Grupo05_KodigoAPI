import { BrowserRouter, Routes, Route } from "react-router";
import LoginComponent from "./views/login/LoginComponent";
import Register from "./views/register/RegisterComponent";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Bienvenido al Dashboard 🎉</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
