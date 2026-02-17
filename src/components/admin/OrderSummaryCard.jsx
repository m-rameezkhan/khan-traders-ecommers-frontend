import React from "react";
import { IoChevronForwardOutline, IoTimeOutline, IoWalletOutline } from "react-icons/io5";
import "./styles/OrderSummaryCard.css";

const OrderSummaryCard = ({ order, onClick }) => {
  const statusColors = {
    pending: "#f59e0b",
    confirmed: "#3b82f6",
    packed: "#8b5cf6",
    shipped: "#06b6d4",
    delivered: "#10b981",
    cancelled: "#ef4444"
  };

  return (
    <div className="om-summary-card" onClick={() => onClick(order._id)}>
      {/* Section 1: Identity */}
      <div className="om-card-section identity">
        <div className="om-status-dot" style={{ backgroundColor: statusColors[order.status] }} />
        <div className="om-info">
          {/* Label changed from CUSTOMER to ORDER ID */}
          <span className="om-label">ORDER ID: {order._id.slice(-8).toUpperCase()}</span>
          <h4>{order.user?.name || "Guest"}</h4>
        </div>
      </div>

      {/* Section 2: Details (Fixed Center) */}
      <div className="om-card-section details">
        <div className="om-stat">
          <IoTimeOutline />
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="om-stat">
          <IoWalletOutline />
          <span>Rs. {order.totalAmount}</span>
        </div>
      </div>

      {/* Section 3: Status & Navigation */}
      <div className="om-card-section status-pill">
        <span className="om-badge" style={{ color: statusColors[order.status], borderColor: statusColors[order.status] }}>
          {order.status.toUpperCase()}
        </span>
        <IoChevronForwardOutline className="om-arrow" />
      </div>
    </div>
  );
};

export default OrderSummaryCard;