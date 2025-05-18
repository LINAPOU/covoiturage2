import { useState } from "react";
import "./Filter.css"; 
function Filter({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="lft-filter-container">
        <h2>Filtrer</h2>
        <input
          type="text"
          name="departingLocation"
          placeholder="Ville de départ"
          value={filters.departingLocation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="arrivalLocation"
          placeholder="Ville d'arrivée"
          value={filters.arrivalLocation}
          onChange={handleChange}
        />
      </div>
  );
}

export default Filter;
