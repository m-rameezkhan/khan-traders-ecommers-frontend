import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-about">
          <h3>About Us</h3>
          <p>We are a modern eCommerce store providing the best deals online.</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Contact & Social Section */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@myshop.com</p>
          <p>Phone: +123 456 7890</p>

          <div className="footer-social">
            <a href="mailto:mrameezkhan1785@gmail.com" target="_blank" rel="noreferrer">
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

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>© 2025 MyShop. All rights reserved.</p>
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