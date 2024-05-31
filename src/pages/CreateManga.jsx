import React, { useState } from "react";

const CreateManga = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    imagebackground: "",
    imagesection: "",
    category: "",
  });

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
      const response = await fetch("http://localhost:3333/mangas/add", {
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
    } catch (error) {
      console.error("Erreur lors de la création du manga :", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
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
