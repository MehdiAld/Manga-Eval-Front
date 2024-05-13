import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 


const Modal = ({ handleCloseModal }) => {
  const [mangas, setMangas] = useState([]);

  const fetchMangas = () => {
    fetch("http://localhost:3333/mangas/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Mangas récupérés :", data); 
        setMangas(data);
      });
  };

  useEffect(() => {
    fetchMangas();
  }, []);

  return (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        {mangas.map((manga) => (
          <Link to={`/mangas/${manga._id}`} key={manga._id}>
            <div className="modal-header">
              <img
                src={manga.imagesection}
                alt="Affiche"
                className="modal-image"
                style={{ width: "150px", height: "auto" }}
              />
              <div className="modal-title">
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {manga.title}
                </h2>
                <p style={{ fontSize: "18px" }}> {manga.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Modal;
