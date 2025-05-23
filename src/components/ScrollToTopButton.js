import React, { useState, useEffect } from "react";
import "./ScrollToTopButton.css"; // If you’re using the custom style

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`btn btn-secondary position-fixed bottom-0 end-0 m-4 scroll-to-top ${visible ? 'visible' : ''}`}
      aria-label="Scroll back to top"
    >
      ↑ Top
    </button>
  );
};

export default ScrollToTopButton;
