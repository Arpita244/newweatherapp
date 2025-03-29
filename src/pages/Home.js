import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/ForeCast";
import { motion } from "framer-motion";
import "../App.css"; 
const API_KEY = process.env.REACT_APP_API; 
const Home = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
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
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      fetchForecast(city);
      const updatedHistory = [city, ...history.filter((c) => c !== city)].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    } catch {
      setError("City not found. Try again.");
    }
    setLoading(false);
  };
  const fetchForecast = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const filteredData = res.data.list.filter((_, index) => index % 8 === 0);
      setForecast(filteredData.map((item) => ({
        date: item.dt_txt.split(" ")[0],
        temp: item.main.temp,
        condition: item.weather[0].description,
      })));
    } catch {
      setForecast(null);
    }
  };
  return (
    <motion.div 
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🌎 Weather Dashboard
      </motion.h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && (
        <motion.div
          className="loader"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        />
      )}
      {error && <p className="error">{error}</p>}
      {weather && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WeatherCard weather={weather} onRefresh={() => fetchWeather(weather.name)} />
        </motion.div>
      )}
      {forecast && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Forecast forecast={forecast} />
        </motion.div>
      )}
      {history.length > 0 && (
        <div className="history">
          <h3>📜 Last 5 Searches:</h3>
          <ul>
            {history.map((city, index) => (
              <motion.li 
                key={index} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fetchWeather(city)}
              >
                🔍 {city}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};
export default Home;
