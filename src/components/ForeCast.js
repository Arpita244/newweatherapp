import React from "react";
import { motion } from "framer-motion";
const Forecast = ({ forecast }) => {
  if (!forecast) return null;
  return (
    <motion.div 
      className="forecast"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>📅 5-Day Forecast</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>🌡 Temp (°C)</th>
            <th>☁ Condition</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((day, index) => (
            <tr key={index}>
              <td>{day.date}</td>
              <td>{day.temp}°C</td>
              <td>{day.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
export default Forecast;
