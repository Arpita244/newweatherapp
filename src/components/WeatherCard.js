import React from "react";

const WeatherCard = ({ weather, onRefresh }) => {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>☁ Condition: {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬 Wind: {weather.wind.speed} km/h</p>
      <img
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <button className="refresh-btn" onClick={onRefresh}>🔄 Refresh</button>
    </div>
  );
};

export default WeatherCard;
