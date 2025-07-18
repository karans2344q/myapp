import React from "react";
import "./Headers.css"; // Make sure your CSS file has the updated styles

const Header = () => {
  return (
    <div className="header-container">
      {/* Glow, Particles, and Gradient Overlays */}
      <div className="header-gradient-overlay"></div>
      <div className="header-glow"></div>
      <div className="particle-layer"></div>

      {/* Main Content */}
      <div className="header-content">
        <div className="logo-glass-circle">
          <img src="../image/llogo.png" alt="Logo" className="brand-logo" />
        </div>

        <div>
          <h2 className="sub-heading">
            Shop for&nbsp;
            <span className="highlight-text kids">Kids</span>,&nbsp;
            <span className="highlight-text men">Men</span>, and&nbsp;
            <span className="highlight-text women">Women</span>
          </h2>

          <button className="header-button">
            <span className="button-liquid-effect"></span>
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
