import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Filter.css";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    departingLocation: searchParams.get("departingLocation") || "",
    arrivalLocation: searchParams.get("arrivalLocation") || "",
    date: searchParams.get("date") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    pet: searchParams.get("pet") || "",
    smoker: searchParams.get("smoker") || "",
    music: searchParams.get("music") || "",
    ac: searchParams.get("ac") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="lft-filter-container">
      <div className="lft-filter-header">
        <h1 className="lft-heading">Rechercher un trajet</h1>
        <div className="lft-top">
          <div className="lft-item">
            <label htmlFor="departingLocation">Départ</label>
            <input
              type="text"
              id="departingLocation"
              name="departingLocation"
              placeholder="Ville de départ"
              onChange={handleChange}
              value={query.departingLocation}
              className="lft-input"
            />
          </div>
          <div className="lft-item">
            <label htmlFor="arrivalLocation">Arrivée</label>
            <input
              type="text"
              id="arrivalLocation"
              name="arrivalLocation"
              placeholder="Ville d'arrivée"
              onChange={handleChange}
              value={query.arrivalLocation}
              className="lft-input"
            />
          </div>
        </div>
        <div className="lft-bottom">
          <div className="lft-item">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              value={query.date}
              className="lft-input"
            />
          </div>
          <div className="lft-item">
            <label htmlFor="maxPrice">Prix max (da)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="Prix maximum"
              onChange={handleChange}
              value={query.maxPrice}
              className="lft-input"
            />
          </div>
          <div className="lft-checkbox-group">
            <label>
              <input
                type="checkbox"
                name="pet"
                onChange={handleChange}
                className="lft-checkbox"
              />
              Animaux autorisés
            </label>
            <label>
              <input
                type="checkbox"
                name="smoker"
                onChange={handleChange}
                className="lft-checkbox"
              />
              Fumeur autorisé
            </label>
            <label>
              <input
                type="checkbox"
                name="music"
                onChange={handleChange}
                className="lft-checkbox"
              />
              Musique autorisée
            </label>
            <label>
              <input
                type="checkbox"
                name="ac"
                onChange={handleChange}
                className="lft-checkbox"
              />
              Climatisation
            </label>
          </div>
          <button onClick={handleFilter} className="lft-button">
            <img src="/pin.g" alt="Rechercher" className="lft-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
