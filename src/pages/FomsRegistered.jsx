import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const FomsRegistered = () => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    try {
      const response = await axios.post(
        `http://localhost:3333/auth/register`,
        newUser
      );

      // Mettre à jour l'état des utilisateurs avec la nouvelle donnée
      setNewUser({
        username: "",
        email: "",
        password: "",
      });

      console.log("Utilisateur enregistré :", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
    }
  };

  return (
    <div
      className="img-background-register"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url('/src/assets/wallpaper-vg.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div className="div-box-register">
        {" "}
        <Link to="/">
          <button className="btn btn-register">Retour</button>
        </Link>
      </div>
      <div className="div-form-register">
        <form onSubmit={createUser}>
          <p className="title-siteweb">MangaEval</p>
          <div>
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={newUser.username} // Associez la valeur à newUser.username
              onChange={
                (e) => setNewUser({ ...newUser, username: e.target.value }) // Mettez à jour newUser.username
              }
            />
          </div>
          <div>
            <label htmlFor="email">Adresse email:</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={newUser.email} // Associez la valeur à newUser.email
              onChange={
                (e) => setNewUser({ ...newUser, email: e.target.value }) // Mettez à jour newUser.email
              }
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="text"
              required
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <div className="problems">
        <button className="no-btn">Tu rencontre un problèmes ? </button>
        <button className="contact-me no-btn">contatez-nous</button>
      </div>
    </div>
  );
};

export default FomsRegistered;
