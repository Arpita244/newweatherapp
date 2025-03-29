import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
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
