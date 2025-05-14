import React from 'react';
import './About.css';

const About = ({ theme }) => {
  const getBackgroundColor = () => (theme === 'dark' ? '#212529' : 'white');
  const getTextColor = () => (theme === 'dark' ? 'white' : 'black');

  const myStyle = {
    color: getTextColor(),
    backgroundColor: getBackgroundColor(),
    border: `1px solid ${getTextColor()}`,
  };

  return (
    <div className="container" style={{ color: getTextColor() }}>
      <h2 className="heading"><center>About NewsNova</center></h2>
      <div className="accordion" id="accordionExample">

        {/* Section 1: Latest News */}
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              style={{ ...myStyle, border: 'none' }}
            >
              <b>Latest News at Your Fingertips</b>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <p>
                NewsNova brings you the most recent headlines from reliable global sources.
                Stay updated with the world in real time with a single scroll.
              </p>
              <ul>
                <li>Browse by diverse categories: Politics, Business, Tech, Sports, Health, and more.</li>
                <li>Instant access to breaking stories and trending topics.</li>
                <li>Optimized layout for quick scanning and deep reads.</li>
                <li>Continuously refreshed feed with infinite scroll support.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Powered by World News API */}
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              style={{ ...myStyle, border: 'none' }}
            >
              <b>Powered by World News API</b>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <p>
                NewsNova is built on the trusted infrastructure of the World News API —
                aggregating content from hundreds of verified sources worldwide.
              </p>
              <ul>
                <li>Access thousands of articles with up-to-date information every minute.</li>
                <li>Advanced filtering based on country, category, and language.</li>
                <li>Consistent response formats ensure reliability and easy integration.</li>
                <li>Supports future scaling with pagination and rate-limiting support.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: Dark/Light Mode */}
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              style={{ ...myStyle, border: 'none' }}
            >
              <b>Dark/Light Mode Support</b>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <p>
                Choose your reading environment. Our UI adapts to your preferences instantly.
              </p>
              <ul>
                <li>Switch between dark and light themes with a single toggle.</li>
                <li>Dark mode optimized for low-light and night-time reading.</li>
                <li>Theme preference retained for consistency across sessions.</li>
                <li>Full compatibility with all NewsNova components and pages.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Smart Search Functionality */}
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
              style={{ ...myStyle, border: 'none' }}
            >
              <b>Smart Search Functionality</b>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <p>
                Looking for specific content? NewsNova’s real-time search makes it simple.
              </p>
              <ul>
                <li>Instant results as you type — no need to hit Enter.</li>
                <li>Filters articles by keyword matches in title and description.</li>
                <li>Resets pagination to show the most relevant results first.</li>
                <li>Works smoothly across all devices and screen sizes.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 5: Future Enhancements */}
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
              style={{ ...myStyle, border: 'none' }}
            >
              <b>Future Enhancements</b>
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" style={myStyle}>
              <p>
                NewsNova is constantly evolving. Here’s what’s coming next:
              </p>
              <ul>
                <li>🔖 Bookmark articles for later reading and offline access.</li>
                <li>🔔 Push notifications for breaking news and category alerts.</li>
                <li>🎙 Voice-assisted search for hands-free interaction.</li>
                <li>🌐 Multilingual support for a wider global audience.</li>
                <li>📊 Personalized news feed using AI-driven preferences.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;

