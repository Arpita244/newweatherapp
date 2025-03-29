import React from "react";
import { motion } from "framer-motion";
const WeatherCard = ({ weather, onRefresh }) => {
  if (!weather) return null;
  return (
    <motion.div 
      className="weather-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{weather.name}</h2>
      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>☁ Condition: {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬 Wind: {weather.wind.speed} km/h</p>
      <img
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <motion.button 
        className="refresh-btn" 
        onClick={onRefresh}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🔄 Refresh
      </motion.button>
    </motion.div>
  );
};
export default WeatherCard;
