import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../Pin/Pin";
import './Map.css'

function Map({ items }) {
  const [locations, setLocations] = useState([]);
  
  useEffect(() => {
    const fetchCoordinates = async () => {
      const results = await Promise.all(
        items.map(async (item) => {
          const departCoords = await getCoordinates(item.departingLocation);
          const arrivalCoords = await getCoordinates(item.arrivalLocation);
if (!Array.isArray(items)) {
  console.error("Erreur : items n'est pas un tableau", items);
  return null;
}
          return {
            ...item,
            departCoords,
            arrivalCoords,
          };
        })
      );
      setLocations(results);
    };

    fetchCoordinates();
  }, [items]);

  // Fonction pour récupérer la latitude et la longitude d'un lieu
  const getCoordinates = async (address) => {
    if (!address) return null;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      console.log("Adresse recherchée :", address, "Résultat :", data);

      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      } else {
        console.error(`Adresse non trouvée : ${address}`);
      }
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des coordonnées pour ${address}`,
        error
      );
    }

    return null;
  };

  // Vérification pour éviter une erreur si `locations[0]` est undefined
  const defaultCenter = [52.4797, -1.90269]; // Londres par défaut
const firstItem = items.length > 0 ? items[0] : null;
const center = firstItem && firstItem.departCoords
  ? [firstItem.departCoords.lat, firstItem.departCoords.lon]
  : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((item, index) => (
        <React.Fragment key={item.id || `trajet-${index}`}>
          {item.departCoords && (
            <Pin
              key={`depart-${item.id || index}`}
              item={{
                ...item,
                latitude: item.departCoords.lat,
                longitude: item.departCoords.lon,
              }}
            />
          )}
          {item.arrivalCoords && (
            <Pin
              key={`arrive-${item.id || index}`}
              item={{
                ...item,
                latitude: item.arrivalCoords.lat,
                longitude: item.arrivalCoords.lon,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </MapContainer>
  );
}

export default Map;
