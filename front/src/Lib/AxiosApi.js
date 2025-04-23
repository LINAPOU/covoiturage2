import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/json',},
  withCredentials: true, // Assure l'envoi des cookies
});
// Ajoute un intercepteur pour toujours envoyer le token JWT si disponible

AxiosApi.interceptors.request.use((config) => {
  console.log("🚀 Envoi de la requête avec ces cookies :", document.cookie);
  return config;
});


export default AxiosApi;
