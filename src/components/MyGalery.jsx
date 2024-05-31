import React, { useState } from "react";
import { Link } from "react-router-dom";

const MangaGallery = ({ mangas, onDelete, onEdit, isAdmin }) => {
  console.log("isAdmin:", isAdmin);

  const [hoveredManga, setHoveredManga] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedManga, setSelectedManga] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imagebackground: "",
    imagesection: "",
    category: "",
  });

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
            }}
          >
            <Link to={`/mangas/${manga._id}`} className="image-container">
              <img
                className="max-w-full max-h-full rounded-lg"
                src={manga.image}
                alt="manga image"
              />
              {hoveredManga === manga && (
                <div
                  className="text-overlay"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "5px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="scroll-text">{manga.title}</div>
                  <div className="scroll-text" style={{ marginTop: "5px" }}>
                    {manga.category}
                  </div>
                </div>
              )}
            </Link>
            {hoveredManga === manga && isAdmin && (
              <div
                className="buttons-container"
                style={{ position: "absolute", bottom: "10px", right: "10px" }}
              >
                <button
                  className="icon-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(manga);
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
