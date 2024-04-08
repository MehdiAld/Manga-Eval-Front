import React, { useEffect, useState } from "react";
import iconArrow from "/src/assets/arrow.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const WhriteCritic = () => {
  const [oneMangas, setOneMangas] = useState([]);
  const [oneComment, setComment] = useState([]);
  const [criticTitle, setCriticTitle] = useState("");
  const [criticComment, setcriticComment] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { mangaId } = useParams();

  useEffect(() => {
    fetchMangas(mangaId);
  }, [mangaId]);

  const fetchMangas = (mangaId) => {
    fetch(`http://localhost:3333/mangas/${mangaId}`)
      .then((res) => res.json())
      .then((data) => {
        setOneMangas(data);
        setComment(data.critic);
        console.log(setOneMangas);
        console.log(setComment);
      });
  };

  const createCritic = async () => {
    if (!criticTitle || !criticComment) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3333/critics/${mangaId}/critic`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: criticTitle, // Utilisation de criticTitle
            comment: criticComment, // Utilisation de criticComment
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      // Réinitialiser les champs après la création réussie
      setCriticTitle("");
      setcriticComment("");
      setError(null);

      navigate(`/mangas/${mangaId}`);

      await new Promise((resolve) => setTimeout(resolve, 100));
      // Vous pouvez également effectuer d'autres actions si nécessaire
    } catch (error) {
      console.error("Erreur lors de la création de la critique :", error);
      setError("Erreur lors de la création de la critique.");
    }
  };

  return (
    <>
      {oneMangas.map((manga) => (
        <div key={manga.id} className="containeur-form-whrite-critic">
          <div className="div-image-for-critic">
            <Link to="/">
              <img
                className="arrow-back"
                src={iconArrow}
                alt="picture arrow for back homepage"
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

export default WhriteCritic;
