import React from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme, searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here if needed
  };
const navigate = useNavigate();

const handleCategoryClick = (path) => {
  setSearchQuery("");
  navigate(path);
};
 
  return (
    <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">NewsNova</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active"  onClick={() => handleCategoryClick('/home')} aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Politics')}>Politics</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Technology')}>Technology</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Business')}>Business</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Entertainment')}>Entertainment</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Sports')}>Sports</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Health')}>Health</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Science')}>Science</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Environment')}>Environment</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Education')}>Education</Link></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/Crime')}>Crime</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" onClick={() => handleCategoryClick('/International')}>International</Link></li>
              </ul>
            </li>
          </ul>

          <div className='bttn'>
            <button onClick={toggleTheme} className="btn btn-outline-primary ms-3">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>

          {/* ✅ Controlled search input */}
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search News..."
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
