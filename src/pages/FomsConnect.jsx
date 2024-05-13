import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FomsConnect = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3333/auth/login`,
        formData
      );

      const { token, isAdmin } = response.data;
      localStorage.setItem("token", token);

      if (response.data.isAdmin) {
        navigate("/list-users");
      } else {
        navigate("/");
      }
      console.log("Utilisateur connecté :", response.data);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
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
        <form onSubmit={handleSubmit}>
          <p className="title-siteweb title-siteweb2">MangaEval</p>
          <div>
            <label htmlFor="email">Adresse email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Password necessary"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-sub-connect">
            Se connecter
          </button>
        </form>
      </div>
      <div className="problems">
        <button className="no-btn">Tu rencontre un problèmes ? </button>
        <button className="contact-me no-btn">contatez-nous</button>
      </div>
    </div>
  );
};

export default FomsConnect;
