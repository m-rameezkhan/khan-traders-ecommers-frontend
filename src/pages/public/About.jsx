import React from "react";
import { Link } from "react-router-dom";
import {
  IoCheckmarkCircle,
  IoShieldCheckmark,
  IoSpeedometerOutline,
  IoHeartOutline,
  IoLeafOutline,
  IoStorefrontOutline,
  IoRibbonOutline
} from "react-icons/io5";
import "./styles/about.css";

const About = () => {
  const features = [
    { icon: <IoCheckmarkCircle />, title: "Quality Products", text: "Carefully selected products from trusted suppliers." },
    { icon: <IoShieldCheckmark />, title: "Secure Shopping", text: "Protected checkout and clear order handling." },
    { icon: <IoSpeedometerOutline />, title: "Fast Support", text: "Responsive service before and after every order." },
    { icon: <IoHeartOutline />, title: "Customer Care", text: "A practical, customer-first buying experience." }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-kicker">Khan Traders</span>
          <h1>Trusted Products, Reliable Service</h1>
          <p>We connect customers with dependable products through a simple, secure, and professional shopping experience.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="section-content">
            <div className="text-content">
              <h2>Who We Are</h2>
              <p>
                Khan Traders is built around practical service, product quality, and long-term customer trust.
                Our store keeps shopping straightforward from product discovery to checkout and delivery.
              </p>
              <p>
                We focus on reliable sourcing, transparent product information, and a consistent customer experience
                that feels connected to the same forest-inspired brand across the website.
              </p>
            </div>
            <div className="about-image-panel">
              <IoStorefrontOutline />
              <h3>Khan Traders</h3>
              <p>Quality-focused ecommerce for everyday buyers and business customers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section muted-bg">
        <div className="container">
          <h2>Our Mission & Values</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <IoLeafOutline className="mission-icon" />
              <h3>Responsible Growth</h3>
              <p>Build a dependable marketplace with clean operations and thoughtful customer service.</p>
            </div>
            <div className="mission-card">
              <IoShieldCheckmark className="mission-icon" />
              <h3>Trust First</h3>
              <p>Keep product, order, and support experiences clear so customers know what to expect.</p>
            </div>
            <div className="mission-card">
              <IoRibbonOutline className="mission-icon" />
              <h3>Quality Standards</h3>
              <p>Work with products and suppliers that support a consistent, professional store experience.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2>Why Choose Khan Traders?</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div className="feature-item" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <h2>Ready to Shop with Confidence?</h2>
          <p>Browse Khan Traders products and place your next order with a clean, reliable experience.</p>
          <div className="cta-buttons">
            <Link className="btn btn-primary" to="/products">Start Shopping</Link>
            <Link className="btn btn-secondary" to="/contact-us">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
