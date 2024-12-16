import React from "react";

const BannerModal = ({ isOpen, onClose, onSelectBanner }) => {
  const banners = [
    "/src/assets/citypop.jpg",
    "/src/assets/sky.jpg",
    "/src/assets/bike.jpg",
    "/src/assets/bleu.jpeg",
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Choisir une bannière</h2>
        <button onClick={onClose}>Fermer</button>
        <div className="image-gallery">
          {banners.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Bannière ${index + 1}`}
              onClick={() => onSelectBanner(src)}
              className="thumbnail"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerModal;
