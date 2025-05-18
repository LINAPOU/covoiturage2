import React from "react";
import "./Hero.css";
import { FaCar, FaMapPin } from "react-icons/fa";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/cringe.jpg"; // ← import de l'image

function Hero() {
  return (
    <section
      className="hero-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>
      <div className="padding innerwidth hero-container flexcenter">
        <div className="flexcolstart hero-left">
          <div className="hero-title">
            <h1>
              Découvrez <span style={{ color: " #6EE7B7" }}>ZeRoad ! </span>{" "}
              <br />
              Voyagez ensemble, <br />
              économisez plus
            </h1>
          </div>

          <div className="flexcolstart hero-des">
            <span className="hero-subtext">
              Trouvez avec qui partager vos trajets
            </span>
            <span className="hero-subtext">
              Oubliez toutes les péripéties des trajets du quotidien
            </span>
          </div>

          <div className="flexcenter search-bar">
            <FaCar size={30} color=" #6EE7B7" />
            <p>Départ</p>
            <FaMapPin size={30} color=" #6EE7B7" />
            <p>Arrivée</p>
            <Link to="/login" className="main-button">
              Chercher
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
