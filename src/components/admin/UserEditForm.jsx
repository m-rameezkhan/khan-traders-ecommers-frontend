import React, { useState } from "react";
import { 
  IoPersonOutline, IoMailOutline, IoCallOutline, 
  IoShieldCheckmarkOutline, IoLocationOutline, IoSaveOutline,
  IoCreateOutline, IoCloseOutline
} from "react-icons/io5";
import "./styles/UserEditForm.css";

const UserEditForm = ({ formData, updating, onChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveClick = async () => {
    await onSave();
    setIsEditing(false);
  };

  return (
    <div className={`form-container ${isEditing ? "is-editing" : "is-viewing"}`}>
      <div className="form-card">
        <div className="form-header">
          <div className="header-text">
            <h3>Member Profile</h3>
            <p>{isEditing ? "You are currently modifying this account" : "Account details are in read-only mode"}</p>
          </div>
          <button 
            className={isEditing ? "btn-cancel" : "btn-edit"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <><IoCloseOutline /> Cancel</> : <><IoCreateOutline /> Edit Profile</>}
          </button>
        </div>

        <div className="form-body">
          <div className="form-grid">
            {[
              { label: "Full Name", name: "name", icon: <IoPersonOutline />, type: "text" },
              { label: "Email Address", name: "email", icon: <IoMailOutline />, type: "email" },
              { label: "Phone Number", name: "phone", icon: <IoCallOutline />, type: "text" },
              { label: "Reset Password", name: "password", icon: <IoShieldCheckmarkOutline />, type: "password", placeholder: "Enter new password" },
            ].map((field) => (
              <div key={field.name} className="form-group">
                <label>{field.icon} {field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={onChange}
                  readOnly={!isEditing}
                  placeholder={field.placeholder || ""}
                  className="custom-input"
                />
              </div>
            ))}
            
            <div className="form-group full-width">
              <label><IoLocationOutline /> Shipping Address</label>
              <textarea
                name="address"
                rows="3"
                value={formData.address}
                onChange={onChange}
                readOnly={!isEditing}
                className="custom-input"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="form-footer">
            <button 
              className={`btn-save ${updating ? 'loading' : ''}`} 
              onClick={handleSaveClick} 
              disabled={updating}
            >
              <IoSaveOutline className={updating ? "spin" : ""} />
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEditForm;