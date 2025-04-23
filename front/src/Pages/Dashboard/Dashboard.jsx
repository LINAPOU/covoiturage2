import { useEffect, useState } from "react";
import AxiosApi from "../../Lib/AxiosApi"; // Ton API pour l'envoi des documents
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [pendingDrivers, setPendingDrivers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AxiosApi.get("/users"); // Récupère la liste des users
        setUsers(res.data);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs");
      }
    };

    fetchUsers();
  }, []);

  // ✅ Fonction pour supprimer un utilisateur
  const handleDelete = async (userId) => {
    try {
      await AxiosApi.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Met à jour la liste sans l'utilisateur supprimé
    } catch (err) {
      console.error("Erreur API :", err.response?.data || err.message); // 🔹 Log plus détaillé

      setError("Erreur lors de la suppression de l'utilisateur");
    }
  };



    useEffect(() => {
      const fetchPendingDrivers = async () => {
        try {
          const res = await AxiosApi.get("/driver/admin/pending-drivers");
          setPendingDrivers(res.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des conducteurs en attente",
            error
          );
        }
      };
      fetchPendingDrivers();
    }, []);

  const handleValidateDriver = async (userId) => {
    try {
      // Validation du conducteur via l'API
      await AxiosApi.post("/driver/validateDriver", { userId });

      // Mettre à jour l'état des conducteurs en attente
      const updatedPendingDrivers = await AxiosApi.get("/driver/admin/pending-drivers");
      setPendingDrivers(updatedPendingDrivers.data);

      alert("Conducteur validé !");
    } catch (error) {
      console.error("Erreur lors de la validation du conducteur", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Gestion des Utilisateurs</h2>
      {error && <p className="dashboard-error">{error}</p>}

      <div className="dashboard-table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-links">
        <Link to="/Srvclient" className="dashboard-link">
          Service client
        </Link>
      </div>
      <div>
        <h2>Conducteurs en attente de validation</h2>

        <ul className="pending-drivers-list">
          {pendingDrivers.map((user) => (
            <li key={user.id} className="pending-driver-item">
              <div>
                <strong>{user.username}</strong> - {user.email}
              </div>

              <div className="documents-preview">
                <a href={user.identityCard} target="_blank">
                  Carte d'identité
                </a>{" "}
                |
                <a href={user.carRegistration} target="_blank">
                  Carte Grise
                </a>{" "}
                |
                <a href={user.vehicleCard} target="_blank">
                  Carte Véhicule
                </a>
              </div>

              <button onClick={() => handleValidateDriver(user.id)}>
                Valider comme conducteur
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;