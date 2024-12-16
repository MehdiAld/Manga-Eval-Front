import React from "react";

const ImageModal = ({ isOpen, onClose, onSelectImage }) => {
  const images = [
    "/src/assets/luffy-icon.png",
    "/src/assets/zoro-icon.png",
    "/src/assets/sanji-icon.png",
    "/src/assets/nami-icon.png",
    "/src/assets/franky-icon.png",
    "/src/assets/usopp-icon.png",
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Choisir une image de profil</h2>
        <button onClick={onClose}>Fermer</button>
        <div className="image-gallery">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index + 1}`}
              onClick={() => onSelectImage(src)}
              className="thumbnail"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
