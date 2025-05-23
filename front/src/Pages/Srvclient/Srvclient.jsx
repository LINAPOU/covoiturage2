import { useEffect, useState } from "react";
import AxiosApi from "../../Lib/AxiosApi";
import "./Srvclient.css"; // Lien vers le fichier CSS

const Srvclient = () => {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await AxiosApi.get("/contact/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages", error);
      }
    };

    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className={darkMode ? "admin-container dark" : "admin-container"}>
      <div className="admin-header">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <div className="srvclient-container">
        <h2 className="srvclient-title">📩 Messages reçus</h2>
        {messages.length === 0 ? (
          <p className="srvclient-no-messages">Aucun message pour le moment.</p>
        ) : (
          <ul className="srvclient-message-list">
            {messages.map((msg) => (
              <li key={msg._id} className="srvclient-message-item">
                <div className="srvclient-message-header">
                  <strong>De:</strong>
                  {msg.user?.username || "Utilisateur inconnu"}
                  <span className="srvclient-message-email">
                    ({msg.user?.email || "Pas d'email"})
                  </span>
                  <br />

                  <strong>Avatar:</strong>
                  <img src={msg.user?.avatar || "USER.png"} alt="" />
                </div>
                <div className="srvclient-message-body">
                  <strong>Message:</strong> {msg.message}
                </div>
                <div className="srvclient-message-date">
                  {formatDate(msg.createdAt)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Srvclient;
