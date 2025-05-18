import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import "./stats.css";

const Stats = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("All");

  const allMonths = ["All", "Jan", "Feb", "Mar", "Apr", "May"];

  const monthlyTrajets = [
    { month: "Jan", trajets: 4 },
    { month: "Feb", trajets: 7 },
    { month: "Mar", trajets: 5 },
    { month: "Apr", trajets: 9 },
    { month: "May", trajets: 6 },
  ];

  const userRoles = [
    { name: "Conducteurs", value: 8 },
    { name: "Passagers", value: 16 },
  ];

  const quickStats = {
    totalUsers: 24,
    totalTrajets: 31,
    totalMessages: 14,
    averageRating: 4.3,
    newToday: 3,
    conducteursToday: 1,
    tauxOccupation: "82%",
  };

  const COLORS = ["#d6a269", "#f0e0ca"];

  const filteredTrajets =
    selectedMonth === "All"
      ? monthlyTrajets
      : monthlyTrajets.filter((m) => m.month === selectedMonth);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className={darkMode ? "admin-container dark" : "admin-container"}>
      <div className="admin-header">
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="stats-cards">
        {[
          { label: "Utilisateurs", value: quickStats.totalUsers },
          { label: "Trajets", value: quickStats.totalTrajets },
          { label: "Messages", value: quickStats.totalMessages },
          { label: "Note moyenne", value: quickStats.averageRating + " ⭐" },
          { label: "👤 Nouveaux aujourd'hui", value: quickStats.newToday },
          {
            label: "🚗 Conducteurs aujourd'hui",
            value: quickStats.conducteursToday,
          },
          { label: "📈 Taux d'occupation", value: quickStats.tauxOccupation },
        ].map((item, idx) => (
          <div key={idx} className="stats-card">
            <div className="stats-card-label">{item.label}</div>
            <div className="stats-card-value">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="charts-container">
        <div className="chart-section">
          <h3>📉 Évolution des trajets</h3>
          {loading ? (
            <div className="chart-loading">Chargement...</div>
          ) : (
            <LineChart width={400} height={250} data={monthlyTrajets}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="trajets"
                stroke="#66c1c3"
                strokeWidth={3}
              />
            </LineChart>
          )}
        </div>

        <div className="chart-section">
          <h3>👥 Répartition utilisateurs</h3>
          {loading ? (
            <div className="chart-loading">Chargement...</div>
          ) : (
            <PieChart width={300} height={250}>
              <Pie
                data={userRoles}
                cx={150}
                cy={100}
                outerRadius={80}
                fill="#dcccc2"
                dataKey="value"
                label
              >
                {userRoles.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          )}
        </div>

        {/* Nouveau graphique à barres */}
        <div className="chart-section">
          <h3>📊 Nombre de messages par mois</h3>
          {loading ? (
            <div className="chart-loading">Chargement...</div>
          ) : (
            <BarChart width={400} height={250} data={monthlyTrajets}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trajets" fill="#82ca9d" />
            </BarChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
