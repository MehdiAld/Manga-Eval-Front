import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import line from "/src/assets/Line3.png";
import logo from "/src/assets/Manga-Eval-custom.jpg";

function Onemanga() {
  const [oneMangas, setOneMangas] = useState([]);
  const [mangaCritics, setMangaCritics] = useState([]);
  const { mangaId } = useParams();

  useEffect(() => {
    fetchMangas(mangaId);
    fetchMangaCritics(mangaId);
  }, [mangaId]);

  const fetchMangas = (mangaId) => {
    fetch(`http://localhost:3333/mangas/${mangaId}`)
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
    fetch(`http://localhost:3333/critics/all/${mangaId}`)
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
            <h3>{manga.title}🖋</h3>
            <div>
              <Link to="/">
                <img className="img-logo-from-onemana" src={logo} alt="logo" />
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
                  <h3 className="write-one-critic">écrire une critique</h3>
                </Link>
              </div>
              <img src={line} alt="black line" />
            </div>
            <div className="div-user-critics">
              {mangaCritics.map((critic) => (
                <div className="div-user-critic" key={critic._id}>
                  <h3 className="title-manga-critic">{critic.title}</h3>
                  <p className="p-manga-critic">{critic.comment}</p>
                  <p>
                    Créé le : {new Date(critic.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
}

export default Onemanga;
