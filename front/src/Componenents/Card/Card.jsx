import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, } from "../../Context/AuthContext"; // Assurez-vous d'importer votre contexte utilisateur
import AxiosApi from "../../Lib/AxiosApi";
import { FaCar, FaChair } from "react-icons/fa";
import "./Card.css";
function Card({ item }) {
  // Récupérer l'utilisateur connecté depuis le contexte (ou via un autre moyen, si nécessaire)
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trajet, setTrajet] = useState(null);

  const handleReservation = async (trajet) => {
    try {
      const res = await AxiosApi.post(`trajet/${trajet.id}/reserver`, {
        userId: currentUser.id,
      });

      if (res.status === 200) {
        alert("✅ Trajet réservé avec succès ! pour plus de détails, contactez le conducteur.");
      } else {
        alert("❌ " + res.data.message);
      }
    } catch (err) {
      console.error("Erreur lors de la réservation :", err);
      alert("veuillez vous connecter pour réserver.");
    }
  };

  const handleContact = async () => {
    try {
      const res = await AxiosApi.post("/chat/initiate/" + item.userId); // ID du conducteur
      navigate("/chat/" + res.data.id); // Redirige vers le chat nouvellement créé ou existant
    } catch (err) {
      console.error("Erreur lors de la création du chat :", err);
      alert("veuillez vous connecter pour contacter le conducteur.");
    }
  };

  return (
    <div className="trajet-card-container">
      <Link to={`/publication/${item.id}`} className="trajet-card-img-wrapper">
        <img
          src={item.imgs || "trip3.jpg"}
          alt="Trajet"
          className="trajet-card-img"
        />
      </Link>
      <div className="trajet-card-content">
        <h2 className="trajet-card-title">
          <Link to={`/publication/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="trajet-card-location">
          <span>
            De: {item.departingLocation} <br /> <br /> À: {item.arrivalLocation} (
            {item.category})
          </span>
          <p className="trajet-card-time">
            Date: {new Date(item.departingDate).toLocaleDateString("fr-FR")} à{" "}
            {item.departingTime}
          </p>
        </p>

        <p className="trajet-card-price">{item.price}DA</p>

        <div className="trajet-card-bottom">
          <div className="trajet-card-icons">
            <div className="trajet-feature">
              <FaChair />
              <span className={item.seatsAvailable === 0 ? "no-seats" : ""}>
                {item.seatsAvailable} places dispo
              </span>
            </div>
            <button onClick={handleContact} className="trajet-card-icon">
              Contacter le conducteur
            </button>
            {item.seatsAvailable > 0 && (
              <button
                className="reserv-button"
                onClick={() => handleReservation(item)}
              >
                Réserver ce trajet
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
