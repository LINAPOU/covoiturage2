import React, { useState } from "react";
import AxiosApi from "../../Lib/AxiosApi"; // Ton API pour l'envoi des documents
import "./Authorisation.css";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Authorisation() {
  const [identityCard, setIdentityCard] = useState(null); // Carte d'identité
  const [carRegistration, setCarRegistration] = useState(null); // Carte grise
  const [vehicleCard, setVehicleCard] = useState(null); // Carte de véhicule
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!identityCard || !carRegistration || !vehicleCard) {
      setError("Tous les documents sont requis");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("identityCard", identityCard);
    formData.append("carRegistration", carRegistration);
    formData.append("vehicleCard", vehicleCard);

    try {
      const response = await AxiosApi.post("/driver/upload-documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Documents envoyés avec succès.");
    } catch (err) {
      setError("Erreur lors de l'envoi des documents.");
    } finally {
      setIsLoading(false);
    }
  };

    return (
      <div
        style={{
          background: "linear-gradient(to right, #66c1c3, #e0eee9)",
        }}
      >
        <div className="uploadDocumentsPage">
          <FaCar size={50} />
          <h1>
            <span>Chauffeurs! </span> Veuillez Soumettre vos Documents{" "}
            <span>minimum 24H</span> avant le départ
          </h1>
          <p>
            L'équipe <span>CevRoute</span> fait de son mieux pour maintenir
            votre sécurité
          </p>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="uploadfile-input">
              <label htmlFor="identityCard">Carte d'identité :</label>
              <input
                type="file"
                id="identityCard"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={(e) => handleFileChange(e, setIdentityCard)}
              />
            </div>
            <div className="uploadfile-input">
              <label htmlFor="carRegistration">Carte Grise :</label>
              <input
                type="file"
                id="carRegistration"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={(e) => handleFileChange(e, setCarRegistration)}
              />
            </div>
            <div className="uploadfile-input">
              <label htmlFor="vehicleCard">Carte de Véhicule :</label>
              <input
                type="file"
                id="vehicleCard"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={(e) => handleFileChange(e, setVehicleCard)}
              />
            </div>
            {error && <span className="error-message">{error}</span>}
            <Link to="/add">
              <button
                type="submit"
                disabled={isLoading}
                className="uploadbutton"
              >
                Envoyer votre demande ici
              </button>
            </Link>
            
          </form>
        </div>
      </div>
    );
}

export default Authorisation;
