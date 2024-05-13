import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import iconArrow from "/src/assets/arrow.png";

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
    fetch(`http://localhost:3333/mangas/${mangaId}`)
      .then((res) => res.json())
      .then((data) => {
        setOneMangas(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du manga:", error);
      });
  };

  const createCritic = async (event) => {
    event.preventDefault();
    if (!criticTitle || !criticComment) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!mangaId) {
      console.error("ID du manga manquant");
      return;
    }

    if (!userId) {
      console.error("ID de l'utilisateur manquant");
      return;
    }

    console.log("Données de la critique à envoyer à l'API :", {
      title: criticTitle,
      comment: criticComment,
      mangaId: mangaId,
      userId: userId,
    });

    try {
      const response = await fetch(
        `http://localhost:3333/critics/add/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: criticTitle,
            comment: criticComment,
            mangaId: mangaId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      // Réinitialisez les états après la soumission réussie
      setCriticTitle("");
      setcriticComment("");
      setError(null);

      navigate(`/mangas/${mangaId}`);
    } catch (error) {
      console.error("Erreur lors de la création de la critique :", error);
      setError("Erreur lors de la création de la critique.");
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
            <p className="ddd">{manga.title}</p>
          </div>

          <div className="create-critic">
            <form className="form-create-critic" onSubmit={createCritic}>
              <h1 className="title-critic-page">Créer une critique </h1>
              <div>
                <label htmlFor="title-critic">Titre de votre critique:</label>
                <input
                  type="title-critic"
                  id="title-critic"
                  name="title-critic"
                  required
                  value={criticTitle}
                  onChange={(e) => setCriticTitle(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="comment-critic">Votre critique:</label>
                <input
                  type="text"
                  id="comment-critic"
                  name="comment-critic"
                  required
                  value={criticComment}
                  onChange={(e) => setcriticComment(e.target.value)}
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
