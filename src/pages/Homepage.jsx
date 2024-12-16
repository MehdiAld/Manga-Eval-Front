import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useParams, Navigate, useNavigate } from "react-router-dom";
import NavbarModal from "../components/NavbarModal";
import backgroundImage from "/src/assets/MangaEval-Homepage.png";

const UserProfile = () => {
  const { userId } = useParams();  
  const navigate = useNavigate();

  if (!userId) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Profil Utilisateur</h1>
      <p>ID de l'utilisateur : {userId}</p>
    </div>
  );
};

const HomePageContent = ({ isLoggedIn, userId }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480); // Détecte si on est sur mobile (<480px)
    };

    handleResize(); // Exécuter une fois à l'initialisation
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isMobile && <NavbarModal />} {/* Masque la navbar sur mobile */}
      <div
        className={`div-img-background ${isMobile ? "min-h-[100vh]" : "min-h-[90vh]"} flex flex-col justify-center items-center relative`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 md:hidden backdrop-blur-lg z-0"></div>

        {isLoggedIn ? (
          <div className="flex justify-center items-center w-full md:hidden relative z-10">
            <Link to="/mangas">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Découvrir les mangas
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full md:hidden relative z-10 space-y-4">
            <Link to="/register">
              <button className="no-btn">S'inscrire</button>
            </Link>
            <Link to="/connexion">
              <button className="no-btn">Se connecter</button>
            </Link>
          </div>
        )}

        <div className="left-bottom-element absolute bottom-24 left-6">
          <h1 className="title-web-site">MANGA EVAL</h1>
          <h3 className="paragraphe-website">
            Donne ton avis sur tes œuvres préférées <br />
            de l'univers de l'animation japonaise ✍
          </h3>
          <Link to="/mangas">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Les critiques !!!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Token décodé :", decodedToken);

        setIsLoggedIn(true);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageContent isLoggedIn={isLoggedIn} userId={userId} />} />
        <Route path="profil/:userId" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default HomePage;
