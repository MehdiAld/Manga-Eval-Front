import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MangaGallery from "../components/MyGalery";

function Manga() {
  const [mangas, setMangas] = useState([]);
  const [filteredMangas, setFilteredMangas] = useState([]);

  const fetchMangas = () => {
    fetch("http://localhost:3333/mangas/all")
      .then((res) => res.json())
      .then((data) => {
        setMangas(data);
        setFilteredMangas(data); // Initialisation avec tous les mangas
      });
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = mangas.filter((manga) =>
      manga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMangas(filtered);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container-background">
        <div className="container-text">
          <h1>Les mangas que vous pouvez critiquer</h1>
          <h6 className="text-description">
            Découvrez notre sélection de mangas populaires et variés. Des
            classiques bien établis aux nouvelles séries captivantes. Trouvez
            votre prochaine lecture enrichissante ici. Plongez dans l'univers
            captivant du genre littéraire. 📘
          </h6>
        </div>

        <MangaGallery mangas={filteredMangas} />

        <Footer />
      </div>
    </>
  );
}

export default Manga;
