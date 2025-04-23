import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AxiosApi from "../../Lib/AxiosApi.js";
import "../Login/Login.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await AxiosApi.post("/auth/signup", {
        username,
        email,
        password,
      });

      if (res && res.data) {
        console.log("Inscription réussie :", res.data);
        navigate("/profile"); // Rediriger vers la page de connexion après l'inscription
      } else {
        console.error("Réponse inattendue :", res);
        setError("Une erreur s'est produite lors de l'inscription.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      setError("Une erreur s'est produite lors de l'inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="logSignBackground">
      <div className="loginPage">
        <div className="loginFormContainer">
          <form onSubmit={handleSubmit}>
            <h1 className="loginFormTitle">Create an Account</h1>
            <input
              className="loginInput"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="loginInput"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="loginInput"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="loginButton" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
            {error && <span className="errorMessage">{error}</span>}
            <Link to="/login" className="signupLink">
              Already have an account? Login here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
