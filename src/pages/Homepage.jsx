import React from "react";
import { Link } from "react-router-dom";
import NavbarModal from "../components/NavbarModal";

const HomePage = () => {
  return (
    <>
      <NavbarModal />
      <div className="container">
        <div className="div-img-background">
          <div className="left-bottom-element">
            <h1 className="title-web-site">MangaEval</h1>
            <h3 className="paragraphe-website">
              Donne ton avis sur tes œuvres préférées <br />
              de l'univers de l'animation japonaise ✍
            </h3>
            <Link to="/mangas">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Les critiques !!!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
