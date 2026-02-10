import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoSettingsOutline, IoLeaf } from "react-icons/io5";
import ProfileIdentityCard from "../../components/common/ProfileIdentityCard.jsx";
import ProfileDetailsCard from "../../components/common/ProfileDetailsCard.jsx";
import "./styles/userProfile.css";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return (
    <div className="profile-loader-full">
      <div className="spinner-leaf"><IoLeaf /></div>
      <p>Loading your identity...</p>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        {/* Extraordinary Header */}
        <header className="profile-header-modern">
          <div className="header-content">
            <div className="title-area">
              <span className="pre-title"><IoLeaf /> Account Center</span>
              <h1>User Profile</h1>
              <p>Securely manage your personal data and account preferences</p>
            </div>
            <div className="header-action">
               <button className="settings-circle-btn"><IoSettingsOutline /></button>
            </div>
          </div>
          <div className="header-bottom-line"></div>
        </header>

        <div className="profile-grid">
          <ProfileIdentityCard 
            user={user} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
          />
          <ProfileDetailsCard 
            user={user} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;