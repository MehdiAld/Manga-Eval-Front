import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
              <li>Acceuil</li>
              <li>Nos manga</li>
              <li>Page utilisateur</li>
            </ul>
          </div>
          <div>
            <h3>Catalogues</h3>
            <ul>
              <li>Shonen</li>
              <li>Sheinen</li>
              <li>Science-fiction</li>
            </ul>
          </div>
          <div>
            <h3>Liens Pratiques</h3>
            <ul>
              <li>Manga Proposées</li>
              <li>Signaler un bug</li>
              <li>
                <button>FAQ</button>
              </li>
            </ul>
          </div>
          <div>
            <h3>Me Contacter</h3>
            <ul>
              <li>mehdibad93100@gmail.com</li>
              <li><a href="https://www.linkedin.com/in/mehdi-badi-pro/">Likedin</a></li>
              <li><a href="">Github</a></li>
            </ul>
          </div>
        </div>
        <div className="div-fin-footer">
          <Link to="/CreateManga">
            <h3>Mentions Légales | Copyright © 2024</h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
