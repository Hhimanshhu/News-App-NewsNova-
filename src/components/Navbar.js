import React from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ theme, toggleTheme, searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here if needed
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
              <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/Politics">Politics</Link></li>
                <li><Link className="dropdown-item" to="/Technology">Technology</Link></li>
                <li><Link className="dropdown-item" to="/Business">Business</Link></li>
                <li><Link className="dropdown-item" to="/Entertainment">Entertainment</Link></li>
                <li><Link className="dropdown-item" to="/Sports">Sports</Link></li>
                <li><Link className="dropdown-item" to="/Health">Health</Link></li>
                <li><Link className="dropdown-item" to="/Science">Science</Link></li>
                <li><Link className="dropdown-item" to="/Environment">Environment</Link></li>
                <li><Link className="dropdown-item" to="/Education">Education</Link></li>
                <li><Link className="dropdown-item" to="/Crime">Crime</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/International">International</Link></li>
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


























// import React from 'react';
// import "./Navbar.css";
// import {Link} from "react-router-dom";


// const Navbar = ({ theme, toggleTheme }) => {
//   return (
//     <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>

//     {/*  <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top"> */}
//      {/* <nav className="navbar navbar-expand-lg sticky-top"> */}
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">NewsNova</Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">About</Link>
//             </li>
//             <li className="nav-item dropdown">
//               <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Categories
//               </Link>
//               <ul className="dropdown-menu">
//                 <li><Link className="dropdown-item" to="/Politics">Politics</Link></li>
//                 <li><Link className="dropdown-item" to="/Technology">Technology</Link></li>
//                 <li><Link className="dropdown-item" to="/Business">Business</Link></li>
//                 <li><Link className="dropdown-item" to="/Entertainment">Entertainment</Link></li>
//                 <li><Link className="dropdown-item" to="/Sports">Sports</Link></li>
//                 <li><Link className="dropdown-item" to="/Health">Health</Link></li>
//                 <li><Link className="dropdown-item" to="/Science">Science</Link></li>
//                 <li><Link className="dropdown-item" to="/Environment">Environment</Link></li>
//                 <li><Link className="dropdown-item" to="/Education">Education</Link></li>
//                 <li><Link className="dropdown-item" to="/Crime">Crime</Link></li>
//                 <li><hr className="dropdown-divider"/></li>
//                 <li><Link className="dropdown-item" to="/International">International</Link></li>
//               </ul>
//             </li>
//           </ul>
          
//           <div className='bttn'>
//             <button onClick={toggleTheme} className="btn btn-outline-primary ms-3">
//               {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//             </button>
//           </div>

//           <form className="d-flex" role="search">
//             <input className="form-control me-2" type="search" placeholder="Search News..." aria-label="Search"/>
//             <button className="btn btn-outline-success" type="submit">Search</button>
//           </form>
          
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


