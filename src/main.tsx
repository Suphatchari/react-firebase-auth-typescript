import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import Home from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import PageNotFound from "./components/pageNotFound/PageNotFound.tsx";
import Register from "./components/Register.tsx";
import { UserAuthContextProvider } from "./context/UserAuthContext.tsx";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // <App /> is the main component that contains the RouterProvider
    errorElement: <PageNotFound />, // Error handling for undefined routes
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserAuthContextProvider>
      <ToastContainer position="top-right" autoClose={5000} />
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </StrictMode>
);
