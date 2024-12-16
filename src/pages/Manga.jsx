import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MangaGallery from "../components/MyGalery";
import { Link } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";

function Manga() {
  const [mangas, setMangas] = useState([]);
  const [filteredMangas, setFilteredMangas] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchMangas();
    checkIsAdmin();
  }, []);

  const fetchMangas = () => {
    fetch("http://localhost:3333/mangas/all")
      .then((res) => res.json())
      .then((data) => {
        setMangas(data);
        setFilteredMangas(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des mangas:", error)
      );
  };

  const checkIsAdmin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Token décodé :", decodedToken);
        setIsAdmin(decodedToken.isAdmin);
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
      }
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = mangas.filter((manga) =>
      manga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMangas(filtered);
  };

  const handleDelete = async (mangaId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/mangas/delete/${mangaId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      fetchMangas();
    } catch (error) {
      console.error("Erreur lors de la suppression du manga :", error);
    }
  };

  const handleEdit = async (mangaId, newData) => {
    try {
      const response = await fetch(
        `http://localhost:3333/mangas/edit/${mangaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      fetchMangas();
    } catch (error) {
      console.error("Erreur lors de la modification du manga :", error);
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container-background container-background-mobile">
        <div className="container-text">
          <h1>Les mangas que vous pouvez critiquer</h1>
          <h6 className="text-description">
            Découvrez notre sélection de mangas populaires et variés. Des
            classiques bien établis aux nouvelles séries captivantes. Trouvez
            votre prochaine lecture enrichissante ici. Plongez dans l'univers
            captivant du genre littéraire. 📘
            
          </h6>
          {isAdmin && (
            <Link to="/CreateManga">
              <img className="img-for-create-manga-admin" src="src/assets/plus.png" />
            </Link>
          )}
        </div>

        <MangaGallery
          mangas={filteredMangas}
          onDelete={handleDelete}
          onEdit={handleEdit}
          isAdmin={isAdmin}
        />

        <Footer />

       
      </div>
      <NavbarMobile />
    </>
  );
}

export default Manga;
