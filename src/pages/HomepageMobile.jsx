import React from "react";
import { Link } from "react-router-dom";

const HomePageMobile = () => {
  return (
    <>
      <NavbarModal />
      <div
        className="div-img-background-mobile  min-h-[100vh] flex flex-col justify-center items-center relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mobile-buttons-container">
          <Link to="/register">
            <button className="no-btn">S'inscrire</button>
          </Link>
          <Link to="/connexion">
            <button className="no-btn">Se connecter</button>
          </Link>
        </div>
        <div className="left-bottom-element">
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

export default HomePageMobile;
