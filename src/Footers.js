import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    marginTop: 'auto',
    position: 'relative',
    bottom: 0,
    width: '100%'
  };

  const smallStyle = {
    display: 'block',
    marginTop: '8px',
    opacity: '0.8'
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Team Collaboration - Created by Karan, Abhishak, and Manad</p>
      <small style={smallStyle}>Made with ❤️ using React</small>
    </footer>
  );
}

export default Footer;