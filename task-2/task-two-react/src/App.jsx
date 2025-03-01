import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <div className="container">
      <div>
        <h1 className="text">{isDarkMode ? "Dark Mode" : "Light Mode"}</h1>
        <button onClick={toggleDarkMode}>
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
};

export default App;
