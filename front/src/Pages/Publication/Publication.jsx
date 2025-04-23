import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Map from "../../Componenents/Map/Map.jsx";
import './Publication.css'
import DOMPurify from "dompurify";
import AxiosApi from "../../Lib/AxiosApi";
function Publication({ item }) {

  const { id } = useParams(); // Récupérer l'ID du trajet depuis l'URL
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trajet, setTrajet] = useState(null);
  const [loading, setLoading] = useState(true);
    const handleContact = async () => {
     
      try {
        const res = await AxiosApi.post("/chat/initiate/" + item.userId); // ID du conducteur
        navigate("/chat/" + res.data.id); // Redirige vers le chat nouvellement créé ou existant
      } catch (err) {
        console.error("Erreur lors de la création du chat :", err);
        alert("Erreur lors du contact. Veuillez réessayer.");
      }
    };

   
  useEffect(() => {
    fetch(`http://localhost:5000/api/trajet/${id}`) // Remplace avec ton URL backend
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

  // Fonction pour obtenir les coordonnées GPS des adresses
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
      console.error(
        `Erreur lors de la récupération des coordonnées pour ${address}`,
        error
      );
      return null;
    }
  };

  // Charger les coordonnées uniquement si le trajet est disponible
  const [trajetCoords, setTrajetCoords] = useState(null);

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

  

  return (
    <div className="trajetPage">
      <div className="details">
        <div className="wrapper">
          <div className="info">
            <div className="top">
              <div className="trajet">
                <h1>{trajet.title}</h1>
                <div className="user">
                  <img src={trajet.user.avatar} alt="" />
                  <span>{trajet.user.username}</span>
                </div>
                <div className="locations">
                  <p>
                    Départ : {trajet.departingLocation} ({trajet.departingDate}{" "}
                    à {trajet.departingTime})
                  </p>
                  <p>Arrivée : {trajet.arrivalLocation}</p>
                </div>
                <div className="price">Prix : {trajet.price}€</div>
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
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    trajet?.trajetDetail?.description ||
                      "<p>Aucune description disponible.</p>"
                  ),
                }}
              ></div>
            </div>

            <div className="feature">
              <span>Animaux :</span>
              <p>{trajet.pet === "true" ? "Autorisé" : "Non autorisé"}</p>
            </div>
            <div className="feature">
              <span>Fumeur :</span>
              <p>{trajet.smoker === "true" ? "Oui" : "Non"}</p>
            </div>
            <div className="feature">
              <span>Musique :</span>
              <p>{trajet.music === "true" ? "Oui" : "Non"}</p>
            </div>
            <div className="feature">
              <span>Climatisation :</span>
              <p>{trajet.ac === "true" ? "Disponible" : "Non disponible"}</p>
            </div>
            <div className="feature">
              <span>Bagages :</span>
              <p>{trajet.luggage || "Non précisée"}</p>
            </div>
            <div className="feature">
              <span>Discussion :</span>
              <p>{trajet.discussion || "Non précisée"}</p>
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
          <div className="buttons">
            <button onClick={handleContact} className="trajet-card-icon">
              Contacter le conducteur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publication;
