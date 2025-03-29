import React from "react";

const Forecast = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div className="forecast">
      <h3>📅 5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{day.date}</p>
            <p>🌡 {day.temp}°C</p>
            <p>☁ {day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
