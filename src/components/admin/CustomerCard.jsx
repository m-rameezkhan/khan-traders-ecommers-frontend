import React from "react";
import { Link } from "react-router-dom";
import { 
  IoCallOutline, IoLocationOutline, IoLogoWhatsapp, 
  IoCopyOutline, IoMapOutline, IoMailOutline 
} from "react-icons/io5";
import "./styles/CustomerCard.css";

const CustomerCard = ({ user, address }) => {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="customer-card">
      <div className="card-badge">Customer Profile</div>
      
      <div className="user-profile-header">
        <Link to={`/admin/users/${user?._id}`} className="user-profile-link">
          <div className="user-avatar">
            {user?.name?.[0] || "G"}
            <div className="avatar-status-dot"></div>
          </div>
          <div className="user-info-text">
            <h4>{user?.name || "Guest User"}</h4>
            <span className="customer-email">
               <IoMailOutline /> {user?.email || "No email provided"}
            </span>
          </div>
        </Link>
      </div>

      <div className="user-details-list">
        {/* Phone Section */}
        <div className="u-item contact-item">
          <div className="icon-box"><IoCallOutline /></div>
          <div className="u-content">
            <label>Phone Number</label>
            <p>{user?.phone || "N/A"}</p>
          </div>
          <div className="action-group">
            {user?.phone && (
              <>
                <a href={`tel:${user.phone}`} className="action-btn call" title="Call User">
                   <IoCallOutline />
                </a>
                <a 
                  href={`https://wa.me/92${user.phone.replace(/^0/, '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="action-btn wa"
                >
                  <IoLogoWhatsapp />
                </a>
              </>
            )}
          </div>
        </div>

        {/* Address Section */}
        <div className="u-item address-item">
          <div className="icon-box"><IoLocationOutline /></div>
          <div className="u-content">
            <label>Shipping Address</label>
            <p>{address}</p>
          </div>
          <div className="action-group vertical">
            <button onClick={handleCopyAddress} className="action-btn-mini" title="Copy Address">
              <IoCopyOutline />
            </button>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} 
              target="_blank" 
              rel="noreferrer" 
              className="action-btn-mini"
            >
              <IoMapOutline />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;