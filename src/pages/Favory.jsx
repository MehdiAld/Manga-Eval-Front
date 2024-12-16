import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import line from "/src/assets/Line3.png";
import citypopBackground from "/src/assets/banner-default.png";
import userLogo from "/src/assets/default-icon.jpg";
import ImageModal from "../components/ImageModel";
import BannerModal from "../components/BannerModal";

const Favory = () => {
  const [likedCritics, setLikedCritics] = useState([]);
  const [error, setError] = useState(null);
  const [isLogoModalOpen, setLogoModalOpen] = useState(false);
  const [isBannerModalOpen, setBannerModalOpen] = useState(false);
  const [user, setUser] = useState({
    profilePicture: userLogo,
    banner: citypopBackground,
  });
  const [favorites, setFavorites] = useState([]);

  const userId = localStorage.getItem("token")
    ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id
    : null;

  useEffect(() => {
    if (userId) {
      const storedFavorites = localStorage.getItem("likedCritics");
      if (storedFavorites) {
        setLikedCritics(JSON.parse(storedFavorites));
      }

      fetchLikedCritics();
      fetchUserProfile();
    }
  }, [userId]);

  const fetchLikedCritics = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `http://localhost:3333/critics/${userId}/liked`
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const data = await response.json();
      setLikedCritics(data);

      setFavorites(data.map((critic) => critic._id));
      // Mise à jour de localStorage
      localStorage.setItem("likedCritics", JSON.stringify(data));
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des critiques aimées:",
        error
      );
      setError(
        "Une erreur est survenue lors de la récupération des critiques."
      );
    }
  };

  const fetchUserProfile = async () => {
    if (!userId) return;
    try {
      const response = await fetch(`http://localhost:3333/auth/user/${userId}`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des données de l'utilisateur."
        );
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur :",
        error
      );
    }
  };

  const saveProfilePicture = async (profilePictureSrc) => {
    try {
      const response = await fetch(
        `http://localhost:3333/auth/${userId}/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePicture: profilePictureSrc }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la photo de profil.");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil:",
        error
      );
    }
  };

  const saveBanner = async (bannerSrc) => {
    try {
      const response = await fetch(
        `http://localhost:3333/auth/${userId}/updateBanner`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ banner: bannerSrc }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la bannière.");
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la bannière :", error);
    }
  };

  const deleteLikedCritic = async (criticId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/critics/${userId}/unlike/${criticId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression : ${response.status}`);
      }

      setLikedCritics((prevCritics) =>
        prevCritics.filter((critic) => critic._id !== criticId)
      );
      setFavorites((prevFavorites) => {
        const updatedFavorites = prevFavorites.filter((id) => id !== criticId);

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la critique :", error);
    }
  };

  const handleLogoClick = (event) => {
    event.stopPropagation();
    setLogoModalOpen(true);
  };

  const handleBannerClick = () => {
    setBannerModalOpen(true);
  };

  const handleSelectLogo = (imageSrc) => {
    setUser((prevUser) => ({ ...prevUser, profilePicture: imageSrc }));
    saveProfilePicture(imageSrc);
    setLogoModalOpen(false);
  };

  const handleSelectBanner = (bannerSrc) => {
    setUser((prevUser) => ({ ...prevUser, banner: bannerSrc }));
    saveBanner(bannerSrc);
    setBannerModalOpen(false);
  };

  return (
    <div className="containeur-favory">
      <div
        className="div-top-fav"
        style={{ backgroundImage: `url(${user.banner})` }}
        onClick={handleBannerClick}
      >
        <img
          src={user.profilePicture}
          alt="User Logo"
          className="img-user-logo"
          onClick={handleLogoClick}
        />
      </div>

      <Link to="/">
        <div className="div-logo-in-favory">
          <img
            className="logo-in-favory"
            src="/src/assets/Manga-Eval-custom.jpg"
            alt="Logo"
          />
        </div>
      </Link>

      <div className="div-user-critic-top">
        <h2>Les critiques aimées :</h2>
        <img src={line} alt="black line" />
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="div-user-critics">
        {likedCritics.length === 0 ? (
          <p>Aucune critique aimée trouvée.</p>
        ) : (
          likedCritics.map(({ _id, title, comment }) => (
            <div className="div-user-critic" key={_id}>
              <h3>{title}</h3>
              <p>{comment}</p>
              <button
                className="btn-delete-critic-fav"
                onClick={() => deleteLikedCritic(_id)}
              >
                Supprimer
              </button>
            </div>
          ))
        )}
      </div>

      <ImageModal
        isOpen={isLogoModalOpen}
        onClose={() => setLogoModalOpen(false)}
        onSelectImage={handleSelectLogo}
      />

      <BannerModal
        isOpen={isBannerModalOpen}
        onClose={() => setBannerModalOpen(false)}
        onSelectBanner={handleSelectBanner}
      />
    </div>
  );
};

export default Favory;
