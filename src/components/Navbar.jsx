import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import icon from "/src/assets/icon-heart.png";
import logo from "/src/assets/Manga-Eval-custom.jpg";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));
  }, []);

  const handleChange = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
    onSearch(searchText);
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
        <input
          type="search"
          id="site-search"
          placeholder="Rechercher un manga..."
          name="q"
          value={searchTerm}
          onChange={handleChange}
        />
        <Link to="/favory">
          <img className="icon-heart" src={icon} alt="icon heart" />
        </Link>
        <div className="connectAndSingUp">
          {isLoggedIn ? (
            <>
              <p>Vous êtes connecté !</p>
              <button onClick={handleLogout}>Déconnexion</button>{" "}
            </>
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
