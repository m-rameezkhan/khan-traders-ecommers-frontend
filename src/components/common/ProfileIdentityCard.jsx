import React from "react";
import { IoCameraOutline, IoPencil, IoCalendarOutline } from "react-icons/io5";
import "./styles/ProfileIdentityCard.css"

const ProfileIdentityCard = ({ user, isEditing, setIsEditing }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long", year: "numeric" 
    });
  };

  return (
    <aside className="profile-identity-card-premium">
      <div className="identity-card-inner">
        <div className="profile-avatar-wrapper-modern">
          <div className="avatar-glass-circle">
             {/* Using the Leaf icon as the brand identity logo */}
            <i className="fa-solid fa-leaf profile-brand-icon"></i>
          </div>
          <button className="camera-btn-modern"><IoCameraOutline /></button>
        </div>

        <div className="identity-text-center">
          <h2 className="profile-display-name">{user.name}</h2>
          <div className="role-tag-premium">{user.role}</div>
        </div>

        <div className="identity-stats">
          <div className="stat-item">
            <IoCalendarOutline />
            <div>
              <p>Joined</p>
              <span>{formatDate(user.createdAt)}</span>
            </div>
          </div>
        </div>

        <button 
          className={`edit-trigger-btn ${isEditing ? 'active' : ''}`}
          onClick={() => setIsEditing(!isEditing)}
        >
          <IoPencil /> {isEditing ? "Save Changes" : "Update Profile"}
        </button>
      </div>
    </aside>
  );
};

export default ProfileIdentityCard;