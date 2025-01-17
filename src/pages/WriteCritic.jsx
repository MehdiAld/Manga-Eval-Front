import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import iconArrow from "/src/assets/arrow.png";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const WriteCritic = () => {
  const [oneMangas, setOneMangas] = useState([]);
  const [criticTitle, setCriticTitle] = useState("");
  const [criticComment, setcriticComment] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mangaId } = useParams();

  const token = localStorage.getItem("token");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = decodedToken ? decodedToken.id : null;

  useEffect(() => {
    fetchMangas(mangaId);
  }, [mangaId]);

  const fetchMangas = (mangaId) => {
    fetch(`${backendUrl}/mangas/${mangaId}`)
      .then((res) => res.json())
      .then((data) => {
        setOneMangas(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du manga:", error);
      });
  };

  const fetchMangaCritics = (mangaId) => {
    fetch(`${backendUrl}/critics/all/${mangaId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Critiques récupérées:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des critiques :", error);
      });
  };

  const createCritic = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.id;
        const username = decodedToken.username;

        const criticData = {
          title: criticTitle,
          comment: criticComment,
          mangaId: mangaId,
          userId: userId,
          username: username,
        };

        const response = await fetch(`${backendUrl}/critics/add/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(criticData),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la création de la critique");
        }

        const data = await response.json();
        console.log("Critique créée avec succès.", data);

        navigate(`/mangas/${mangaId}`);
      } catch (error) {
        console.error("Erreur lors de la création de la critique :", error);
      }
    }
  };

  return (
    <>
      {oneMangas.map((manga) => (
        <div key={manga.id} className="containeur-form-write-critic">
          <div className="div-image-for-critic">
            <Link to={`/mangas/${mangaId}`}>
              <img
                className="arrow-back"
                src={iconArrow}
                alt="image de retour à la page précédente"
              />
            </Link>
            <div className="image-for-critic">
              <img
                className="img-poster-critic"
                src={manga.imagebackground}
                alt="Image background du manga"
              />
            </div>
            <p className="title-manga-in-whrite-critic">{manga.title}</p>
          </div>

          <div className="create-critic">
            <form className="form-create-critic" onSubmit={createCritic}>
              <h1 className="title-critic-page">Créer une critique </h1>
              <div>
                <label htmlFor="title-critic">Titre de votre critique:</label>
                <input
                  type="text"
                  id="title-critic"
                  name="title-critic"
                  required
                  placeholder="Écrit le titre de ta critique....."
                  value={criticTitle}
                  onChange={(e) => setCriticTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="comment-critic">Votre critique:</label>
                <textarea
                  id="comment-critic"
                  name="comment-critic"
                  required
                  placeholder="Écrit le commentaire de ta critique....."
                  value={criticComment}
                  onChange={(e) => setcriticComment(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>

              <div className="invisible-input">
                {mangaId && (
                  <div>
                    <label htmlFor="manga-id">ID du manga:</label>
                    <input
                      type="text"
                      id="manga-id"
                      name="manga-id"
                      value={mangaId}
                      disabled
                    />
                  </div>
                )}
              </div>

              <button type="submit" id="btn-sub-publish">
                Publier
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default WriteCritic;
