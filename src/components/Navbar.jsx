import React from "react";
import { Link } from "react-router-dom";
import icon from "/src/assets/icon-heart.png";
import logo from "/src/assets/Manga-Eval-custom.jpg";

const Navbar = () => {
  return (
    <>
      <div className="nav-bar">
        <Link to="/">
          <img className="img-logo" src={logo} alt="logo site web" />
        </Link>
        <input type="search" id="site-search" name="q" />
        <Link to="/favory">
          <img className="icon-heart" src={icon} alt="icon heart" />
        </Link>
        <div className="connectAndSingUp">
          <Link to="/connexion">
            <button>CONNEXION</button>
          </Link>
          <Link to="/register">
            <button>INSCRIPTION</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
