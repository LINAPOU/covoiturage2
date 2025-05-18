import React from "react";
import "./Nvlannonce.css";
import { Link } from "react-router-dom";
const Nvlannonce = () => {
  return (
    <section className="driver-hero">
      <div className="overlay">
        <div className="contenDRIVER">
          <h2>Devenez conducteur</h2>
          <p>
            Rentabilisez vos trajets et partagez des moments conviviaux avec vos
            passagers.
          </p>
          <Link to="/Howto" className="cta-button">
           Proposer un trajet
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Nvlannonce;
