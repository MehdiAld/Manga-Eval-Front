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
import WriteCritic from "./pages/WriteCritic.jsx";
import UserProfil from "./pages/UserProfil.jsx";
import ListUser from "./pages/ListUsers.jsx";
import CreateManga from "./pages/CreateManga.jsx";
import Favory from "./pages/Favory.jsx";
import Explanation from "./pages/Explanation.jsx";
import LegalNotice from "./pages/LegalNotice.jsx";

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
        path: "/mangas/:mangaId/write",
        element: <WriteCritic />,
      },

      {
        path: "/profil/:userId",
        element: <UserProfil />,
      },
      {
        path: "/list-users",
        element: <ListUser />,
      },
      {
        path: "/CreateManga",
        element: <CreateManga />,
      },
      {
        path: "/favory",
        element: <Favory />,
      },
      {
        path: "/explanation",
        element: <Explanation />,
      },
      {
        path: "/legalnotice",
        element: <LegalNotice />,
      },
    ],
  },
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
