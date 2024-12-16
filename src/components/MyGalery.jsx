import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MangaGallery = ({ mangas, onDelete, onEdit, isAdmin }) => {
  const [hoveredManga, setHoveredManga] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imagebackground: "",
    imagesection: "",
    category: "",
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModal = (manga) => {
    setSelectedManga(manga);
    setFormData({
      title: manga.title,
      image: manga.image,
      imagebackground: manga.imagebackground,
      imagesection: manga.imagesection,
      category: manga.category,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    try {
      await onEdit(selectedManga._id, formData);
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la modification du manga :", error);
    }
  };

  return (
    <div className="container-card">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mangas.map((manga) => (
          <div
            key={manga._id}
            className="div-img-card-in-galery"
            onMouseEnter={() => setHoveredManga(manga)}
            onMouseLeave={() => setHoveredManga(null)}
            style={{
              position: "relative",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link to={`/mangas/${manga._id}`} className="image-container">
              <img
                className="max-w-full max-h-full rounded-lg"
                src={manga.image}
                alt="manga image"
                style={{ display: "block", marginBottom: "0" }}
              />
            </Link>

            {/* Affichage du nom et catégorie lors du survol (PC) */}
            {hoveredManga === manga && !isMobile && (
              <div
                className="text-overlay"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                <div>{manga.title}</div>
                <div>{manga.category}</div>
              </div>
            )}

            {/* Affichage des boutons */}
{(isMobile || hoveredManga === manga) && isAdmin && (
  <div
    className="buttons-container"
    style={{
      position: isMobile ? "static" : "absolute", // Si mobile, on ne met pas de position absolue
      bottom: isMobile ? "10px" : "10px", // Si mobile, ils seront en bas sous l'image
      right: isMobile ? "0" : "10px", // Si mobile, on n'utilise pas 'right' pour les centrer
      left: isMobile ? "0" : undefined, // Pour PC, on place à droite, sur mobile, on le centre
      display: "flex",
      justifyContent: isMobile ? "center" : "flex-end", // Si mobile, centré en bas
      gap: "10px",
    }}
  >
    <button
      className="icon-button"
      onClick={(e) => {
        e.stopPropagation();
        openModal(manga);
      }}
      style={{
        width: "36px",
        height: "36px",
      }}
    >
      <img
        src="/src/assets/crayon.png"
        alt="Edit"
        style={{ width: "16px", height: "16px" }}
      />
    </button>
    <button
      className="icon-button"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(manga._id);
      }}
      style={{
        width: "36px",
        height: "36px",
      }}
    >
      <img
        src="/src/assets/croix.png"
        alt="Delete"
        style={{ width: "16px", height: "16px" }}
      />
    </button>
  </div>
)}

          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>

            <h2>Modifier le manga</h2>
            <label>
              Titre:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Image:
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </label>
            <label>
              Image de fond:
              <input
                type="text"
                name="imagebackground"
                value={formData.imagebackground}
                onChange={handleChange}
              />
            </label>
            <label>
              Image de section:
              <input
                type="text"
                name="imagesection"
                value={formData.imagesection}
                onChange={handleChange}
              />
            </label>
            <label>
              Catégorie:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleEdit}>Enregistrer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaGallery;
