import { useState,useContext } from "react";
import AxiosApi from "../../Lib/AxiosApi.js";
import { AuthContext } from "../../Context/AuthContext";
import './Contact.css'

const Contact = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const response = await AxiosApi.post("/contact", { message });
      setSuccess("Message envoyé avec succès !");
      setMessage("");
    } catch (err) {
      setError(err.response?.data?.msg || "Erreur lors de l'envoi du message");
    }
  };
  return (
    <div className="contact-container">
      {/* 📝 Section Formulaire */}
      <div className="contact-header">
      <div className="contact-warning">
        ⚠️ Si un utilisateur est signalé plus de 5 fois via messages, il sera
        automatiquement exclu de la plateforme.
      </div>
      <div className="contact-form-container">
        <h2 className="contact-title">Contactez-nous</h2>
        <p>vous recevrez une réponse via email</p>
        {success && <p className="contact-success">{success}</p>}
        {error && <p className="contact-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <textarea
            className="contact-textarea"
            rows="5"
            placeholder="Votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button type="submit" className="contact-button">
            Envoyer
          </button>
        </form>
      </div>
      </div>
      {/* 🖼️ Section Image */}
      <div className="contact-image-container">
        <img src="Contact.jpg" alt="Contact" className="contact-image" />
      </div>
    </div>
  );
};

export default Contact;