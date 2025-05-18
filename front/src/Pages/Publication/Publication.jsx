import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Map from "../../Componenents/Map/Map.jsx";
import "./Publication.css";
import DOMPurify from "dompurify";
import AxiosApi from "../../Lib/AxiosApi";
import { Link } from "react-router-dom";
function Publication() {
  const { id } = useParams(); // Récupérer l'ID du trajet depuis l'URL
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [trajet, setTrajet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trajetCoords, setTrajetCoords] = useState(null);

  const handleContact = async () => {
    try {
      const res = await AxiosApi.post("/chat/initiate/" + trajet.userId); // ID du conducteur
      navigate("/chat/" + res.data.id); // Redirige vers le chat
    } catch (err) {
      console.error("Erreur lors de la création du chat :", err);
      alert("Erreur lors du contact. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/trajet/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrajet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, [id]);

  // Fonction pour obtenir les coordonnées GPS
  const getCoordinates = async (address) => {
    if (!address) return null;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
      } else {
        console.error(`Adresse non trouvée : ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Erreur coordonnées :", error);
      return null;
    }
  };

  useEffect(() => {
    if (trajet) {
      const fetchCoords = async () => {
        const departCoords = await getCoordinates(trajet.departingLocation);
        const arrivalCoords = await getCoordinates(trajet.arrivalLocation);
        setTrajetCoords({ departCoords, arrivalCoords });
      };
      fetchCoords();
    }
  }, [trajet]);

  if (loading) return <p>Chargement...</p>;
  if (!trajet) return <p>Trajet introuvable.</p>;

  const detail = trajet.trajetDetail || {}; // Sécurité

  return (
    <div className="trajetPage">
      <div className="details">
        <div className="wrapper">
          <div className="info">
            <div className="top">
              <div className="trajet">
                <h1>{trajet.title}</h1>
                <div className="user">
                  <img src={trajet.user?.avatar} alt="avatar" />
                  <span>{trajet.user?.username}</span>
                </div>
                <div className="locations">
                  <p>
                    Départ : {trajet.departingLocation} ({trajet.departingDate}{" "}
                    à {trajet.departingTime})
                  </p>
                  <p>Arrivée : {trajet.arrivalLocation}</p>
                </div>
                <div className="price">Prix : {trajet.price}DA</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">Caractéristiques du trajet</p>

          <div className="listVertical">
            <div className="feature">
              <span>Description :</span>
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    detail.description ||
                      "<p>Aucune description disponible.</p>"
                  ),
                }}
              />
            </div>

            <div className="feature">
              <span>Animaux :</span>
              <p>
                {detail.pet === true
                  ? "Animaux permis"
                  : detail.pet === false
                  ? "Animaux non permis"
                  : "Non précisé"}
              </p>
            </div>

            <div className="feature">
              <span>Fumeur :</span>
              <p>{detail.smoker === "true" ? "Oui" : "Non"}</p>
            </div>
            <div className="feature">
              <span>Musique :</span>
              <p>{detail.music === "true" ? "Oui" : "Non"}</p>
            </div>
            <div className="feature">
              <span>Climatisation :</span>
              <p>{detail.ac === "true" ? "Disponible" : "Non disponible"}</p>
            </div>

            <div className="feature">
              <span>Bagages :</span>
              <p>{detail.luggage || "Non précisé"}</p>
            </div>
            <div className="feature">
              <span>Discussion :</span>
              <p>{detail.discussion || "Non précisé"}</p>
            </div>
            <div className="feature">
              <div className="imagesContainer">
                {Array.isArray(trajet.images) &&
                  trajet.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`trajet-${index}`}
                      style={{
                        width: "200px",
                        marginRight: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <p className="title">Localisation</p>
        <div className="mapContainer">
          {trajetCoords ? (
            <Map items={[{ ...trajet, ...trajetCoords }]} />
          ) : (
            <p>Chargement de la carte...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Publication;
