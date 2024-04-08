import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./pages/Homepage.jsx";
import Manga from "./pages/Manga.jsx";
import Onemanga from "./pages/Onemanga.jsx";
import FromsConnect from "./pages/FomsConnect.jsx";
import FomsRegistered from "./pages/FomsRegistered.jsx";
import WhriteCritic from "./pages/WhriteCritic.jsx";
import UserCritic from "./pages/UserCritic.jsx";
import Favory from "./pages/Favory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/mangas",
        element: <Manga />,
      },
      {
        path: "/mangas/:mangaId",
        element: <Onemanga />,
      },
      {
        path: "/connexion",
        element: <FromsConnect />,
      },
      {
        path: "/register",
        element: <FomsRegistered />,
      },
      {
        path: "/:mangaId/whrite-critic",
        element: <WhriteCritic />,
      },

      {
        path: "/user-critic",
        element: <UserCritic />,
      },
      {
        path: "/favory",
        element: <Favory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
