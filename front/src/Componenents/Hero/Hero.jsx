import React from 'react'
import './Hero.css'
import { FaCar, FaMapPin } from "react-icons/fa";
import Pin from '../Pin/Pin';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="padding innerwidth hero-container flexcenter"></div>
      {/* cote gauche */}
      <div className="flexcolstart hero-left">
        <div className="hero-title">
          <h1>
            Découvrez <span style={{ color: "#f8d149" }}>CevRoute </span> <br />
            un nouveau moyen pour <br />
            vous déplacer
          </h1>
        </div>

        <div className="flexcolstart hero-des">
          <span style={{ color: "#192c4a", fontWeight: 900 }}>
            Trouvez avec qui partager vos trajets
          </span>
          <span style={{ color: "#192c4a", fontWeight: 900 }}>
            Oubliez toutes les peripéties des trajets du quotidien
          </span>
        </div>

        <div className="flexcenter  search-bar">
          <FaCar size={30} color="#f8d149" />
          <p>Placer votre destination</p>
          <FaMapPin size={30} color="#f8d149" />
          <p>Placer votre arrivée</p>
          <div>
            <Link to="./login" className="main-button ">
              Chercher
            </Link>
          </div>
        </div>
      </div>
      {/* cote droit */}
      <div className="hero-right flexcenter">
        <div className="image-container ">
          <img src="./covoiturage2.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}

export default Hero
