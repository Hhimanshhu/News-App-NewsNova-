import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import "./App.css";
import About from "./components/About";
import LoadingBar from "react-top-loading-bar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

const categoryMap = {
  Politics: "politics",
  Technology: "technology",
  Business: "business",
  Entertainment: "entertainment",
  Sports: "sports",
  Health: "health",
  Science: "science",
  Environment: "environment",
  Education: "education",
  Crime: "crime",
  International: "world",
  home: "top",
};

const RoutedContent = ({
  theme,
  toggleTheme,
  loadingBarRef,
  searchQuery,
  setSearchQuery,
}) => {
  const location = useLocation();
  const commonProps = {
    pagesize: 12,
    country: "in",
    loadingBarRef: loadingBarRef,
  };

  return (
    <>
      <Navbar
        theme={theme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleTheme={toggleTheme}
      />
      <Routes location={location} key={location.key}>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/about" element={<About theme={theme} />} />
        {Object.keys(categoryMap).map((path) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <News
                {...commonProps}
                pageSize={9}
                country="in"
                searchQuery={searchQuery}
                category={categoryMap[path]}
              />
            }
          />
        ))}
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

function App() {
  const [theme, setTheme] = useState("light");
  const loadingBarRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <RoutedContent
        theme={theme}
        toggleTheme={toggleTheme}
        loadingBarRef={loadingBarRef}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </Router>
  );
}

export default App;
