import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import line from "/src/assets/Line3.png";
import logo from "/src/assets/Manga-Eval-custom.jpg";

import heartActive from "/src/assets/icon-heart-actived.png";
import heartInactive from "/src/assets/icon-heart-no-actived.png";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl);

function Onemanga() {
  const [oneMangas, setOneMangas] = useState([]);
  const [mangaCritics, setMangaCritics] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const { mangaId } = useParams();
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetchMangas(mangaId);
    fetchMangaCritics(mangaId);
    checkIsAdmin();
  }, [mangaId]);

  const fetchMangas = (mangaId) => {
    fetch(`${backendUrl}/mangas/${mangaId}`)
      .then((res) => res.json())
      .then((data) => {
        setOneMangas(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails du manga:",
          error
        );
      });
  };

  const fetchMangaCritics = (mangaId) => {
    fetch(`${backendUrl}/critics/all/${mangaId}`)
      .then((res) => res.json())
      .then((data) => {
        setMangaCritics(data.mangaCritics);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des critiques du manga:",
          error
        );
      });
  };

  const checkIsAdmin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setIsAdmin(decodedToken.isAdmin);
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    }
  };

  const handleDeleteCritic = async (criticId) => {
    try {
      const response = await fetch(`${backendUrl}/critics/delete/${criticId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      fetchMangaCritics(mangaId);

      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.filter((id) => id !== criticId);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la critique :", error);
    }
  };

  const toggleFavorite = async (criticId) => {
    const userId = getUserIdFromToken();

    const isFavorite = favorites.includes(criticId);
    console.log("Is Favorite (before action):", isFavorite);

    try {
      if (isFavorite) {
        console.log("Removing from favorites...");
        const response = await fetch(
          `${backendUrl}/critics/${userId}/unlike/${criticId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Erreur HTTP lors de la suppression : ${response.status}`
          );
        }

        setFavorites((prevFavorites) => {
          const updatedFavorites = prevFavorites.filter(
            (id) => id !== criticId
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return updatedFavorites;
        });
      } else {
        const response = await fetch(`${backendUrl}/critics/${userId}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ criticId }),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP lors de l'ajout : ${response.status}`);
        }

        setFavorites((prevFavorites) => {
          const updatedFavorites = [...prevFavorites, criticId];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return updatedFavorites;
        });
      }
    } catch (error) {
      console.error("Erreur dans toggleFavorite :", error);
    }
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.id;
    }
    return null;
  };

  return (
    <>
      {oneMangas.map((manga) => (
        <div className="containeur-page" key={manga.id}>
          <div className="div-top">
            <div
              className="div-img-onemanga-background"
              style={{
                backgroundImage: `url(${manga.imagebackground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div className="manga-info">
            <h3 className="title-onemanga">{manga.title}🖋</h3>
            <div>
              <Link to="/">
                <img className="img-logo-from-onemanga" src={logo} alt="logo" />
              </Link>
            </div>
          </div>

          <div className="containeur-user-critic from-onemanga">
            <div className="div-user-critic-top">
              <div className="div-text-critic">
                <h2 className="text-critic-manga-title">
                  Les critiques de : {manga.title} 🖊
                </h2>
                <Link to={`/mangas/${mangaId}/write`}>
                  <button className="write-critic-button">
                    écrire une critique
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <img className="line-critic-split" src={line} />
            </div>
            <div className="div-user-critics">
              {mangaCritics.length === 0 ? (
                <p>Aucune critique disponible.</p>
              ) : (
                mangaCritics.map((critic) => (
                  <div
                    className="div-user-critic"
                    key={critic._id}
                    style={{ position: "relative" }}
                  >
                    <h3 className="title-manga-critic">{critic.title}</h3>
                    <p className="p-manga-critic">{critic.comment}</p>
                    <p className="date-manga-critic">
                      Créé le : {new Date(critic.created_at).toLocaleString()}
                    </p>
                    <Link to={`/profil/${critic.userId}`}>
                      <p className="user-manga-critic">
                        Par : {critic.username || "Utilisateur inconnu"}
                      </p>
                    </Link>

                    <button
                      onClick={() => toggleFavorite(critic._id)}
                      style={{
                        position: "absolute",
                        bottom: "32px",
                        right: "25px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={
                          favorites.includes(critic._id)
                            ? heartActive
                            : heartInactive
                        }
                        alt="Favorite"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>

                    {isAdmin && (
                      <button onClick={() => handleDeleteCritic(critic._id)}>
                        <h1 className="btn-delete-critic">❌</h1>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default Onemanga;
