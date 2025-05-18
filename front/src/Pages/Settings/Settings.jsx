import { useContext, useState } from "react";
import "./Settings.css";
import { AuthContext } from "../../Context/AuthContext";
import AxiosApi from "../../Lib/AxiosApi";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../../Componenents/Cloudinary/Cloudinary";

function Settings() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);

  const navigate = useNavigate();
   console.log(currentUser); //juste pr tester si lid saffiche
 
 
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const { username, email, password} = Object.fromEntries(formData);
    const token = localStorage.getItem("token"); // Récupérer le token du localStorage

     
  if (!token) {
    setError("Token is missing. Please log in.");
    return;
    }
if (!currentUser || !currentUser._id) {
      setError("User not found. Please log in.");
      return;
    }



   

    try {
const res = await AxiosApi.post(
  `/users/update/${currentUser._id}`,
  {
    username,
    email,
    password,
    avatar: avatar[0],
  },
  {
    headers: {
      Authorization: `Bearer ${token}`, // Ajouter le token dans l'en-tête
    },
  }
);
      updateUser(res.data); 
      navigate("/profile"); // Redirect to the profile page
    } catch (err) {
      console.log(err);
      setError(err.response.data.message); 
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="settingitem">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="settingitem">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="settingitem">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button className="settingbutton">Mettre à Jour</button>
          {error && <span>{error}</span>}
          {/* Display error message if it exists */}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "user.png"}
          alt="Avatar"
          className="avatar"
        />
         <Cloudinary
          uwConfig={{
            multiple: true,
            cloudName: "dxksn2jnl",
            uploadPreset: "covoituragelina",
            multiple: true,
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default Settings;
