import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "../../Lib/AxiosApi.js";
import { AuthContext } from "../../Context/AuthContext";
import "./ProfilePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserEdit,
  faSignOutAlt,
  faPlusCircle,
  faEnvelope,
  faCar
} from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [mesTrajets, setMesTrajets] = useState([]);
  const [reservationMessage, setReservationMessage] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [notifications, setNotifications] = useState({}); // Pour stocker les notifications par trajet

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AxiosApi.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleCheckValidation = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await AxiosApi.get("/driver/check-validation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { isDriverValidated } = response.data;

      if (isDriverValidated) {
        console.log("Le conducteur est validé");
        navigate("/add");
      } else {
        console.log("Le conducteur n'est pas validé");
        navigate("/Nvlannonce"); // Redirige vers la page d'autorisation
      }

      // Tu peux aussi vérifier le role si nécessaire ici
    } catch (err) {
      console.error("Erreur lors de la vérification du conducteur", err);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await AxiosApi.get("/chat");
        setChats(res.data);
      } catch (err) {
        console.log("Erreur lors de la récupération des chats", err);
      }
    };

    const fetchMesTrajets = async () => {
      try {
        const res = await AxiosApi.get("/users/profileTrajets");
        setMesTrajets(res.data.userTrajets);
      } catch (err) {
        console.log("Erreur lors de la récupération des trajets", err);
      }
    };

    fetchMesTrajets();
    fetchChats();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Es-tu sûr de vouloir supprimer ce trajet ?"
    );
    if (!confirmDelete) return;

    try {
      await AxiosApi.delete(`/trajet/${id}`);
      setMesTrajets((prev) => prev.filter((trajet) => trajet.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression du trajet", err);
    }
  };

  const reduireUnePlace = async (trajetId) => {
    try {
      const res = await AxiosApi.post(
        `/trajet/${trajetId}/reduce-place`,
        {},
        { withCredentials: true }
      );

      setMesTrajets((prev) =>
        prev.map((trajet) =>
          trajet.id === trajetId
            ? { ...trajet, seatsAvailable: res.data.seatsAvailable }
            : trajet
        )
      );

      console.log("Places restantes :", res.data.seatsAvailable);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la réduction");
    }
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await AxiosApi.post(
        "/review",
        {
          userId: currentUser.id,
          comment: reviewComment,
          rating: reviewRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête
          },
        }
      );
      alert(" Avis envoyé !");
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      alert(" Erreur lors de l'envoi de l'avis.");
      console.error(err);
    }
  };

  useEffect(() => {
    // Logique si besoin pour récupérer et mettre à jour
    console.log("Avatar mis à jour dans ProfilePage", currentUser?.avatar);
  }, [currentUser?.avatar]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (mesTrajets.length === 0) return; // Assure-toi que mesTrajets ne soit pas vide

      try {
        for (const trajet of mesTrajets) {
          const response = await axios.get(
            `/notifications?trajetId=${trajet.id}`
          );
          setNotifications((prevNotifications) => ({
            ...prevNotifications,
            [trajet.id]: response.data, // Stocker les notifications par trajet
          }));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des notifications",
          error
        );
      }
    };

    fetchNotifications();
  }, [mesTrajets]); // Ce useEffect s'exécute uniquement lorsque mesTrajets change

  return (
    <div className="pp-page">
      <div className="pp-profileCard">
        <div className="pp-header">
          <h1>Profil utilisateur</h1>
          <Link to="/settings">
            <button className="pp-button">
              <FontAwesomeIcon icon={faUserEdit} /> Modifier
            </button>
          </Link>
        </div>

        <div className="pp-info">
          <div className="pp-infoItem">
            <span>Avatar:</span>
            <img src={currentUser?.avatar || "/user.png"} alt="Avatar" />
          </div>
          <div className="pp-infoItem">
            <span>Nom d'utilisateur:</span>
            <b>{currentUser?.username || "Inconnu"}</b>
          </div>
          <div className="pp-infoItem">
            <span>Email:</span> <b>{currentUser?.email || "Non fourni"}</b>
          </div>
        </div>

        <div className="pp-actions">
          <button className="pp-button" onClick={handleCheckValidation}>
            <FontAwesomeIcon icon={faPlusCircle} /> Nouvelle annonce
          </button>
          <Link to="/contact">
            <button className="pp-button">
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </button>
          </Link>
          <Link to="/listetrajets">
            <button className="pp-button">
              <FontAwesomeIcon icon={faCar} /> trajets
            </button>
          </Link>
          <button className="pp-button logout" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
          </button>
        </div>
      </div>

      <div className="pp-chatSection">
        <h2>Mes conversations</h2>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div key={chat.id} className="pp-chatItem">
              <img
                src={chat.receiver?.avatar || "/user.png"}
                alt="Avatar"
                className="pp-chatAvatar"
              />
              <div className="pp-chatDetails">
                <p className="pp-chatUsername">
                  {chat.receiver?.username || "Inconnu"}
                </p>
                <button
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  className="pp-chatButton"
                >
                  Ouvrir
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="pp-empty">Aucun chat trouvé</p>
        )}
      </div>

      <div className="pp-trajetsSection">
        <h2>Mes trajets publiés</h2>
        {mesTrajets.length > 0 ? (
          <ul className="pp-trajetsList">
            {mesTrajets.map((trajet) => (
              <li
                key={trajet.id}
                className={`pp-trajetItem ${
                  trajet.seatsAvailable === 0 ? "full" : ""
                }`}
              >
                <div className="pp-trajetIcon">
                  {/* Icône de trajet */}
                  <FontAwesomeIcon
                    icon={faCar}
                    className={`pp-icon ${
                      trajet.seatsAvailable === 0 ? "full-icon" : ""
                    }`}
                  />
                </div>
                <p>
                  <strong>Départ:</strong> {trajet.departingLocation}
                </p>
                <p>
                  <strong>Arrivée:</strong> {trajet.arrivalLocation}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(trajet.departingDate).toLocaleString()}
                </p>
                <p>
                  <strong>Places:</strong> {trajet.seatsAvailable}
                </p>

                {/* Changement de couleur du bouton si places = 0 */}
                <button
                  onClick={() => reduireUnePlace(trajet.id)}
                  className="pp-reservationButton"
                  disabled={trajet.seatsAvailable === 0}
                >
                  {trajet.seatsAvailable === 0
                    ? "Complet"
                    : "Réduire une place"}
                </button>

                <button
                  onClick={() => handleDelete(trajet.id)}
                  className="pp-deleteButton"
                >
                  Supprimer
                </button>

                {/* Affichage des notifications pour ce trajet */}
                <h3>Notifications</h3>

                {notifications[trajet.id] &&
                  notifications[trajet.id].length > 0 && (
                    <div className="pp-notifications">
                      <ul>
                        {notifications[trajet.id].map((notif) => (
                          <li key={notif.id} className="pp-notificationItem">
                            <p>{notif.message}</p>
                            <span>
                              {new Date(notif.createdAt).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="pp-empty">Aucun trajet publié</p>
        )}
      </div>

      <div className="pp-reviewSection">
        <h2>Laisser un avis sur la plateforme</h2>
        <form onSubmit={handleReviewSubmit} className="pp-reviewForm">
          <div className="pp-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setReviewRating(star)}
                className={
                  star <= reviewRating ? "pp-star selected" : "pp-star"
                }
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Votre avis sur notre application ou vos précedents trajets..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            required
          />
          <button type="submit">Envoyer l'avis</button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
