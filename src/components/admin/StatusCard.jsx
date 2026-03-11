import React from "react";
import { IoCheckmarkCircleOutline, IoSyncOutline, IoCloudUploadOutline } from "react-icons/io5";
import "./styles/StatusCard.css";

const StatusCard = ({ 
  status, 
  setStatus, 
  onSave, 
  updating, 
  initialStatus,
  deliveryFee,
  newDeliveryFee
}) => {
  const statusOptions = [
    { value: "pending", label: "Pending Approval" },
    { value: "confirmed", label: "Confirmed Order" },
    { value: "packed", label: "Ready to Ship" },
    { value: "shipped", label: "In Transit" },
    { value: "delivered", label: "Successfully Delivered" },
    { value: "cancelled", label: "Cancelled / Void" },
  ];

  const hasChanges = (status !== initialStatus) || (Number(newDeliveryFee) !== Number(deliveryFee));

  return (
    /* Dynamic class added to the main container for global theme shifting */
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
              <option 
                key={opt.value} 
                value={opt.value} 
                className={`opt-${opt.value}`} // Unique class for each option
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button 
        className={`confirm-btn ${updating ? 'saving' : ''} ${!hasChanges ? 'btn-disabled' : ''}`} 
        onClick={onSave} 
        disabled={updating || !hasChanges}
      >
        {updating ? (
          <><IoSyncOutline className="spin" /> Updating Database...</>
        ) : (
          <><IoCloudUploadOutline /> {hasChanges ? "Save Changes" : "Update Status"}</>
        )}
      </button>

      <p className="status-help-text">
        {hasChanges 
          ? "⚠️ You have unsaved modifications." 
          : "* Customer will be notified of status updates."}
      </p>
    </div>
  );
};

export default StatusCard;