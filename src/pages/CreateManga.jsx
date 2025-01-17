import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CreateManga = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imagebackground: "",
    imagesection: "",
    category: "",
  });

  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données du formulaire :", formData);
    try {
      const response = await fetch(`${backendUrl}/mangas/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Réponse du serveur après la création :", data);

      setFormData({
        title: "",
        image: "",
        imagebackground: "",
        imagesection: "",
        category: "",
      });

      navigate("/mangas");
    } catch (error) {
      console.error("Erreur lors de la création du manga :", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        navigate("/mangas");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: "url('/src/assets/wallpaper-vg.png')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 bg-gray-100 rounded-lg"
        style={{ height: "80vh" }}
      >
        <label className="block mb-2 text-sm">
          Titre:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input mt-1 block w-full text-sm"
            required
          />
        </label>
        <label className="block mb-2 text-sm">
          Image du manga :
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-input mt-1 block w-full text-sm"
            required
          />
        </label>
        <label className="block mb-2 text-sm">
          Image background:
          <input
            type="text"
            name="imagebackground"
            value={formData.imagebackground}
            onChange={handleChange}
            className="form-input mt-1 block w-full text-sm"
            required
          />
        </label>
        <label className="block mb-2 text-sm">
          Image icon:
          <input
            type="text"
            name="imagesection"
            value={formData.imagesection}
            onChange={handleChange}
            className="form-input mt-1 block w-full text-sm"
            required
          />
        </label>

        <label className="block mb-2 text-sm">
          Catégorie:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-input mt-1 block w-full text-sm"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Créer le manga
        </button>
      </form>
    </div>
  );
};

export default CreateManga;
