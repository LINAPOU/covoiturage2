import React from "react";
import "./About.css";
import Chart from "../../Componenents/Chart/Chart";

const About = () => {
  return (
    <div className="about-container">
      <section className="hero">
        <h1 className="hero-title">Bienvenue sur Covoiturage ZeRoad</h1>
        <p className="hero-subtitle">
          Le covoiturage simplifié, écologique et économique.
        </p>
        <Chart />
      </section>

      <section className="mission">
        <h2>Notre Mission</h2>
        <p>
          Chez <strong>Covoiturage ZeRoad</strong>, nous visons à rendre les
          trajets plus durables, moins coûteux et plus conviviaux
          <strong> Pour Nos Vous </strong> . Nous croyons en un futur où
          chaque voyage en voiture réduit le nombre de véhicules sur les routes,
          contribue à une meilleure qualité de l'air et permet à tous de voyager
          plus facilement et moins cher.
        </p>
      </section>

      <section className="benefits">
        <h2>Pourquoi Choisir le Covoiturage ?</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <h3>Réduisez vos coûts</h3>
            <p>
              Partagez les frais de voyage avec d'autres passagers et économisez
              de l'argent.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Contribuez à l'environnement</h3>
            <p>
              Moins de voitures, moins de pollution. Faites un geste pour la
              planète !
            </p>
          </div>
          <div className="benefit-item">
            <h3>Simplifiez vos trajets</h3>
            <p>
              Facilité d'organisation et plus de flexibilité dans vos
              déplacements quotidiens.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Ce que nos utilisateurs disent</h2>
        <div className="testimonial">
          <p>
            “Covoiturage Express a changé la façon dont je me déplace. Plus
            rapide, moins cher, et c'est tellement plus agréable de rencontrer
            de nouvelles personnes!”
          </p>
          <p>- Sarah, utilisatrice régulière</p>
        </div>
        <div className="testimonial">
          <p>
            “Grâce à ce site, j'ai économisé sur mes trajets et j'ai fait ma
            part pour l'environnement.”
          </p>
          <p>- Marc, conducteur</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Covoiturage ZeRoad - Tous droits réservés</p>
      </footer>
    </div>
  );
};

export default About;
