import React from "react";
import { IoCheckmarkCircleOutline, IoSyncOutline, IoCloudUploadOutline } from "react-icons/io5";
import "./styles/StatusCard.css";

const StatusCard = ({ 
  status, 
  setStatus, 
  onSave, 
  updating, 
  initialStatus, // Add this
  deliveryFee,    // Add this (original from DB)
  newDeliveryFee  // Add this (current state)
}) => {
  const statusOptions = [
    { value: "pending", label: "Pending Approval" },
    { value: "confirmed", label: "Confirmed Order" },
    { value: "packed", label: "Ready to Ship" },
    { value: "shipped", label: "In Transit" },
    { value: "delivered", label: "Successfully Delivered" },
    { value: "cancelled", label: "Cancelled / Void" },
  ];

  // Logic: Check if status changed OR delivery fee changed
  const isStatusChanged = status !== initialStatus;
  const isFeeChanged = Number(newDeliveryFee) !== Number(deliveryFee);
  const hasChanges = isStatusChanged || isFeeChanged;

  return (
    <div className={`process-card status-theme-${status}`}>
      <div className="process-header">
        <div className="status-indicator-ring">
           {updating ? <IoSyncOutline className="spin" /> : <IoCheckmarkCircleOutline />}
        </div>
        <h4>Order Workflow</h4>
      </div>

      <div className="status-control-group">
        <label className="input-label">Current Stage</label>
        <div className="select-wrapper">
          <select 
            className={`status-select ${status}`} 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            disabled={updating}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        className={`confirm-btn ${updating ? 'saving' : ''} ${!hasChanges ? 'btn-disabled' : ''}`} 
        onClick={onSave} 
        disabled={updating || !hasChanges} // Disabled if updating OR no changes
      >
        {updating ? (
          <>
            <IoSyncOutline className="spin" /> Updating Database...
          </>
        ) : (
          <>
            <IoCloudUploadOutline /> {hasChanges ? "Save Changes" : "No Changes"}
          </>
        )}
      </button>

      <p className="status-help-text">
        {hasChanges 
          ? "* You have unsaved changes." 
          : "* Updating the status will trigger a notification to the customer."}
      </p>
    </div>
  );
};

export default StatusCard;