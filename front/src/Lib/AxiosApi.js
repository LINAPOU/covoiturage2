import axios from "axios";
  const token = localStorage.getItem('token');

const AxiosApi = axios.create({

  baseURL: "http://localhost:5000/api",
  headers: {
    'Content-Type': 'application/json',},
  withCredentials: true, // Assure l'envoi des cookies
      'Authorization': `Bearer ${token}` // ← important !

});
// Ajoute un intercepteur pour toujours envoyer le token JWT si disponible

AxiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default AxiosApi;
