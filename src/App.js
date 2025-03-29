import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
    document.body.className = storedTheme === "dark" ? "dark-mode" : "light-mode";
  }, []);
  const toggleTheme = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme === "dark" ? "dark-mode" : "light-mode";
  };
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <Home />
    </div>
  );
};

export default App;
