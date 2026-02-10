import React from "react";
import "./styles/modal.css"; // Move modal CSS here

const EditInfoModal = ({ isOpen, onClose, info, setInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>Update Delivery Details</h3>
        <div className="modal-inputs">
          <label>Full Name</label>
          <input 
            type="text" 
            value={info.name || ""} 
            onChange={(e) => setInfo({...info, name: e.target.value})}
          />
          <label>Phone Number</label>
          <input 
            type="text" 
            value={info.phone || ""} 
            onChange={(e) => setInfo({...info, phone: e.target.value})}
          />
          <label>Delivery Address</label>
          <textarea 
            value={info.address || ""} 
            onChange={(e) => setInfo({...info, address: e.target.value})}
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={onClose}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditInfoModal;