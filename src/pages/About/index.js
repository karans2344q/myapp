import React from 'react';
import './About.css';

const About = () => {
  const team = [
    {
      name: 'Manad Joshi',
      role: 'UI/UX Designer & Frontend Developer',
      expertise: 'Design Systems, User Experience',
      initials: 'MJ',
      linkedin: 'https://linkedin.com/in/manad-joshi',
      github: 'https://github.com/manad-joshi',
      email: 'manad@example.com'
    },
    {
      name: 'Karan Swarnkar',
      role: 'Full Stack Developer',
      expertise: 'React, API Integration',
      initials: 'KS',
      linkedin: 'https://linkedin.com/in/karan-swarnkar',
      github: 'https://github.com/karan-swarnkar',
      email: 'karan@example.com'
    },
    {
      name: 'Abhishek Nagori',
      role: 'Backend Developer',
      expertise: 'Database Architecture, APIs',
      initials: 'AN',
      linkedin: 'https://linkedin.com/in/abhishak-nagori',
      github: 'https://github.com/abhishak-nagori',
      email: 'abhishak@example.com'
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">About <span>Just One Click</span></h1>
        <p className="about-subtitle">Where Fashion Meets Digital Innovation</p>
        <div className="hero-gradient"></div>
      </div>

      <div className="about-content">
        <div className="about-section">
          <div className="section-glow"></div>
          <p className="highlight-text">
            <strong>Just One Click</strong> revolutionizes online shopping by blending cutting-edge technology with 
            fashion-forward design to deliver an unparalleled digital experience.
          </p>
          <p>
            Our platform is built on three core principles: <span className="accent">Seamless Experience</span>, 
            <span className="accent"> Trend Curation</span>, and <span className="accent">Instant Gratification</span>. 
            We're redefining what it means to shop online.
          </p>
        </div>

        <div className="mission-section">
          <h3>Our Mission</h3>
          <div className="mission-cards">
            <div className="mission-card">
              <i className="fas fa-bolt"></i>
              <h4>Lightning Fast</h4>
              <p>Instant loading and checkout processes</p>
            </div>
            <div className="mission-card">
              <i className="fas fa-eye"></i>
              <h4>Visual Excellence</h4>
              <p>Immersive product presentations</p>
            </div>
            <div className="mission-card">
              <i className="fas fa-gem"></i>
              <h4>Quality First</h4>
              <p>Curated selection of premium products</p>
            </div>
          </div>
        </div>

        <h2 className="team-heading">The <span>Visionaries</span> Behind It All</h2>
        <div className="team-cards">
          {team.map((member, index) => (
            <div key={index} className="team-card" style={{ '--delay': index * 0.1 + 's' }}>
              <div className="card-glow"></div>
              <div className="member-avatar">
                <span>{member.initials}</span>
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="expertise">{member.expertise}</p>
              <div className="social-links">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} GitHub`}>
                  <i className="fab fa-github"></i>
                </a>
                <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-footer">
        <p>Join thousands of satisfied customers in our fashion revolution</p>
        <button className="cta-button">Start Shopping Now <i className="fas fa-arrow-right"></i></button>
      </div>
    </div>
  );
};

export default About;