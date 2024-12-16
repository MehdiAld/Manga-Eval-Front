import React from "react";
import { useNavigate } from "react-router-dom";

const Explanation = () => {
  const navigate = useNavigate(); 

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      

      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: 'black', 
        color: 'white', 
        textAlign: 'center', 
        padding: '0 20px',
      }}>
        
       
        <button 
          onClick={goBack} 
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '10px',
            transition: '0.3s ease-in-out',
          }}
        >
          ← Retour
        </button>

        <h1 style={{
          fontSize: '20px', 
          fontWeight: 'bold', 
          lineHeight: '1.5', 
          margin: 0, 
        }}>
          Ce site est un projet que j'ai réalisé dans le cadre de ma formation. Certaines fonctionnalités ne sont pas et ne seront pas finalisées et sont présentes uniquement pour illustrer le potentiel du projet. Parmi celles-ci, on trouve la possibilité pour les utilisateurs de signaler des bugs, de proposer des mangas qui seront examinés par les administrateurs et, éventuellement, ajoutés à la plateforme. De plus, il y a des boutons permettant de filtrer les mangas par genre.
        </h1>
      </div>
    </>
  );
};

export default Explanation;
