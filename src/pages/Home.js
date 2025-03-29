import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
const API_KEY = process.env.REACT_APP_API; 

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);

      const updatedHistory = [city, ...history.slice(0, 4)];
      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } catch (err) {
      setError("City not found. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="home">
      <h1>🌎 Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>⏳ Loading...</p>}
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} />

      {/* Recent Search History */}
      <div className="history">
        <h3>Recent Searches:</h3>
        {history.map((city, index) => (
          <button key={index} onClick={() => fetchWeather(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;





