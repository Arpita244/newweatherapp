import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/ForeCast";
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
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        fetchForecast(city);

        const updatedHistory = [city, ...history.slice(0, 4)];
        setHistory(updatedHistory);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      } else {
        setError("City not found. Try again.");
      }
    } catch {
      setError("Failed to fetch data. Check your connection.");
    }

    setLoading(false);
  };

  const fetchForecast = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      const filteredData = data.list.filter((_, index) => index % 8 === 0);
      const forecastData = filteredData.map((item) => ({
        date: item.dt_txt.split(" ")[0],
        temp: item.main.temp,
        condition: item.weather[0].description,
      }));
      setForecast(forecastData);
    } catch {
      setForecast(null);
    }
  };

  return (
    <div className="home">
      <h1>🌎 Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />
      {loading && <p>⏳ Loading...</p>}
      {error && <p className="error">{error}</p>}
      <WeatherCard weather={weather} onRefresh={() => fetchWeather(weather.name)} />
      <Forecast forecast={forecast} />
    </div>
  );
};

export default Home;






