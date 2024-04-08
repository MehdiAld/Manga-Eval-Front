import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Onemanga() {
  const [oneMangas, setOneMangas] = useState([]);
  const [oneComment, setComment] = useState([]);

  //   const [nameManga, setNameManga] = useState("All");
  //   const [comment, setComment] = useState([]);
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
        console.log(data.map((i) => i.critic));
        console.log(data);
      });
  };

  return (
    <>
      {oneMangas.map((manga) => (
        <div key={manga.id} className="containeur-page">
          <div className="div-top">
            {/* <div className="div-fixe-left">
              <img
                className="img-onemanga-logo"
                src="/src/assets/Manga-Eval-custom.jpg"
                alt="Logo de manga"
              />

              <div className="div-favorite">
                <img src="/src/assets/icon-heart.png" alt="Coeur"></img>
                <h3>Coup de coeur</h3>
              </div>

              <button className="btn">écrire une critique</button>
            </div>
            <div className="div-img-onemanga">
              <img src={manga.imagesection} alt="manga image" />
            </div> */}

            <div
              className="div-img-onemanga-background"
              style={{
                backgroundImage: `url(${manga.imagebackground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="content-wrapper">
                <img className="image-section" src={manga.imagesection} />

                <div className="manga-info">
                  <h3>{manga.title}</h3>
                  <h5>{manga.category}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="containeur-whrite">
            <div className="sidebar-manga">
              <p>Regarder l'anime</p>
            </div>

            <div className="title-manga">
              <p>Critiques {manga.title} :</p>
            </div>

            <div className="whrite-critic">
              <Link to={`/${mangaId}/whrite-critic`}>
                <p>écrire une critique</p>
              </Link>
            </div>
          </div>

          <div className="div-line">
            <img className="line" src="/src/assets/Line.png" />
          </div>

          <div className="below-text">
            <div className="div-sommaire">
              <div className="sticky-container">
                <div className="sommaire-item">
                  <button className="no-btn">Accés pour le regarder</button>
                </div>
                <div className="sommaire-item">
                  <button className="no-btn">Wiki</button>
                </div>
                <div className="sommaire-item">
                  <button className="no-btn">Description</button>
                </div>
                <div className="sommaire-item">
                  <button className="no-btn">Chronologie</button>
                </div>
                <div className="sommaire-item">
                  <button className="no-btn">Perssonages</button>
                </div>
              </div>
            </div>

            <div className="div-midle">
              <div className="containeur-cards-bottom">
                <div className="containeur-cards">
                  {manga.critic.map((element, i) => (
                    <div key={i} className="card-comment">
                      <h3>{element.title}</h3>
                      <p>{element.comment}</p>
                      <div className="FavAndComment">
                        <Link to="/favory">
                          <img src="/src/assets/iconCoeur.png" />
                        </Link>
                        <Link>
                          <img src="/src/assets/iconComent.png" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="div-filter">
              <div className="sticky-container">
                <div className="filter-item">
                  <button className="no-btn">présélectionner</button>
                </div>
                <div className="filter-item">
                  <button className="no-btn">le plus récent</button>
                </div>
                <div className="filter-item">
                  <button className="no-btn">le moins récent</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </>
  );
}
export default Onemanga;
