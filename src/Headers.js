import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Headers.css';

export function Headers() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/home');
    setTimeout(() => {
      const scrollTarget = document.querySelector('.home-scroll-target');
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="header-container">
      <div className="header-glow"></div>
      <div className="header-gradient-overlay"></div>
      <div className="particle-layer"></div>

      <div className="container">
        <div className="header-content">
          <div className="logo-container animated fadeInLeft">
            <div className="logo-round-glass">
              <img src="/image/llogo.png" alt="Just One Click" className="brand-logo" />
              <div className="logo-glow-circle"></div>
            </div>
          </div>

          <div className="header-text animated fadeInRight">
            <h2 className="sub-heading">
              Your one-stop shop for{' '}
              <span className="highlight-text kids">Kids</span>,{' '}
              <span className="highlight-text men">Men</span> &{' '}
              <span className="highlight-text women">Women</span> fashion!
            </h2>

            <button className="header-button" onClick={handleExploreClick}>
              <span className="button-text">Explore Now</span>
              <div className="button-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="button-liquid-effect"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Headers;
