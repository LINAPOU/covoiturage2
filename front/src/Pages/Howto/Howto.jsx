import React from "react";
import { FaCar, FaClipboardCheck, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Howto.css";

function Howto() {
  const steps = [
    {
      title: "1. Inscrivez vous",
      description:
        "Ajoutez vos informations et configurez votre profil conducteur en quelques minutes.",
      icon: <FaCar className="driver__icon" />,
    },
    {
      title: "2. Proposez un trajet",
      description:
        "Indiquez vos lieux de départ, d’arrivée et vos horaires. Publiez votre trajet pour le rendre visible.",
      icon: <FaClipboardCheck className="driver__icon" />,
    },
    {
      title: "3. Voyagez avec vos passagers",
      description:
        "Retrouvez vos passagers et profitez du trajet tout en partageant les frais.",
      icon: <FaUsers className="driver__icon" />,
    },
  ];

  return (
    <section className="driver">
      <h1 className="driver__title">Comment devenir conducteur ?</h1>
      <div className="driver__steps">
        {steps.map((step, index) => (
          <div key={index} className="driver__card">
            <div className="driver__icon-wrapper">{step.icon}</div>
            <h2 className="driver__step-title">{step.title}</h2>
            <p className="driver__step-description">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="driver__cta-container">
        <Link to="/authorisation" className="driver__cta-button">
          Devenir conducteur
        </Link>
      </div>
    </section>
  );
}

export default Howto;
