import { useState, useContext } from "react";
import AxiosApi from "../../Lib/AxiosApi.js";
import Cloudinary from "../../Componenents/Cloudinary/Cloudinary";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./Add.css";
import { AuthContext } from "../../Context/AuthContext";

function Add() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await AxiosApi.post("/trajet", {
        trajetData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          departingDate: inputs.departingDate,
          departingLocation: inputs.departingLocation,
          departingTime: inputs.departingTime,
          arrivalLocation: inputs.arrivalLocation,
          seatsAvailable: parseInt(inputs.seatsAvailable),
          status: inputs.status,
          category: inputs.category,
          images: images,
        },
        trajetDetail: {
          description: value,
          pet: inputs.pet === "true", // Convertir 'true'/'false' en booléen
          smoker: inputs.smoker === "true",
          music: inputs.music === "true",
          ac: inputs.ac === "true",
          luggage: inputs.luggage, // Les bagages sont des chaînes de caractères (Petit, Moyen, Grand)
          discussion: inputs.discussion, // Niveau de discussion
        },
       
      });

      navigate(`/publication/${res.data.id}`);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="addTrajetPage">
      <div className="addTrajetFormContainer">
        <h1>Ajouter un trajet</h1>
        <div className="addTrajetWrapper">
          <form onSubmit={handleSubmit}>
            <div className="addTrajetItem">
              <label htmlFor="title">Titre</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="addTrajetItem">
              <label htmlFor="price">Prix</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="addTrajetItem">
              <label htmlFor="departingDate">Date de départ</label>
              <input
                id="departingDate"
                name="departingDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="addTrajetItem">
              <label htmlFor="departingLocation">Lieu de départ</label>
              <input
                id="departingLocation"
                name="departingLocation"
                type="text"
              />
            </div>
            <div className="addTrajetItem">
              <label htmlFor="departingTime">Heure de départ</label>
              <input id="departingTime" name="departingTime" type="time" />
            </div>
            <div className="addTrajetItem">
              <label htmlFor="arrivalLocation">Lieu d'arrivée</label>
              <input id="arrivalLocation" name="arrivalLocation" type="text" />
            </div>
            <div className="addTrajetItem addTrajetDescription">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>

            <div className="addTrajetItem">
              <label htmlFor="seatsAvailable">Nombre de places</label>
              <input
                min={1}
                id="seatsAvailable"
                name="seatsAvailable"
                type="number"
              />
            </div>

            <div className="addTrajetItem">
              <label htmlFor="status">Statut</label>
              <select name="status">
                <option value="DISPONIBLE" defaultChecked>
                  DISPONIBLE
                </option>
                <option value="COMPLET">COMPLET</option>
                <option value="CANCELLED">ANNULÉ</option>
              </select>
            </div>
            <div className="addTrajetItem">
              <label htmlFor="category">Catégorie</label>
              <select name="category">
                <option value="ECONOMIQUE">Économique</option>
                <option value="CONFORT">Confort</option>
                <option value="LUXE">Luxe</option>
              </select>
            </div>

            <div className="addTrajetItem">
              <label htmlFor="pet">Animaux</label>
              <select id="pet" name="pet">
                <option value="true">Permis</option>
                <option value="false">Non permis</option>
              </select>
            </div>

            <div className="addTrajetItem">
              <label htmlFor="smoker">Fumeur</label>
              <select id="smoker" name="smoker">
                <option value="true">Permis</option>
                <option value="false">Non permis</option>
              </select>
            </div>

            <div className="addTrajetItem">
              <label htmlFor="music">Musique</label>
              <select id="music" name="music">
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>

            <div className="addTrajetItem">
              <label htmlFor="ac">Climatisation</label>
              <select id="ac" name="ac">
                <option value="true">Disponible</option>
                <option value="false">Non disponible</option>
              </select>
            </div>

            <div className="addTrajetItem">
              <label htmlFor="luggage">Bagages</label>
              <select id="luggage" name="luggage">
                <option value="Petit">Petit</option>
                <option value="Moyen">Moyen</option>
                <option value="Grand">Grand</option>
              </select>
            </div>

            <div className="addTrajetItem">
              <label htmlFor="discussion">Niveau de discussion</label>
              <select id="discussion" name="discussion">
                <option value="Silencieux">Silencieux</option>
                <option value="Normal">Normal</option>
                <option value="Bavard">Bavard</option>
              </select>
            </div>
            <button className="addTrajetButton">Ajouter</button>
            {error && <span className="addTrajetError">{error}</span>}
          </form>
        </div>
      </div>
      <div className="addTrajetSideContainer">
        <h1 style={{ color: "#66c1c3", fontSize: "10px", width: "200px" }}>
          Ajoutez DES PHOTOS DE VOTRE VOITURE
        </h1>

        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <Cloudinary
          uwConfig={{
            multiple: true,
            cloudName: "dxksn2jnl",
            uploadPreset: "covoituragelina",
            multiple: true,
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default Add;
