import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "/src/assets/icon-heart.png";
import logo from "/src/assets/Manga-Eval-custom.jpg";
import searchIcon from "/src/assets/search-icon.png";
import Modal from "./Modal";

const NavbarModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShowModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="nav-bar">
        <Link to="/">
          <img className="img-logo" src={logo} alt="logo site web" />
        </Link>
        <div className="search-container">
          <input
            type="search"
            id="site-search"
            name="q"
            onKeyPress={handleKeyPress}
            placeholder="Rechercher un manga..."
          />
          <img
            src={searchIcon}
            alt="search icon"
            className="search-icon"
            style={{ width: "15px", height: "15px" }}
          />
        </div>
        <Link to="/favory">
          <img className="icon-heart" src={icon} alt="icon heart" />
        </Link>
        <div className="connectAndSingUp">
          {isLoggedIn ? (
            <p>Vous êtes connecté !</p>
          ) : (
            <>
              <Link to="/connexion">
                <button>CONNEXION</button>
              </Link>
              <Link to="/register">
                <button>INSCRIPTION</button>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout}>Déconnexion</button>
          )}
        </div>
      </div>

      {showModal && <Modal handleCloseModal={() => setShowModal(false)} />}
    </>
  );
};

export default NavbarModal;
