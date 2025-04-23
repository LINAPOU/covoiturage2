import { Link } from "react-router-dom";
import "./Card.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../Lib/AxiosApi";

function Card({ item }) {
  const navigate = useNavigate();

  const handleContact = async () => {
    try {
      const res = await AxiosApi.post("/chat/initiate/" + item.userId); // ID du conducteur
      navigate("/chat/" + res.data.id); // Redirige vers le chat nouvellement créé ou existant
    } catch (err) {
      console.error("Erreur lors de la création du chat :", err);
      alert("Erreur lors du contact. Veuillez réessayer.");
    }
  };

  return (
    <div className="trajet-card-container">
      <Link to={`/publication/${item.id}`} className="trajet-card-img-wrapper">
        <img
          src={item.imgs || "trip.jpg"}
          alt="Trajet"
          className="trajet-card-img"
        />
      </Link>
      <div className="trajet-card-content">
        <h2 className="trajet-card-title">
          <Link to={`/publication/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="trajet-card-location">
          <img src="/pin1.jpg" alt="Localisation" className="trajet-icon" />
          <span>
            {item.departingLocation} → {item.arrivalLocation} ({item.category})
          </span>
        </p>
        <p className="trajet-card-price">{item.price}€</p>

        <div className="trajet-card-bottom">
          <div className="trajet-card-icons">
            <div className="trajet-feature">
              <img src="/seats.jpg" alt="Places" className="trajet-icon" />
              <span>{item.seatsAvailable} places dispo</span>
            </div>
            <button onClick={handleContact} className="trajet-card-icon">
              Contacter le conducteur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;