import React from 'react';
import './Contact.css';

export function Contact() {
  const team = [
    {
      name: 'Karan Swarnkar',
      role: 'Full Stack Developer', // Changed from 'Lead Developer' to 'Full Stack Developer'
      phone: '+91 8690563248',
      email: 'sonikaran1935@gmail.com',
      social: { 
        github: 'https://github.com', 
        linkedin: 'https://linkedin.com' 
      }
    },
    {
      name: 'Manad Joshi',
      role: 'UI/UX Designer',
      phone: '+91 8949310451',
      email: 'joshimanad81@gmail.com',
      social: { 
        github: 'https://github.com', 
        linkedin: 'https://linkedin.com' 
      }
    },
    {
      name: 'Abhishek Nagori',
      role: 'Project Manager',
      phone: '+91 7597237958',
      email: 'nagoriabhishek10@gmail.com',
      social: { 
        github: 'https://github.com', 
        linkedin: 'https://linkedin.com' 
      }
    },
  ];

  return (
    <div className="joc-contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Meet <span className="gradient-text">The Team</span></h1>
          <p className="contact-subtitle">Get in touch with our creative minds</p>
        </div>
        
        <div className="contact-cards">
          {team.map((person, index) => (
            <div key={index} className="contact-card" style={{ '--i': index }}>
              <div className="card-glow"></div>
              <div className="person-avatar">
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h2>{person.name}</h2>
              <p className="person-role">{person.role}</p>
              
              <div className="contact-info">
                <p><i className="fas fa-phone-alt"></i> {person.phone}</p>
                <p><i className="fas fa-envelope"></i> {person.email}</p>
              </div>
              
              <div className="social-links">
                <a href={person.social.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href={person.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={`mailto:${person.email}`}>
                  <i className="fas fa-paper-plane"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;