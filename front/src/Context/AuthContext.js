import { createContext, useEffect, useState } from "react";
import AxiosApi from '../Lib/AxiosApi';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

 

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
  };
  return (
    <AuthContext.Provider value={{ currentUser,updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};