import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./views/homePage/HomePage";
import { Login } from "./views/homePage/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
