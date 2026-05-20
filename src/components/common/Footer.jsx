import React from "react";
import { Link } from "react-router-dom";
import "./styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>Khan Traders provides reliable products, simple ordering, and customer-focused service.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@khantraders.com</p>
          <p>Phone: +92 (XXX) XXX-XXXX</p>

          <div className="footer-social">
            <a href="mailto:support@khantraders.com" target="_blank" rel="noreferrer">
              <i className="fa-solid fa-envelope"></i>
            </a>
            <a href="https://www.linkedin.com/in/m-rameezkhan" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://instagram.com/mrameezkhan_" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://github.com/m-rameezkhan" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Khan Traders. All rights reserved.</p>
        <p>
          Developed by{" "}
          <a href="https://m-rameez-portfolio.netlify.app" target="_blank" rel="noreferrer">
            M Rameez Khan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
