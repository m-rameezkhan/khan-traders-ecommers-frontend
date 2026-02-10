import React from "react";
import { IoPersonOutline, IoCallOutline, IoMailOutline, IoLocationOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import "./styles/ProfileDetailsCard.css"

const ProfileDetailsCard = ({ user }) => {
  return (
    <main className="profile-details-card-premium">
      <div className="card-section-modern">
        <h3 className="section-heading-modern">
          <span className="heading-icon-box"><IoPersonOutline /></span>
          Account Credentials
        </h3>
        
        <div className="fields-layout-grid">
          <div className="premium-input-box">
            <label>Full Name</label>
            <div className="value-container">{user.name}</div>
          </div>
          <div className="premium-input-box">
            <label>Email Address</label>
            <div className="value-container email-verified">
              {user.email} <IoShieldCheckmarkOutline className="verified-check" />
            </div>
          </div>
        </div>
      </div>

      <div className="card-section-modern">
        <h3 className="section-heading-modern">
          <span className="heading-icon-box"><IoCallOutline /></span>
          Contact Information
        </h3>
        
        <div className="fields-layout-grid">
          <div className="premium-input-box">
            <label>Phone Number</label>
            <div className="value-container">{user.phone}</div>
          </div>
          <div className="premium-input-box full-span">
            <label>Physical Address</label>
            <div className="value-container address-box">
              <IoLocationOutline /> {user.address}
            </div>
          </div>
        </div>
      </div>

      <div className="premium-footer-status">
        <div className="secure-badge">
          <IoShieldCheckmarkOutline /> 256-bit Encryption Active
        </div>
      </div>
    </main>
  );
};

export default ProfileDetailsCard;