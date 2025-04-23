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
} from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [mesTrajets, setMesTrajets] = useState([]);
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
            <span>Nom d'utilisateur:</span>{" "}
            <b>{currentUser?.username || "Inconnu"}</b>
          </div>
          <div className="pp-infoItem">
            <span>Email:</span> <b>{currentUser?.email || "Non fourni"}</b>
          </div>
        </div>

        <div className="pp-actions">
          <Link to="/Authorisation">
            <button className="pp-button">
              <FontAwesomeIcon icon={faPlusCircle} /> Nouvelle annonce
            </button>
          </Link>
          <Link to="/contact">
            <button className="pp-button">
              <FontAwesomeIcon icon={faEnvelope} /> Contact
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
              <li key={trajet.id} className="pp-trajetItem">
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
                <button
                  onClick={() => handleDelete(trajet.id)}
                  className="pp-deleteButton"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="pp-empty">Aucun trajet publié</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
