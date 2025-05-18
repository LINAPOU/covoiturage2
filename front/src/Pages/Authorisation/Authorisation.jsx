import React, { useState } from "react";
import AxiosApi from "../../Lib/AxiosApi";
import "./Authorisation.css";
import { useNavigate } from "react-router-dom";

function Authorisation() {
  const [identityCard, setIdentityCard] = useState(null);
  const [carRegistration, setCarRegistration] = useState(null);
  const [vehicleCard, setVehicleCard] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!identityCard || !carRegistration || !vehicleCard) {
      setError("Tous les documents sont requis.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("identityCard", identityCard);
    formData.append("carRegistration", carRegistration);
    formData.append("vehicleCard", vehicleCard);

    try {
      await AxiosApi.post("/driver/upload-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Documents envoyés avec succès !");
      navigate("/profile"); // redirection possible
    } catch (err) {
      setError("Erreur lors de l'envoi des documents.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="driver-upload-page">
      <div className="upload-card">
        <h1>Soumettre vos documents</h1>
        <p>Pour devenir conducteur, veuillez envoyer vos documents requis.</p>

        <form onSubmit={handleSubmit}>
          <div className="upload-form-group">
            <label htmlFor="identityCard">Carte d'identité</label>
            <input
              type="file"
              id="identityCard"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={(e) => handleFileChange(e, setIdentityCard)}
            />
          </div>

          <div className="upload-form-group">
            <label htmlFor="carRegistration">Carte grise</label>
            <input
              type="file"
              id="carRegistration"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={(e) => handleFileChange(e, setCarRegistration)}
            />
          </div>

          <div className="upload-form-group">
            <label htmlFor="vehicleCard">Permis de Conduire</label>
            <input
              type="file"
              id="vehicleCard"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={(e) => handleFileChange(e, setVehicleCard)}
            />
          </div>

          {error && <div className="error-text">{error}</div>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>

      <div className="driver-obligations">
        <h2>Réglementation du conducteur</h2>
        <ul>
          <li>Avoir des documents valides</li>
          <li>Avoir un véhicule en bon état</li>
          <li>Respecter les horaires indiqués</li>
          <li>Assurer la sécurité des passagers</li>
          <li>Être ponctuel et courtois</li>

        </ul>
      </div>
    </div>
  );
}

export default Authorisation;
