import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-wrapper">
      <div className="h-container">
        <img src="./MOBRIDE.jpg" alt="logo" className="h-logo" />

        {/* Hamburger icon */}
        <div className="h-burger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation menu */}
        <nav className={`h-menu ${menuOpen ? "open" : ""}`}>
          <a href="/Listetrajets" onClick={() => setMenuOpen(false)}>
            Trajets
          </a>
          <a href="/About" onClick={() => setMenuOpen(false)}>
            Objectif
          </a>
          <a href="/review" onClick={() => setMenuOpen(false)}>
            Avis
          </a>
          <a href="/login" onClick={() => setMenuOpen(false)}>
            Inscription
          </a>
          <Link
            to="/login"
            className="buttonhomepage"
            onClick={() => setMenuOpen(false)}
          >
            Publier un trajet
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
