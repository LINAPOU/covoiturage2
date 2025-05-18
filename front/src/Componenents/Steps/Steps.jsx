import React from "react";
import "./Steps.css";
import { FaSearchLocation, FaTicketAlt, FaCar } from "react-icons/fa";

const Steps = () => {
  const steps = [
    {
      title: "1. Recherchez votre trajet",
      description:
        "Entrez votre lieu de départ et votre destination pour découvrir les trajets disponibles proposés par des conducteurs.",
      icon: <FaSearchLocation className="step-icon" />,
    },
    {
      title: "2. Réservez votre place",
      description:
        "Choisissez le trajet qui vous convient le mieux et réservez votre place en quelques clics.",
      icon: <FaTicketAlt className="step-icon" />,
    },
    {
      title: "3. Voyagez ensemble",
      description:
        "Retrouvez votre conducteur au point de rendez-vous et profitez du trajet ensemble en toute sécurité.",
      icon: <FaCar className="step-icon" />,
    },
  ];

  return (
    <div className="comment-page">
      <h1 className="main-title">Comment ça marche ?</h1>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <h2 className="step-title">{step.title}</h2>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>© 2025 Covoiturage MOBRIDE - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default Steps;
