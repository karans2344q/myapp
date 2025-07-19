import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './Headers.css';

export function Headers() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Trending Styles for Everyone",
      highlight: ["Kids", "Men", "Women"],
      colors: ["#FF9E9E", "#A5B4FC", "#F0ABFC"],
      bg: "linear-gradient(35deg, #0F172A, #1E293B)"
    },
    {
      title: "Summer Collection Launch",
      highlight: ["New Arrivals", "50% Off", "Limited Stock"],
      colors: ["#86EFAC", "#FCA5A5", "#FCD34D"],
      bg: "linear-gradient(135deg, #1E293B, #334155)"
    },
    {
      title: "Premium Quality Fashion",
      highlight: ["Comfort", "Style", "Durability"],
      colors: ["#7DD3FC", "#C4B5FD", "#FDA4AF"],
      bg: "linear-gradient(135deg, #111827, #1F2937)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleExploreClick = () => {
    navigate('/home');
    setTimeout(() => {
      const scrollTarget = document.querySelector('.home-scroll-target');
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="header-container" style={{ background: slides[currentSlide].bg }}>
      <div className="slider-overlay"></div>
      <div className="particle-layer"></div>
      
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-content">
              <h2 className="slide-heading">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className="word">{word}</span>
                ))}
              </h2>
              
              <div className="highlight-container">
                {slide.highlight.map((text, i) => (
                  <span 
                    key={i} 
                    className="highlight-text" 
                    style={{ color: slide.colors[i] }}
                  >
                    {text}
                    {i < slide.highlight.length - 1 && ' & '}
                  </span>
                ))}
              </div>

              <button className="explore-button" onClick={handleExploreClick}>
                <span>Shop Collection</span>
                <FiArrowRight className="arrow-icon" />
                <div className="button-hover-effect"></div>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Headers;