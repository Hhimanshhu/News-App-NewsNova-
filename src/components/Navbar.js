import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import "./Navbar.css";

// 👇 This function is outside the component
const debouncedInputHandler = debounce((value, setter) => {
  setter(value);
}, 400);

const Navbar = ({ theme, toggleTheme, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    debouncedInputHandler(e.target.value, setSearchQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
  };


const handleCategoryClick = (path) => {
  setSearchQuery("");

  if (window.location.pathname === path) {
     navigate('/force-reload', { replace: true });
     setTimeout(() => navigate(path), 0);
  } else {
    navigate(path);
  }
};

  const handleLogoClick = () => {
    setSearchQuery("");
    navigate("/home");
  };

  useEffect(() => {
    return () => {
      debouncedInputHandler.cancel(); // Correct function name
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link d-flex align-items-center" aria-label="Go to Home" onClick={handleLogoClick}>
           <img
              src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
              alt="NewsNova Logo"
              style={{ objectFit: 'contain' }}
          />
          <span style={{ fontWeight: "bold", fontSize: "1.25rem", color: theme === "dark" ? "white" : "black" }}>
            NewsNova
          </span>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => handleCategoryClick("/home")}
                aria-label="Go to Home"
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Categories
              </Link>

              <ul className="dropdown-menu">
                {[
                  "Politics",
                  "Technology",
                  "Business",
                  "Entertainment",
                  "Sports",
                  "Health",
                  "Science",
                  "Environment",
                  "Education",
                  "Crime",
                  "International",
                ].map((category) => (
                  <li key={category}>
                    <Link
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(`/${category}`)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <div className="bttn">
            <button
              onClick={toggleTheme}
              className="btn btn-outline-primary ms-3"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>

          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search News..."
              aria-label="Search for news articles"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;