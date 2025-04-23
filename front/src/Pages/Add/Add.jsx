import { useState, useContext, useEffect } from "react";
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

    useEffect(() => {
      if (!user || !user.isDriverValidated) {
        alert("Vous devez être validé comme chauffeur pour publier un trajet.");
        navigate("/authorisation"); // Redirige vers envoi de documents
      }
    }, [user, navigate]);









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
          pet: inputs.pet,
          description: inputs.description,
          smoker: inputs.smoker,
          music: inputs.music,
          ac: inputs.ac,
          luggage: inputs.luggage,
          discussion: inputs.discussion,
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
              <input id="departingDate" name="departingDate" type="date" />
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
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <Cloudinary
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default Add;
