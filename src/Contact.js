import React from 'react';
import './Contact.css';

export function Contact() {
  const team = [
    {
      name: 'Karan Swarnkar',
      phone: '8690563248',
      email: 'karan@example.com',
    },
    {
      name: 'Manad Joshi',
      phone: '9876543210',
      email: 'manad@example.com',
    },
    {
      name: 'Abhishak Nagori',
      phone: '9345627812',
      email: 'abhishak@example.com',
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">📞 Contact Our Team</h1>
        <div className="contact-cards">
          {team.map((person, index) => (
            <div key={index} className="contact-card">
              <h2>{person.name}</h2>
              <p><i className="fas fa-phone-alt"></i> {person.phone}</p>
              <p><i className="fas fa-envelope"></i> {person.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
