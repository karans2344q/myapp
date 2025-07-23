// Footer.js
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="joc-footer-animated">
      <div className="footer-content">
        <span className="footer-brand">
          <span className="footer-logo">Just One Click</span>
          <span className="brand-dash"> – </span>
          <span className="brand-slogan">Har deal, har style, har smile.</span>
        </span>
        <div className="footer-team">
          <span>
            <strong>Created by:</strong> Karan, Manad & Abhsihek
          </span>
        </div>
        <div className="footer-made">
          <span className="footer-heart">♥</span> Made with React • {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
