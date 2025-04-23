import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";
import React from "react";
const data = [
  { name: "Réduction de CO₂", value: 40 },
  { name: "Économies d'argent", value: 25 },
  { name: "Moins de trafic", value: 20 },
  { name: "Lien social", value: 15 },
];

const COLORS = ["#2ecc71", "#f1c40f", "#3498db", "#9b59b6"];

function Chart() {
  return (
    <div className="covoiturage-chart-container">
      <h2>🌍 Bienfaits du covoiturage</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
