import React, { useState, useEffect } from "react";
import { IoArrowForwardOutline, IoFlash } from "react-icons/io5"; // Flash icon for "Live"
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "../styles/RecentOrders.css";
import notificationSound from "../../../../assets/notification-sound.mp3"; // Importing notification sound
import socket from "../../../../utils/socket"; // Importing the initialized socket instance

const RecentOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchRecentOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const latestFour = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4);
      setOrders(latestFour);
    } catch (err) {
      console.error("Error fetching recent orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders();

    socket.on("newOrder", (newOrder) => {
      setOrders((prevOrders) => {
        const exists = prevOrders.find(o => o._id === newOrder._id);
        if (exists) return prevOrders;
        return [newOrder, ...prevOrders].slice(0, 4);
      });
      new Audio().play().catch(() => {});
    });

    return () => socket.off("newOrder");
  }, []);

  if (loading) return (
    <div className="recent-orders-card loading-state">
      <div className="shimmer-line"></div>
      <div className="shimmer-line"></div>
    </div>
  );

  return (
    <div className="recent-orders-card">
      <div className="card-header">
        <div className="title-group">
          <h2>Recent Orders</h2>
          <div className="live-status-pill">
            <span className="pulse-dot"></span>
            LIVE
          </div>
        </div>
        <button 
          className="premium-view-all" 
          onClick={() => navigate("/admin/orders")}
        >
          View All <IoArrowForwardOutline />
        </button>
      </div>

      <div className="activity-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div 
              key={order._id} 
              className="activity-item premium-row" 
              onClick={() => navigate(`/admin/orders/${order._id}`)}
            >
              <div className="order-initials-box">
                {order.user?.name?.substring(0, 2).toUpperCase() || "GU"}
              </div>
              <div className="order-info">
                <h4>{order.user?.name || "Guest Customer"}</h4>
                <p>Rs. {order.totalAmount?.toLocaleString()} • {order.items?.length || 0} items</p>
              </div>
              <div className={`status-tag ${order.status?.toLowerCase()}`}>
                {order.status}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-orders-state">
            <p>No orders yet today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;