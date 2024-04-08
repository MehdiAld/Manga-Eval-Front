import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="div-img-background">
          <div className="left-bottom-element">
            <h1 className="title-web-site">MangaEval</h1>
            <h3 className="paragraphe-website">
              Donne ton avis sur tes œuvres préférées <br />
              de l'univers de l'animation japonaise ✍
            </h3>
            <Link to="/mangas">
              <button className="btn btn-website">Les critiques !!! </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
