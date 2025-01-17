import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const FomsRegistered = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const createUser = async (e) => {
    e.preventDefault();
    setErrors({ username: "", email: "", password: "" });

    try {
      const response = await axios.post(`${backendUrl}/auth/register`, newUser);
      setNewUser({
        username: "",
        email: "",
        password: "",
      });
      navigate("/");
      console.log("Utilisateur enregistré :", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
      if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error.includes("Nom d'utilisateur déjà pris")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "Nom d'utilisateur déjà pris.",
          }));
        } else if (error.response.data.error.includes("Email déjà associé")) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email déjà associé à un autre compte.",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Erreur lors de l'enregistrement.",
          }));
        }
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
        <form onSubmit={createUser}>
          <p className="title-siteweb">MangaEval</p>
          <div>
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email">Adresse email:</label>
            <input
              type="text"
              id="email"
              name="email"
              required
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              name="password"
              id="inputPassword"
              required
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>

      <div className="problems">
        <button className="no-btn">Tu rencontre un problème ?</button>
        <button className="contact-me no-btn">Contactez-nous</button>
      </div>
    </div>
  );
};

export default FomsRegistered;
