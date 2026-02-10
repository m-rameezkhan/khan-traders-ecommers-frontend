import React from "react";
import { IoLocationOutline, IoPrintOutline } from "react-icons/io5";
import "./styles/orderCard.css"; // We will put specific card styles here

const OrderCard = ({ order, index, totalOrders, onPrint }) => {
  
  // Helper to format date inside the component
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div id={`order-card-${order._id}`} className="order-card-premium">
      {/* Index Badge (Calculated based on total orders) */}
      <div className="order-index-badge">{totalOrders - index}</div>

      {/* --- Header --- */}
      <div className="card-top">
        <div className="id-group">
          <span className="order-label">ORDER PLACED</span>
          <span className="order-date">{formatDate(order.createdAt)}</span>
        </div>

        <div className="id-group text-right">
          <span className="order-label">ORDER ID</span>
          <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
        </div>

        <div className="status-container">
          <span className="order-label">STATUS</span>
          <span className={`status-tag ${order.status.toLowerCase()}`}>
            {order.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* --- Body Grid --- */}
      <div className="card-grid-content">
        {/* Left: Products */}
        <div className="products-section">
          {order.items.map((item, idx) => (
            <div key={idx} className="product-compact-row">
              <img
                src={item.product?.image || "/placeholder.png"}
                alt={item.product?.name}
                className="item-mini-img"
              />
              <div className="item-info">
                <span className="item-name">{item.product?.name}</span>
                <span className="item-qty">
                  {item.quantity} {item.product?.unit} × Rs {item.price.toLocaleString()}
                </span>
              </div>
              <span className="item-price-end">
                Rs {(item.quantity * item.price).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Right: Address */}
        <div className="shipping-section">
          <div className="shipping-info-card">
            <span className="info-title">
              <IoLocationOutline /> Delivery Address
            </span>
            <p className="address-text">{order.deliveryAddress}</p>
            <p className="phone-text">📞 {order.phone}</p>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <div className="card-footer-action">
        <div className="order-total-display">
          <span className="total-label">Grand Total:</span>
          <span className="total-value">
            Rs {order.totalAmount.toLocaleString()}
          </span>
        </div>
        <button
          className="invoice-btn-modern"
          onClick={() => onPrint(order._id)}
        >
          <IoPrintOutline /> Print Invoice
        </button>
      </div>
    </div>
  );
};

export default OrderCard;