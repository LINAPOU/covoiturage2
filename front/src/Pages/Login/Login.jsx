import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.js";
import AxiosApi from "../../Lib/AxiosApi.js";
import "./Login.css";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await AxiosApi.post("/auth/login", {
        email,
        password,
      });
    
          localStorage.setItem("token", res.data.token); // 🔹 Stocke le token dans le localStorage

      updateUser(res.data);
         if (res.data.role === "ADMIN") {
           navigate("/Dashboard"); // 🔹 Redirige vers le Dashboard si Admin
         } else {
           navigate("/profile"); // 🔹 Sinon, vers le profil utilisateur
         }

    } catch (err) {
        setError("Erreur lors de la connexion.");
      } finally {
        setIsLoading(false);
      }
    
  };
 

   return (
     <div className="logSignBackground">
       <div className="loginPage">
         <div className="loginFormContainer">
           <form onSubmit={handleSubmit}>
             <h1 className="loginFormTitle">Se Connecter !</h1>
             <input
               className="loginInput"
               name="email"
               required
               minLength={3}
               maxLength={20}
               type="email"
               placeholder="Email"
             />
             <input
               className="loginInput"
               name="password"
               type="password"
               required
               placeholder="Mot de passe"
             />
             <button className="loginButton" disabled={isLoading}>
               Connexion
             </button>
             {error && <span className="errorMessage">{error}</span>}
             <Link to="/Signup" className="signupLink">
               Vous n'avez pas de compte ?
             </Link>
           </form>
         </div>
       </div>
     </div>
   );
}

export default Login;
