import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarMobile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setIsLoggedIn(true);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        setIsLoggedIn(false);
        setUserId(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  return (
    <>
      <div className="navbar-mobile">
        <div className="icons-NavbarMobile">
          <img
            className="icon-NavbarMobile icon-NavbarMobile1"
            src="/src/assets/home.png"
            alt="icon home"
          />
          <img
            className="icon-NavbarMobile icon-NavbarMobile2"
            src="/src/assets/book.png"
            alt="icon manga"
          />
          <img
            className="icon-NavbarMobile icon-NavbarMobile3"
            src="/src/assets/user.png"
            alt="icon profil"
          />
          <img
            className="icon-NavbarMobile icon-NavbarMobile4"
            src="/src/assets/icon-heart.png"
            alt="icon favory"
          />
          <img
            className="icon-NavbarMobile icon-NavbarMobile4"
            src="/src/assets/setting.png"
            alt="icon setting"
          />
        </div>

        <div className="text-icon-mobile">
          <Link to="/">
            <h6 className="text-icon-mobile1">Acceuil</h6>
          </Link>
          <Link to="/mangas">
            <h6 className="text-icon-mobile2">Manga</h6>
          </Link>
          <Link to={isLoggedIn ? `/profil/${userId}` : "/register"}>
            <h6 className="text-icon-mobile3">Profil</h6>
          </Link>
          <Link to="/favory">
            <h6 className="text-icon-mobile4">Favori</h6>
          </Link>
          <Link to="/explanation">
            <h6 className="text-icon-mobile5">Paramètre</h6>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
