import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Décodage du payload JWT
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        setUserId(null); // Reset en cas d'erreur
      }
    }
  }, []);

  return (
    <>
      <div className="footer">
        <div className="social-network">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png"
            alt="linkedin icon"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/640px-Instagram_icon.png"
            alt="instagram icon"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
            alt="x(twitter) icon "
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png"
            alt="discord icon"
          />
        </div>
        <div className="bottom-footer">
          <div>
            <h3>MangaEval</h3>
            <ul>
              <Link to="/">
                <li>Accueil</li>
              </Link>
              <Link to="/mangas">
                <li>Nos mangas</li>
              </Link>
              {userId ? (
                <Link to={`/profil/${userId}`}>
                  <li>Page utilisateur</li>
                </Link>
              ) : (
                <li>Connectez-vous pour accéder à votre page</li>
              )}
            </ul>
          </div>
          <div>
            <h3>Catalogues</h3>
            <ul>
              <Link to="/explanation">
                <li>Shonen</li>
              </Link>
              <Link to="/explanation">
                <li>Seinen</li>
              </Link>
              <Link to="/explanation">
                <li>Science-fiction</li>
              </Link>
            </ul>
          </div>
          <div>
            <h3>Liens Pratiques</h3>
            <ul>
              <Link to="/explanation">
                <li>Manga Proposés</li>
              </Link>
              <Link to="/explanation">
                <li>Signaler un bug</li>
              </Link>
              <li>
                <Link to="/explanation">
                  <button>FAQ</button>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Me Contacter</h3>
            <ul>
              <li>
                <a href="mailto:roro@gmail.com?subject=Demande%20d'information&body=Bonjour,%20je%20voudrais%20en%20savoir%20plus%20sur%20votre%20site.">
                  Envoyer un email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mehdi-badi-pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/MehdiAld"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="div-fin-footer">
          <Link to="/legalnotice">
            <h3>Mentions Légales | Copyright © 2024</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
