import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heartIcon from "/src/assets/icon-heart.png"; 
import userIcon from "/src/assets/user.png"; 
import logo from "/src/assets/Manga-Eval-custom.jpg";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(Boolean(token));

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded Token: ", decodedToken);
        setIsAdmin(decodedToken.isAdmin); 
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    }
  }, []);

  const handleChange = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
    onSearch(searchText);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false); 
    setUserId(null);
    console.log("Déconnexion réussie !");
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
        
       
        <Link to={isLoggedIn ? (isAdmin ? "/explanation" : "/favory") : "/register"}>
  <img 
    className={`icon-heart ${isAdmin ? 'icon-notification' : ''}`} 
    src={isAdmin ? "/src/assets/alarme.png" : heartIcon} 
    alt={isAdmin ? "icon notification" : "icon heart"} 
  />
</Link>

       
<Link to={isLoggedIn ? (isAdmin ? "/list-users" : `/profil/${userId}`) : "/register"}>
  <img className="icon-user" src={userIcon} alt="User Icon" />
</Link>

        
        
        <div className="connectAndSingUp">
          {isLoggedIn ? (
            <>
              <p>Vous êtes connecté !</p>
              <button onClick={handleLogout}>Déconnexion</button>
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
