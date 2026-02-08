import { useState } from "react";
import "./CheckoutPopup.css";

const CheckoutPopup = ({ isOpen, onClose, onContinue }) => {
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    name: "", // Optional
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Minimal validation: Phone and Address are required
    if (!formData.phone || !formData.address) {
      alert("Please provide at least a phone number and delivery address.");
      return;
    }

    onContinue({
      isGuest: true,
      user: null,
      guestInfo: formData,
    });
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-popup">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="popup-header">
          <i className="fa-solid fa-truck-fast"></i>
          <h2>Delivery Details</h2>
          <p>Tell us where to send your fresh products</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="input-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 03001234567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Delivery Address *</label>
            <textarea
              name="address"
              placeholder="House #, Street, City..."
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name (Optional)</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="continue-btn">
            Continue to Summary
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPopup;