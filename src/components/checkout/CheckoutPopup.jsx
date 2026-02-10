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
    <div className="checkout-overlay" onClick={onClose}>
      {/* stopPropagation prevents closing when clicking inside the white box */}
      <div className="checkout-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="popup-header">
          <div className="auth-logo-space">
             <i className="fa-solid fa-leaf"></i>
          </div>
          <h2>Delivery Details</h2>
          <p>Fresh products from nature to your door</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="input-group">
            <label><i className="fa-solid fa-phone"></i> Phone Number *</label>
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
            <label><i className="fa-solid fa-location-dot"></i> Delivery Address *</label>
            <textarea
              name="address"
              placeholder="House #, Street, City..."
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label><i className="fa-solid fa-user"></i> Full Name (Optional)</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="continue-btn">
            Confirm Delivery Location
          </button>
        </form>
      </div>
    </div>
  );

};

export default CheckoutPopup;