import React, { useState } from "react";
import { 
  IoPersonOutline, IoShieldCheckmarkOutline, IoStorefrontOutline, 
  IoNotificationsOutline, IoSaveOutline, IoCloudUploadOutline 
} from "react-icons/io5";
import "./styles/AdminSettings.css";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="settings-page-container fade-in">
      <header className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your administrative profile and store preferences.</p>
      </header>

      <div className="settings-layout">
        {/* Sidebar Tabs */}
        <aside className="settings-sidebar">
          <button 
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <IoPersonOutline /> Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === "store" ? "active" : ""}`}
            onClick={() => setActiveTab("store")}
          >
            <IoStorefrontOutline /> Store Info
          </button>
          <button 
            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <IoShieldCheckmarkOutline /> Security
          </button>
        </aside>

        {/* Settings Content */}
        <main className="settings-content-card">
          <form onSubmit={handleSave}>
            {activeTab === "profile" && (
              <section className="settings-section">
                <h3>Admin Profile</h3>
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    <img src="https://ui-avatars.com/api/?name=Admin&background=1b4d3e&color=fff" alt="Admin" />
                    <button type="button" className="upload-icon-btn"><IoCloudUploadOutline /></button>
                  </div>
                  <div>
                    <p className="upload-label">Profile Picture</p>
                    <span className="upload-hint">JPG, GIF or PNG. Max size of 2MB</span>
                  </div>
                </div>

                <div className="settings-grid">
                  <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Khan Traders Admin" className="visible-border" />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input type="email" defaultValue="admin@khantraders.com" className="visible-border" />
                  </div>
                </div>
              </section>
            )}

            {activeTab === "store" && (
              <section className="settings-section">
                <h3>Store Configuration</h3>
                <div className="input-group">
                  <label>Store Name</label>
                  <input type="text" defaultValue="Khan Traders" className="visible-border" />
                </div>
                <div className="input-group">
                  <label>Support Phone</label>
                  <input type="text" defaultValue="+92 300 1234567" className="visible-border" />
                </div>
                <div className="input-group">
                  <label>Store Address</label>
                  <textarea rows="3" className="visible-border">Karachi, Pakistan</textarea>
                </div>
              </section>
            )}

            {activeTab === "security" && (
              <section className="settings-section">
                <h3>Password & Security</h3>
                <div className="input-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" className="visible-border" />
                </div>
                <div className="input-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Min 8 characters" className="visible-border" />
                </div>
                <div className="input-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Match new password" className="visible-border" />
                </div>
              </section>
            )}

            <div className="settings-footer">
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? "Saving..." : <><IoSaveOutline /> Save Changes</>}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;