import React, { useState } from "react";
import { Link } from "react-router-dom";


const MangaGallery = ({ mangas }) => {
  const [hoveredManga, setHoveredManga] = useState(null);

  return (
    <div className="container-card">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mangas.map((manga) => (
          <div
            key={manga._id}
            className="div-img-card-in-galery"
            onMouseEnter={() => setHoveredManga(manga)}
            onMouseLeave={() => setHoveredManga(null)}
            style={{ position: "relative" }}
          >
            <Link to={`/mangas/${manga._id}`}>
              <div className="image-container">
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
                    }}
                  >
                    <div className="scroll-text">{manga.title}</div>
                    <div className="scroll-text" style={{ marginTop: "5px" }}>
                      {manga.category}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaGallery;
