import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Workouts } from "./components/Workouts.tsx";
import RootApp from "./App.tsx";

const router = createBrowserRouter([
  { path: "/", element: <RootApp /> },
  { path: "/workouts", element: <Workouts /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
