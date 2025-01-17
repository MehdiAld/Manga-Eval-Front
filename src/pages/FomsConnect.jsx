import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const FomsConnect = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAdmin !== null) {
      navigate(isAdmin ? "/list-users" : "/");
    }
  }, [isAdmin, navigate]);

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
      const response = await axios.post(`${backendUrl}/auth/login`, formData);

      const { token } = response.data;
      localStorage.setItem("token", token);
      checkIsAdmin(token);

      toast.success("Connexion réussie !");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Erreur lors de la connexion. Vérifiez vos identifiants.");
    }
  };

  const checkIsAdmin = (token) => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const isAdmin = decodedToken.isAdmin;
        setIsAdmin(isAdmin);
      } catch (error) {
        setIsAdmin(false);
      }
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      navigate("/");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <Link to="/">
          <button className="btn btn-register">Retour</button>
        </Link>
      </div>

      <div className="div-form-register" ref={formRef}>
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
        <button className="no-btn">Tu rencontre un problème ? </button>
        <button className="contact-me no-btn">Contactez-nous</button>
      </div>
    </div>
  );
};

export default FomsConnect;
