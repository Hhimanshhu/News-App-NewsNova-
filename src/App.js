import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app">
      <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {/* <News pagesize ={12} country = 'in' category='latest'/> */}
    
          <Routes>
            <Route path="/" element={<News pagesize={12} country='in' category='latest' />} />
            <Route path="/Politics" element={<News pagesize={12} country='in' category='Politics' />} />
            <Route path="/Technology" element={<News pagesize={12} country='in' category='Technology' />} />
            <Route path="/Business" element={<News pagesize={12} country='in' category='Business' />} />
            <Route path="/Entertainment" element={<News pagesize={12} country='in' category='Entertainment' />} />
            <Route path="/Sports" element={<News pagesize={12} country='in' category='Sports' />} />
            <Route path="/Health" element={<News pagesize={12} country='in' category='Health' />} />
            <Route path="/Science" element={<News pagesize={12} country='in' category='Science' />} />
            <Route path="/Environment" element={<News pagesize={12} country='in' category='Environment' />} />
            <Route path="/Education" element={<News pagesize={12} country='in' category='Education' />} />
            <Route path="/Crime" element={<News pagesize={12} country='in' category='Crime' />} />
            <Route path="/International" element={<News pagesize={12} country='in' category='International' />} />
          </Routes>

      </Router>
    </div>
  );
}

export default App;

