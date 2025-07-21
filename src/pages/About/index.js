import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">About Us</h1>
        <p className="about-subtitle"> Your Fashion Journey Begins Here – Just One Click! </p>
      </div>

      <div className="about-section">
        <p>
          <strong>Just One Click</strong> is more than just a shopping website – it's your gateway to explore the latest trends, timeless styles, and effortless shopping, all from the comfort of your home.
        </p>
        <p>
          Our mission is to bring together technology and design to offer a seamless shopping experience that is fast, fun, and stylish.
        </p>
      </div>

      <h2 className="team-heading">Meet the Creators</h2>
      <div className="team-cards">
        <div className="team-card">
          <h3>Manad</h3>
          <p>UI/UX Designer<br />Frontend Developer</p>
        </div>
        <div className="team-card">
          <h3>Karan</h3>
          <p>React Developer<br />Integration Specialist</p>
        </div>
        <div className="team-card">
          <h3>Abhishek</h3>
          <p>Backend Developer<br />Content Strategist</p>
        </div>
      </div>

      <div className="about-footer">
        <p>Thank you for supporting <strong>Just One Click</strong>. Happy Shopping!</p>
      </div>
    </div>
  );
};

export default About;