import React, { useEffect, useState } from "react";
import line from "/src/assets/Line3.png";

const Favory = () => {
  // Récupérer les IDs des critiques aimées depuis le localStorage
  const likedCriticsIds =
    JSON.parse(localStorage.getItem("likedCritics")) || [];

  // Charger les critiques aimées à partir de votre API en utilisant les IDs
  const [likedCritics, setLikedCritics] = useState([]);

  useEffect(() => {
    // Charger les critiques aimées depuis l'API en utilisant les IDs
    // Remplacez cette logique par l'appel à votre API
    // fetchLikedCritics(likedCriticsIds);

    // Exemple de logique de chargement des critiques aimées à partir d'une API factice
    const fetchLikedCritics = async () => {
      const fetchedCritics = await Promise.all(
        likedCriticsIds.map(async (criticId) => {
          const response = await fetch(
            `http://localhost:3333/critics/${criticId}`
          );
          const critic = await response.json();
          return critic;
        })
      );

      setLikedCritics(fetchedCritics);
    };

    fetchLikedCritics();
  }, [likedCriticsIds]);

  return (
    <>
      <div className="containeur-favory">
        <div className="div-top-fav">
          <img
            className="img-user-logo"
            src="https://preview.redd.it/one-piece-icons-by-me-v0-qweam8vkaxv91.jpg?width=640&crop=smart&auto=webp&s=9b7bdc3f934afe5a90f906d0d694c26ea83ff196"
          />
        </div>
        <div className="div-user-critic-top div-userlike-top">
          <h2>Vos Favoris :</h2>
          <img src={line} alt="black line" />
        </div>
        <div className="div-user-critics">
          {/* Afficher les critiques aimées */}
          {likedCritics.map((critic, index) => (
            <div key={index} className="div-user-critic">
              <h3>{`Critique n°${index + 1}`}</h3>
              <p>{critic.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Favory;
