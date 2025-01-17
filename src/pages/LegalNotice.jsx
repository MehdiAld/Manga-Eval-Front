import React from "react";
import { useNavigate } from "react-router-dom";

const LegalNotice = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        color: "#333",
        maxWidth: "800px",
        minHeight: "90vh",
        margin: "40px auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom: "40px",
      }}
    >
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "transparent",
          border: "none",
          color: "black",
          fontSize: "18px",
          cursor: "pointer",
          padding: "10px",
          transition: "0.3s ease-in-out",
        }}
      >
        ← Retour
      </button>

      <h1
        style={{
          fontSize: "24px",
          textAlign: "center",
          marginBottom: "20px",
          color: "#222",
        }}
      >
        Mentions légales
      </h1>
      <p>
        Ce site est un projet de formation à titre éducatif. Il n’a aucune
        vocation commerciale.
      </p>
      <h2 style={{ fontSize: "20px", marginTop: "20px" }}>
        Responsable du site
      </h2>
      <p>
        Ce site est développé et maintenu par moi-même. Si vous avez des
        questions ou des remarques, vous pouvez me contacter à l’adresse
        suivante :{" "}
        <a href="mailto:mehdibad93100@gmail.com">mehdibad93100@gmail.com</a>.
      </p>
      <h2 style={{ fontSize: "20px", marginTop: "20px" }}>Hébergement</h2>
      <p>
        Hébergeur : Vercel Inc.
        <br />
        Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
        <br />
        Site web :{" "}
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          https://vercel.com
        </a>
      </p>
      <h2 style={{ fontSize: "20px", marginTop: "20px" }}>
        Clause concernant les images
      </h2>
      <p>
        Les images utilisées sur ce site sont la propriété de leurs auteurs
        respectifs. Elles sont utilisées à titre illustratif dans le cadre d’un
        projet de formation non commercial.
      </p>
      <p>
        Si vous êtes titulaire des droits d’une image et souhaitez qu’elle soit
        retirée ou que des crédits spécifiques soient ajoutés, veuillez me
        contacter à l’adresse suivante :{" "}
        <a href="mailto:mehdibad93100@gmail.com">mehdibad93100@gmail.com</a>.
      </p>
    </div>
  );
};

export default LegalNotice;
