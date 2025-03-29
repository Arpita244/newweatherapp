import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

const API_KEY = process.env.REACT_APP_API; // Replace with your OpenWeatherMap API Key

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} />
    </div>
  );
};

export default Home;
