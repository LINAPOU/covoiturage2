import React from 'react'
import './Header.css'
function Header() {
  return (
    <section className="h-wrapper">
      <div className="flexcenter h-container">
        <img src="./logo.jpg" alt="logo" width={100} />

        <div className="flexcenter h-menu">
          <a href="Listetrajets">trajets dispos</a>
          <a href="About">Objectif</a>
          <a href="/contact">Contact us</a>

          <a href="/login">S'inscrire</a>

          <button className="main-button">
            <a href="/login">Publier Un Trajet </a>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Header
