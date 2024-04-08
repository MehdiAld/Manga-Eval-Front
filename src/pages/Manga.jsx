import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Manga() {
  const [mangas, setMangas] = useState([]);

  const fetchMangas = () => {
    fetch("http://localhost:3333/mangas/all")
      .then((res) => res.json())
      .then((data) => {
        setMangas(data);
      });
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  // const [nameManga, SetnameManga] = useState("All");
  // const [comment, Setcomment] = useState([]);
  // const { mangaId } = useParams();

  // useEffect(() => {
  //   fetchMangas(mangaId);
  // }, [mangaId]);

  // const fetchMangas = (mangaId) => {
  //   fetch(`http://localhost:3333/mangas/${mangaId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setnameManga(data.title);
  //       console.log(SetnameManga);
  //       setcomment(data.comment);
  //       console.log(Setcomment);
  //     });
  // };

  return (
    <>
      <Navbar />
      <div className="container-background">
        <div className="container-text">
          {/* <h3 className="text-category">Catégories populaire :</h3>
          <h3 className="text-categorys">
            Seinen, Shonen, Science-fiction, Aventure, Fantastique, Romance
          </h3>  */}
          <h1>Les mangas que vous pouvez critiquer</h1>
          <h6 className="text-description">
            Découvrez notre sélection de mangas populaires et variés. Des
            classiques bien établis aux nouvelles séries captivantes. Trouvez
            votre prochaine lecture enrichissante ici. Plongez dans l'univers
            captivant du genre littéraire. 📘
          </h6>
        </div>

        <div className="container-card">
          {mangas.map((manga) => (
            <a
              key={manga._id}
              class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <Link to={`${manga._id}`}>
                <img
                  class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={manga.image}
                  alt="manga image"
                />
                <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {manga.title}
                  </h5>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {manga.category}
                  </p>
                </div>
              </Link>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Manga;
