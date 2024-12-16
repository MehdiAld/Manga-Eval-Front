import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3333/auth/all");
      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3333/auth/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      fetchUsers();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    console.log("SelectedUserId:", selectedUserId); 
    try {
      const response = await fetch(
        `http://localhost:3333/auth/edit/${selectedUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: newUsername }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur réseau ou côté serveur");
      }

      fetchUsers();
      setShowCustomModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };

  const openCustomModal = (userId) => {
    setSelectedUserId(userId);
    setShowCustomModal(true);
  };

  const closeCustomModal = () => {
    setShowCustomModal(false);
    setSelectedUserId(null);
  };

  return (
    <>
      <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-black flex items-center justify-between pt-8">
  Liste des utilisateurs
  <Link to="/" className="link-with-img">
    <img className="w-16 h-auto" src="src/assets/Manga-Eval-custom.jpg" alt="Image" />
  </Link>
</h2>



        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="p-3 bg-gray-100 border border-gray-300 text-left font-bold">
                  User
                </th>
                <th className="p-3 bg-gray-100 border border-gray-300 text-left font-bold">
                  Email Address
                </th>
                <th className="p-3 bg-gray-100 border border-gray-300 text-left font-bold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-3 border border-gray-300 text-left">
                    {user.username}
                  </td>
                  <td className="p-3 border border-gray-300 text-left">
                    {user.email}
                  </td>
                  <td className="p-3 border border-gray-300 text-left">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                      onClick={() => openCustomModal(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => openDeleteModal(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {showDeleteModal && (
        <div
          id="popup-modal"
          className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-black text-xl font-bold mb-4">
              Confirmation de suppression
            </h2>
            <p className="text-black">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                onClick={() => deleteUser(selectedUserId)}
              >
                Oui
              </button>
              <button
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={closeDeleteModal}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showCustomModal && (
        <div
          id="custom-modal"
          className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div className="bg-white rounded-lg p-6" style={{ width: "400px" }}>
            <h2 className="text-black text-xl font-bold mb-4">
              Modal de modification
            </h2>
            <p className="text-black">
              Vous voulez modifier le nom de l'utilisateur ?
            </p>
            <form
              className="mt-4"
              onSubmit={handleUpdateUser}
              style={{ width: "100%" }}
            >
              <div className="mb-4">
                <label
                  htmlFor="new-username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nouveau nom d'utilisateur :
                </label>
                <input
                  type="text"
                  id="new-username"
                  name="new-username"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
                  onClick={closeCustomModal}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Appliquer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ListUser;
