import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./styles/cta.css";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Experience Quality Shopping?</h2>
        <p>Join customers who trust Khan Traders for reliable products and clear service.</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => navigate("/products")}>
            Shop Now
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/contact-us")}>
            Get in Touch
          </button>
        </div>
      </div>
      <div className="cta-features">
        {["Secure checkout", "Local customer support", "Reliable order handling"].map((item) => (
          <div className="feature" key={item}>
            <span className="feature-icon">
              <IoCheckmarkCircleOutline />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CallToAction;
