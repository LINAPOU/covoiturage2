import { createContext, useEffect, useState } from "react";
import AxiosApi from '../Lib/AxiosApi';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
 const [currentUser, setCurrentUser] = useState(() => {
  try {
    const stored = localStorage.getItem("user");
    if (!stored || stored === "undefined") return null;
    return JSON.parse(stored);
  } catch (err) {
    console.error("Erreur de parsing du user dans localStorage :", err);
    return null;
  }
});


 

 useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token"); // Vérifie que le token est dans le localStorage
      if (token) {
        const res = await AxiosApi.get("/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(res.data); // Si l'utilisateur est authentifié, met à jour currentUser
      }
    } catch (err) {
      console.log("User not authenticated or token expired");
    }
  };

  fetchUser(); // Appel pour récupérer l'utilisateur
}, []);


  const updateUser = (user) => {
  setCurrentUser(user);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user)); // <-- Ceci est essentiel
  } else {
    localStorage.removeItem("user"); // On nettoie bien lors du logout
  }
};

  return (
    <AuthContext.Provider value={{ currentUser,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};