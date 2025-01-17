import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import line from "/src/assets/Line3.png";
import icon from "/src/assets/city.jpg";
import ImageModal from "../components/ImageModel";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserProfil = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [critics, setCritics] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndCritics = async () => {
      try {
        const userResponse = await fetch(`${backendUrl}/auth/user/${userId}`);
        if (!userResponse.ok) {
          throw new Error(
            "Erreur lors de la récupération des données de l'utilisateur."
          );
        }
        const userData = await userResponse.json();
        setUser(userData);

        if (userData.critics && userData.critics.length > 0) {
          const criticResponses = await Promise.all(
            userData.critics.map((criticId) =>
              fetch(`${backendUrl}/critics/${criticId}`).then((res) => {
                if (!res.ok) {
                  throw new Error(
                    "Erreur lors de la récupération des critiques."
                  );
                }
                return res.json();
              })
            )
          );
          setCritics(criticResponses);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCritics();
  }, [userId]);

  const handleProfilePictureClick = () => {
    setModalOpen(true);
  };

  const handleSelectImage = async (imageSrc) => {
    setUser((prevUser) => ({ ...prevUser, profilePicture: imageSrc }));

    try {
      const response = await fetch(
        `${backendUrl}/auth/${userId}/updateProfile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profilePicture: imageSrc }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la photo de profil.");
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil:",
        error
      );
    }

    setModalOpen(false);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Utilisateur non trouvé.</p>;

  return (
    <>
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectImage={handleSelectImage}
      />
      <div className="containeur-user-critic">
        <div>
          <Link to="/">
            <img
              className="arrow-back"
              src="../src/assets/arrow.png"
              alt="Retour"
            />
          </Link>
        </div>
        <div className="div-logo-user">
          <img
            src={user.profilePicture || icon}
            alt={user.profilePicture ? "Profil" : "Profil par défaut"}
            onClick={handleProfilePictureClick}
          />
          <p>{user.username}</p>
        </div>
        <div className="div-user-critic-top">
          <h2>Les critiques de {user.username} :</h2>
          <img src={line} alt="black line" />
        </div>
        <div className="div-user-critics">
          {critics.length > 0 ? (
            critics
              .filter((critic) => critic && !critic.deleted)
              .map((critic, index) => (
                <div className="div-user-critic" key={critic._id}>
                  <h3>Critique n°{index + 1}</h3>
                  <h4>{critic.title}</h4>
                  <p>{critic.comment}</p>
                </div>
              ))
          ) : (
            <p>Aucune critique trouvée.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfil;
