import React, { useState, useEffect } from "react";
import Filter from "../../Componenents/Filter/Filter";
import Card from "../../Componenents/Card/Card";
import Map from "../../Componenents/Map/Map";
import "./Listetrajets.css"; // Lien vers le fichier CSS

function Listetrajets() {
  const [trajets, setTrajet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trajetResponse, setTrajetResponse] = useState({ data: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/trajet")
      .then((res) => res.json())
      .then((data) => {
        setTrajet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement :", err);
        setError("Impossible de charger les trajets.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="listetrajets-container">
      <div className="listetrajets-main">
        <div className="listetrajets-wrapper">
          <Filter />
          <div className="listetrajets-cards">
            {trajets.length > 0 ? (
              trajets.map((trajet) => <Card key={trajet.id} item={trajet} />)
            ) : (
              <p>Aucun trajet trouvé.</p>
            )}
          </div>
        </div>
      </div>
      <div className="listetrajets-map-container">
        <Map
          items={Array.isArray(trajetResponse.data) ? trajetResponse.data : []}
        />
      </div>
    </div>
  );
}

export default Listetrajets;
