import React from 'react';
import "./hero.css";
// Import your background image from assets
import heroBg from '../../assets/images/website/background.png'; 

const Hero = () => {
  return (
    <div className="intro">
      <div className="main-image">
        {/* Use the imported image variable here */}
        <img src={heroBg} alt="Background" />
      </div>
      
      <div className="main-text">
        <h1 className="heading">Welcome To Our Website</h1>
        <p className="text">
          Discover a wide range of quality products tailored to your needs.
          We are committed to providing you with the best shopping experience,
          reliable services, and exceptional value every time you visit.
        </p>
        
        <div className="hero-buttons">
          <button className="btn-2">Shop Now</button>
          <button className="btn-2">Learn More</button>
        </div>

        {/* Badges */}
        <div className="hero-badges">
          <div className="badge">
            <i className="fas fa-truck"></i> Free Shipping
          </div>
          <div className="badge">
            <i className="fas fa-headset"></i> 24/7 Support
          </div>
          <div className="badge">
            <i className="fas fa-lock"></i> Secure Payments
          </div>
        </div>

        {/* Scroll Down */}
        <div className="scroll-down">
          <i className="fas fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
};

export default Hero;